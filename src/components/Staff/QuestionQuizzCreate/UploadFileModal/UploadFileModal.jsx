import classNames from "classnames/bind";
import Papa from "papaparse";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import csvImg from "~/assets/images/content/csv.png";
import csvIcon from "~/assets/images/content/csvIcon.png";
import wordImg from "~/assets/images/content/word.png";
import wordIcon from "~/assets/images/content/wordIcon.png";
import styles from "./UploadFileModal.module.scss";
const cx = classNames.bind(styles)
function UploadFileModal({ setIsShowUploadFileModal }) {
  const fileInputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  // const [jsonData, setJsonData] = useState([]);

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
      fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
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

  const readExcelFile = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(worksheet);

      const formattedData = formatExcelData(rows);
      console.log(formattedData);

      // setJsonData(formattedData);
    };

    reader.readAsArrayBuffer(file);
  };
  const formatExcelData = (rows) => {
    const result = [];

    rows.forEach((row) => {
      const existingQuestion = result.find(
        (q) => q.content === row.Content
      );
      if (!existingQuestion) {
        result.push({
          level: row.Level,
          skill: row.Skill,
          section: row.Section,
          content: row.Content,
          explain: row.Explain,
          answers: [
            {
              label: row["Label"],
              text: row["Text"],
              isCorrectAnswer: row.isCorrectAnswer === "TRUE" || row.isCorrectAnswer === true
            }
          ],
          isSingleChoiceQuestion: row.isSingleChoiceQuestion === "TRUE" || row.isSingleChoiceQuestion === true
        });
      } else {
        existingQuestion.answers.push({
          label: row["Label"],
          text: row["Text"],
          isCorrectAnswer: row.isCorrectAnswer === "TRUE" || row.isCorrectAnswer === true
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


  return (
    <div className={cx("upload-file-modal-wrapper")}>
      <div className={cx("upload-file-modal-container")}>
        <div className={cx("upload-file-modal-header")}>
          <div className={cx("empty")}></div>
          <div className={cx("upload-file-title")}>Upload file</div>
          <div className={cx("upload-file-close")} onClick={() => setIsShowUploadFileModal(false)}>
            <i className={cx("fa-regular fa-xmark")}></i>
          </div>
        </div>
        <div className={cx("upload-file-modal-content")}>
          <div className={cx("upload-container", { "dragging-active": dragging })} onClick={handleUploadClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}>
            <div className={cx("upload-file-action")}>
              <i className={cx("fa-regular fa-file")}></i>
              <span className={cx("upload-file-text")}>Upload file</span>
            </div>
            <div className={cx("upload-file-content-text")}>Select or drag and drop files</div>
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
                <img src={csvImg} alt="csv-download-img" className={cx("image")} />
              </div>
              <div className={cx("download-infor")}>
                <img src={csvIcon} alt="csv-icon" className={cx("icon-img")} />
                <div className={cx("download-infor-text")}>Download Template</div>
                <i className="fa-regular fa-arrow-down-to-bracket"></i>
              </div>
            </div>
            <div className={cx("download-item-container")}>
              <div className={cx("download-image")}>
                <img src={wordImg} alt="csv-download-img" className={cx("image")} />
              </div>
              <div className={cx("download-infor")}>
                <img src={wordIcon} alt="csv-icon" className={cx("icon-img")} />
                <div className={cx("download-infor-text")}>Download Template</div>
                <i className="fa-regular fa-arrow-down-to-bracket"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

UploadFileModal.propTypes = {
  setIsShowUploadFileModal: PropTypes.func,
}

export default UploadFileModal
