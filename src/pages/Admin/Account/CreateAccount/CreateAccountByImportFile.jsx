import classNames from "classnames/bind";
import PageLayout from "~/layouts/Admin/PageLayout";
import styles from "./CreateAccountByImportFile.module.scss";
import Papa from "papaparse";
import { useState } from "react";

const cx = classNames.bind(styles);

function CreateAccountByImportFile() {
  const [csvData, setCsvData] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          setCsvData(results.data);
          setIsUploaded(true);
          setProgress(0);
        },
        error: function (error) {
          console.error("Error parsing CSV:", error);
        },
      });
    }
  };

  const chunkArray = (dataArray, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < dataArray.length; i += chunkSize) {
      chunks.push(dataArray.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const handleSubmit = async () => {
    if (csvData.length > 0) {
      const chunkedData = chunkArray(csvData, 100);

      for (let i = 0; i < chunkedData.length; i++) {
        const chunk = chunkedData[i];

        await fetch("/api/upload-csv", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(chunk),
        })
          .then((response) => response.json())
          .then((result) => {
            console.log("Chunk processed:", result);
          })
          .catch((error) => {
            console.error("Error processing chunk:", error);
          });

        setProgress(((i + 1) / chunkedData.length) * 100);
      }

      alert("Dữ liệu đã được gửi thành công");
    }
  };

  return (
    <PageLayout>
      <div className={cx("import-create-account-container")}>
        <div className={cx("import-modal-header")}>
          <div className={cx("import-modal-title")}>Add a new user</div>
        </div>

        <div className={cx("import-form-container")}>
          <div className={cx("import-form-group")}>
            <label>Import CSV file</label>
            <input type="file" accept=".csv" onChange={handleFileUpload} />
          </div>
          <div className={cx("import-template-download")}>
            <a
              href="/path/to/TemplateCreateAccount.csv"
              download="TemplateCreateAccount.csv"
              className={cx("import-download-btn")}
            >
              Download CSV Template
            </a>
          </div>

          {isUploaded && (
            <div className={cx("import-csv-preview")}>
              <h2>Preview dữ liệu từ CSV</h2>
              <table className={cx("import-csv-table")}>
                <thead>
                  <tr>
                    {Object.keys(csvData[0]).map((key, index) => (
                      <th key={index}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {csvData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.values(row).map((value, colIndex) => (
                        <td key={colIndex}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className={cx("import-progress-container")}>
                <button className={cx("import-submit-btn")} onClick={handleSubmit}>
                  Xác nhận và gửi
                </button>
                <div className={cx("import-progress-bar")}>
                  <label>Tiến trình: {Math.round(progress)}%</label>
                  <progress value={progress} max="100"></progress>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}


export default CreateAccountByImportFile;
