import classNames from "classnames/bind";
import Papa from "papaparse";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import csvImg from "~/assets/images/content/csv.png";
import csvIcon from "~/assets/images/content/csvIcon.png";
import wordImg from "~/assets/images/content/word.png";
import wordIcon from "~/assets/images/content/wordIcon.png";
import apiClient from "~/services/apiService";
import styles from "./UploadFileModal.module.scss";
const cx = classNames.bind(styles);
function UploadFileModal({
  fetchQuestions,
  setIsShowUploadFileModal,
  setQuestionListEror,
  setIsShowQuestionListError,
}) {
  const fileInputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFiles = (files) => {
    const file = files[0];
    const fileType = file.type;
    if (
      fileType ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      fileType === "application/vnd.ms-excel"
    ) {
      readExcelFile(file);
    } else if (fileType === "text/csv") {
      readCSVFile(file);
    } else {
      console.error("Please upload a CSV or Excel file.");
    }
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };
  const readExcelFile = async (file) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(worksheet);
        const formattedData = formatExcelData(rows);
        const response = await apiClient.post(
          "/quiz-questions/import-file",
          formattedData
        );

        const { savedQuestions, errors } = response.data.data;

        if (savedQuestions.length > 0 && errors.length > 0) {
          toast.error("Some questions failed to create!", {
            autoClose: 2000,
          });
          setIsShowQuestionListError(true);
          setQuestionListEror(errors);
          setIsShowUploadFileModal(false);
          fetchQuestions();
        } else if (savedQuestions.length > 0) {
          toast.success("Questions created successfully!", {
            autoClose: 2000,
          });
          setIsShowUploadFileModal(false);
          fetchQuestions();
        } else if (errors.length > 0) {
          toast.error("Questions created failed!", {
            autoClose: 2000,
          });
          setIsShowQuestionListError(true);
          setQuestionListEror(errors);
          setIsShowUploadFileModal(false);
        }
      } catch (error) {
        console.error("Error importing questions:", error);
      }
    };

    reader.readAsArrayBuffer(file);
  };
  const formatExcelData = (rows) => {
    const result = [];

    rows.forEach((row) => {
      const existingQuestion = result.find(
        (q) => q.content === `<p>${row.Content}</p>`
      );
      if (!existingQuestion) {
        result.push({
          level: row.Level ?? "",
          skill: row.Skill ?? "",
          section:
            row.Section === "Reading_Writing"
              ? "Reading & Writing"
              : row.Section === "Math"
              ? "Math"
              : "",
          content: row.Content ? `<p>${row.Content}</p>` : "",
          explain: row.Explain ?? "",
          answers: [
            {
              label: "A",
              text: row["Answer 1"] ? `<p>${row["Answer 1"]}</p>` : "",
              isCorrectAnswer: row["Answer 1"] === row.CorrectAnswer,
            },
            {
              label: "B",
              text: row["Answer 2"] ? `<p>${row["Answer 2"]}</p>` : "",
              isCorrectAnswer: row["Answer 2"] === row.CorrectAnswer,
            },
            {
              label: "C",
              text: row["Answer 3"] ? `<p>${row["Answer 3"]}</p>` : "",
              isCorrectAnswer: row["Answer 3"] === row.CorrectAnswer,
            },
            {
              label: "D",
              text: row["Answer 4"] ? `<p>${row["Answer 4"]}</p>` : "",
              isCorrectAnswer: row["Answer 4"] === row.CorrectAnswer,
            },
          ],
          isSingleChoiceQuestion:
            row.isSingleChoiceQuestion === "TRUE" ||
            row.isSingleChoiceQuestion === true
              ? true
              : row.isSingleChoiceQuestion === "" ||
                row.isSingleChoiceQuestion === undefined
              ? null
              : false,
        });
      }
    });

    return result;
  };
  const readCSVFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      Papa.parse(e.target.result, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          console.log("Parsed CSV data:", results.data);
        },
      });
    };
    reader.readAsText(file);
  };

  const handleDownloadTemplate = (type) => {
    const link = document.createElement("a");
    if (type === "excel") {
      link.href = "../../../../../public/TemplateCreateQuestion.xlsx";
      link.download = "TemplateCreateQuestion.xlsx";
      setIsShowUploadFileModal(false);
    } else if (type === "word") {
      toast.info("Word template is currently not available!", {
        autoClose: 1500,
      });
    }
    link.click();
  };

  return (
    <div className={cx("upload-file-modal-wrapper")}>
      <div className={cx("upload-file-modal-container")}>
        <div className={cx("upload-file-modal-header")}>
          <div className={cx("empty")}></div>
          <div className={cx("upload-file-title")}>Upload file</div>
          <div
            className={cx("upload-file-close")}
            onClick={() => setIsShowUploadFileModal(false)}
          >
            <i className={cx("fa-regular fa-xmark")}></i>
          </div>
        </div>
        <div className={cx("upload-file-modal-content")}>
          <div
            className={cx("upload-container", { "dragging-active": dragging })}
            onClick={handleUploadClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className={cx("upload-file-action")}>
              <i className={cx("fa-regular fa-file")}></i>
              <span className={cx("upload-file-text")}>Upload file</span>
            </div>
            <div className={cx("upload-file-content-text")}>
              Select or drag and drop files
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept=".csv,.xlsx,.xls"
              style={{ display: "none" }}
              onChange={handleFileInputChange}
            />
          </div>
          <div className={cx("line")}></div>
          <div className={cx("download-container")}>
            <div className={cx("download-item-container")}>
              <div className={cx("download-image")}>
                <img
                  src={csvImg}
                  alt="csv-download-img"
                  className={cx("image")}
                />
              </div>
              <div
                className={cx("download-infor")}
                onClick={() => handleDownloadTemplate("excel")}
              >
                <img src={csvIcon} alt="csv-icon" className={cx("icon-img")} />
                <div className={cx("download-infor-text")}>
                  Download Template
                </div>
                <i className="fa-regular fa-arrow-down-to-bracket"></i>
              </div>
            </div>
            <div className={cx("download-item-container")}>
              <div className={cx("download-image")}>
                <img
                  src={wordImg}
                  alt="csv-download-img"
                  className={cx("image")}
                />
              </div>
              <div
                className={cx("download-infor")}
                onClick={() => handleDownloadTemplate("word")}
              >
                <img src={wordIcon} alt="csv-icon" className={cx("icon-img")} />
                <div className={cx("download-infor-text")}>
                  Download Template
                </div>
                <i className="fa-regular fa-arrow-down-to-bracket"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

UploadFileModal.propTypes = {
  fetchQuestions: PropTypes.func,
  setIsShowUploadFileModal: PropTypes.func,
  setQuestionListEror: PropTypes.func,
  setIsShowQuestionListError: PropTypes.func,
};

export default UploadFileModal;
