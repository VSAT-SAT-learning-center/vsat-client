import classNames from "classnames/bind";
import Papa from "papaparse";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageLayout from "~/layouts/Admin/PageLayout";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import apiClient from "~/services/apiService";
import styles from "./CreateAccountByImportFile.module.scss";

const cx = classNames.bind(styles);

function CreateAccountByImportFile() {
  const [csvData, setCsvData] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
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
      toast.error("Please select a CSV file.");
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

      let fakeProgress = 0;
      const progressInterval = setInterval(() => {
        if (fakeProgress < 90) {
          fakeProgress += 10;
        }
      }, 300);

      apiClient
        .post("/account/createAccountFromFile", jsonData)
        .then((result) => {
          clearInterval(progressInterval);
          if (result.data.success) {
            setSavedAccounts(result.data.data.savedAccounts);
            setErrorAccounts(result.data.data.errors);

            if (result.data.data.errors.length === 0) {
              toast.success("Accounts created successfully.");
            } else {
              toast.error("Some accounts were not created successfully.");
            }
          } else {
            toast.error(result.data.message.replace("Bad request: ", ""));
          }
        })
        .catch((error) => {
          clearInterval(progressInterval);
          toast.error("An error occurred while processing the CSV file. Please try again.");
          console.error("Error processing chunk:", error);
        });
    }
  };

  return (
    <PageLayout>
      <div className={cx("import-create-account-wrapper")}>
      <div className={cx("import-create-account-container")}>
        <div className={cx("import-modal-header")}>
          <div className={cx("import-modal-text")}>Add a new user</div>
        </div>

        <div className={cx("import-form-content")}>
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
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>
  );
}

export default CreateAccountByImportFile;
