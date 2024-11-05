import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import apiClient from "~/services/apiService";
import styles from "./CreateQuestionDistributionModal.module.scss";
const cx = classNames.bind(styles);

function CreateQuestionDistributionModal({
  examTitle,
  examType,
  setExamTitle,
  setExamType,
  setIsShowCreateExamScoreModal,
  setIsShowImportExamScore,
}) {
  const [examStructureType, setExamStructureType] = useState([]);

  useEffect(() => {
    const fetchExamType = async () => {
      try {
        const response = await apiClient.get("/exam-structure-types");
        setExamStructureType(response.data.data);
      } catch (error) {
        console.error("Failed to fetch exam type", error);
      }
    };

    fetchExamType();
  }, []);

  const handleImportScoreDetail = () => {
    setIsShowImportExamScore(true);
  };
  const handleChangeExamTitle = (e) => {
    setExamTitle(e.target.value);
  };
  const handleChangeExamType = (e) => {
    setExamType(e.target.value);
  };
  return (
    <div className={cx("create-question-distribution-modal-wrapper")}>
      <div className={cx("create-question-distribution-modal-container")}>
        <div className={cx("create-question-distribution-modal-header")}>
          <div className={cx("create-question-distribution-modal-title")}>
            Create Question Distribution
          </div>
          <div
            className={cx("create-question-distribution-modal-close")}
            onClick={() => setIsShowCreateExamScoreModal(false)}
          >
            <i className={cx("fa-regular fa-xmark")}></i>
          </div>
        </div>
        <div className={cx("create-question-distribution-modal-content")}>
          <div className={cx("create-exam-item-container")}>
            <div className={cx("score-section")}>
              Question Distribution Title
              <span className={cx("required")}>(Required)</span>
            </div>
            <div className={cx("create-exam-item-main")}>
              <div className={cx("item-icon")}>
                <i className="fa-sharp fa-regular fa-file-pen"></i>
              </div>
              <input
                type="text"
                className={cx("item-input")}
                placeholder="Title..."
                autoFocus={true}
                onChange={handleChangeExamTitle}
              />
            </div>
          </div>
          <div className={cx("create-exam-item-container")}>
            <div className={cx("score-section")}>
            Question Distribution Time
              <span className={cx("required")}>(Required)</span>
            </div>
            <div className={cx("create-exam-item-main")}>
              <div className={cx("item-icon")}>
                <i className="fa-sharp fa-regular fa-file-pen"></i>
              </div>
              <select
                id="type-section"
                className={cx("section-select")}
                onChange={handleChangeExamType}
              >
                <option value="">Select type</option>
                {examStructureType?.map((type) => (
                  <option value={type.name} key={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            className={cx("create-question-distribution-detail-btn", {
              "disabled-btn": !examTitle || !examType,
            })}
            onClick={handleImportScoreDetail}
            disabled={!examTitle || !examType}
          >
            <i
              className={cx("fa-regular fa-cloud-arrow-up", "import-icon")}
            ></i>
            <span className={cx("import-text")}>Import score detail</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateQuestionDistributionModal;
