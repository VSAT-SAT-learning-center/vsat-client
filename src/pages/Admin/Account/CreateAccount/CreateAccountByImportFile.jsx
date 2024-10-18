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
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const filteredData = results.data.filter((row) => {
            return Object.values(row).some((value) => value.trim() !== "");
          });

          console.log("Dữ liệu đã lọc:", filteredData);

          if (filteredData && filteredData.length > 0) {
            setCsvData(filteredData);
            setIsUploaded(true);
            setProgress(0);
            setErrorMessage("");
          } else {
            setErrorMessage(
              "File CSV không chứa dữ liệu hợp lệ. Vui lòng kiểm tra lại file."
            );
          }
        },
        error: function (error) {
          console.error("Error parsing CSV:", error);
          setErrorMessage(
            "Có lỗi xảy ra khi xử lý file CSV. Vui lòng thử lại."
          );
        },
      });
    } else {
      setErrorMessage("Vui lòng chọn file CSV.");
    }
  };

  const validateCsvData = (data) => {
    const requiredFields = [
      "Role",
      "First name",
      "Last name",
      "Email",
      "Gender",
      "Date Of Birth",
      "Phone number",
    ];
    for (let row of data) {
      for (let field of requiredFields) {
        if (!row[field]) {
          return `Trường '${field}' là bắt buộc. Vui lòng kiểm tra lại file CSV.`;
        }
      }
    }
    return "";
  };

  const handleSubmit = async () => {
    const validationError = validateCsvData(csvData);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    if (csvData.length > 0) {
      setErrorMessage("");
      setSuccessMessage("");

      const jsonData = csvData.map((row) => ({
        role: row.Role.trim(),
        firstname: row["First name"].trim(),
        lastname: row["Last name"].trim(),
        email: row.Email,
        gender: row.Gender.toLowerCase() === "male" ? true : false,
        dateofbirth: row["Date Of Birth"],
        phonenumber: row["Phone number"],
      }));

      const jsonString = JSON.stringify(jsonData, null, 2);
      console.log("Chuỗi JSON được gửi:", jsonString);

      let fakeProgress = 0;
      const progressInterval = setInterval(() => {
        if (fakeProgress < 90) {
          fakeProgress += 10;
          setProgress(fakeProgress);
        }
      }, 300);

      await fetch("http://localhost:5000/account/createAccountFromFile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonString,
      })
        .then((response) => response.json())
        .then((result) => {
          clearInterval(progressInterval);
          if (result.success) {
            setProgress(100);
            setSuccessMessage("Dữ liệu đã được gửi thành công!");
            setErrorMessage("");
          } else {
            setProgress(0);
            setErrorMessage(result.message.replace("Bad request: ", ""));
          }
        })
        .catch((error) => {
          clearInterval(progressInterval);
          setProgress(0);
          setErrorMessage("Có lỗi xảy ra trong quá trình gửi dữ liệu.");
          console.error("Error processing chunk:", error);
        });
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
              href="/TemplateCreateAccount.csv"
              download="TemplateCreateAccount.csv"
              className={cx("import-download-btn")}
            >
              Download CSV Template
            </a>
          </div>

          {isUploaded && csvData.length > 0 && (
            <div className={cx("import-csv-preview")}>
              <h2>Preview dữ liệu từ CSV</h2>
              <table className={cx("import-csv-table")}>
                <thead>
                  <tr>
                    {Object.keys(csvData[0] || {}).map((key, index) => (
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
                <button
                  className={cx("import-submit-btn")}
                  onClick={handleSubmit}
                >
                  Confirm and create list account
                </button>
                <div className={cx("import-progress-bar")}>
                  <label>Tiến trình: {Math.round(progress)}%</label>
                  <progress value={progress} max="100"></progress>
                </div>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className={cx("import-error-message")}>{errorMessage}</div>
          )}

          {successMessage && (
            <div className={cx("import-success-message")}>{successMessage}</div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}

export default CreateAccountByImportFile;
