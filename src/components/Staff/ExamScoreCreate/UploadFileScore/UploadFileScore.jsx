import classNames from "classnames/bind";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import * as XLSX from "xlsx";
import csvImg from "~/assets/images/content/csv.png";
import csvIcon from "~/assets/images/content/csvIcon.png";
import wordImg from "~/assets/images/content/word.png";
import wordIcon from "~/assets/images/content/wordIcon.png";
import styles from "./UploadFileScore.module.scss";

const cx = classNames.bind(styles);
function UploadFileScore({
  setDataSource,
  setMathData,
  setRwData,
  setIsShowImportExamScore,
  setIsShowExamScoreResult,
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
    } else {
      toast.error("Please upload a Excel file!", {
        autoClose: 1500,
      });
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
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Separate rows into Reading & Writing and Math based on the "section" field
      const readingWritingData = [];
      const mathData = [];

      jsonData.slice(1).forEach((row) => {
        const section = row[0];
        const item = {
          id: uuidv4(),
          section: section,
          rawscore: row[1] || 0,
          lowerscore: row[2] || 0,
          upperscore: row[3] || 0,
        };

        if (section === "Reading & Writing") {
          readingWritingData.push(item);
        } else if (section === "Math") {
          mathData.push(item);
        }
      });
      setDataSource(readingWritingData);
      setRwData(readingWritingData);
      setMathData(mathData);
      setIsShowImportExamScore(false);
      setIsShowExamScoreResult(true);
    };
    reader.readAsArrayBuffer(file);
    return false;
  };

  const handleDownloadTemplate = (type) => {
    const link = document.createElement("a");
    if (type === "excel") {
      link.href = "../../../../../public/TemplateCreateExamScore.xlsx";
      link.download = "TemplateCreateExamScore.xlsx";
      setIsShowImportExamScore(false);
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
            onClick={() => setIsShowImportExamScore(false)}
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

export default UploadFileScore;
