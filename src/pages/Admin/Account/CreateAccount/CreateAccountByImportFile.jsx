import classNames from "classnames/bind";
import PageLayout from "~/layouts/Admin/PageLayout";
import styles from "./CreateAccountByImportFile.module.scss";
import Papa from "papaparse";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cx = classNames.bind(styles);

function CreateAccountByImportFile() {
  const [csvData, setCsvData] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  //const [progress, setProgress] = useState(0);
  const [savedAccounts, setSavedAccounts] = useState([]);
  const [errorAccounts, setErrorAccounts] = useState([]);

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

          if (filteredData && filteredData.length > 0) {
            setCsvData(filteredData);
            setIsUploaded(true);
            //setProgress(0);
          } else {
            toast.error(
              "The CSV file does not contain valid data. Please check the file again."
            );
          }
        },
        error: function (error) {
          console.error("Error parsing CSV:", error);
          toast.error("An error occurred while processing the CSV file. Please try again.");
        },
      });
    } else {
      toast.error("Please select CSV file.");
    }
  };

  const handleSubmit = async () => {
    if (csvData.length > 0) {
      setSavedAccounts([]);
      setErrorAccounts([]);

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

      let fakeProgress = 0;
      const progressInterval = setInterval(() => {
        if (fakeProgress < 90) {
          fakeProgress += 10;
          //setProgress(fakeProgress);
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
            //setProgress(100);

            // Cập nhật savedAccounts và errorAccounts từ API
            setSavedAccounts(result.data.savedAccounts);
            setErrorAccounts(result.data.errors);

            if (result.data.errors.length === 0) {
              toast.success("Create account successfully.");
            } else {
              toast.error("Some accounts were not created successfully.");
            }
          } else {
            //setProgress(0);
            toast.error(result.message.replace("Bad request: ", ""));
          }
        })
        .catch((error) => {
          clearInterval(progressInterval);
          //setProgress(0);
          toast.error("Có lỗi xảy ra trong quá trình gửi dữ liệu.");
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
                </div>
              </div>
            </div>
          )}

          {savedAccounts.length > 0 && (
            <div className={cx("saved-accounts-container")}>
              <h2>Saved Accounts</h2>
              <table className={cx("import-csv-table")}>
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Date of Birth</th>
                    <th>Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                  {savedAccounts.map((account, index) => (
                    <tr key={index}>
                      <td>{account.role}</td>
                      <td>{account.firstname}</td>
                      <td>{account.lastname}</td>
                      <td>{account.email}</td>
                      <td>{account.gender ? "Male" : "Female"}</td>
                      <td>{account.dateofbirth}</td>
                      <td>{account.phonenumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {errorAccounts.length > 0 && (
            <div className={cx("error-accounts-container")}>
              <h2 className={cx("error-title")}>Issues Found with Accounts</h2>{" "}
              <table className={cx("import-csv-table")}>
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Role</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Date of Birth</th>
                    <th>Phone Number</th>
                    <th>Error Message</th>
                  </tr>
                </thead>
                <tbody>
                  {errorAccounts.map((error, rowIndex) => (
                    <tr key={rowIndex}>
                      <td>{rowIndex + 1}</td>
                      <td>{error.account.role}</td>
                      <td>{error.account.firstname}</td>
                      <td>{error.account.lastname}</td>
                      <td>{error.account.email}</td>
                      <td>{error.account.gender ? "Male" : "Female"}</td>
                      <td>{error.account.dateofbirth}</td>
                      <td>{error.account.phonenumber}</td>
                      <td>{error.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    </PageLayout>
  );
}

export default CreateAccountByImportFile;
