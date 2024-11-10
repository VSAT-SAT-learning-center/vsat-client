import classNames from "classnames/bind";
import { useState } from "react";
import styles from "./CreateQuestionDistributionModal.module.scss";

const cx = classNames.bind(styles);

function CreateQuestionDistributionModal({
  examTitle,
  setExamTitle,
  setExamTime,
  setIsShowCreateExamScoreModal,
  setIsShowImportExamScore,
}) {
  const [startDate, setStartDate] = useState(null);

  const handleImportScoreDetail = () => {
    setExamTime(startDate);
    setIsShowImportExamScore(true);
  };
  const handleChangeExamTitle = (e) => {
    setExamTitle(e.target.value);
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
              <div className={cx("date-picker-container")}>
                <input
                  type="date"
                  value={
                    startDate ? startDate.toISOString().substring(0, 10) : ""
                  }
                  onChange={(e) => setStartDate(new Date(e.target.value))}
                  placeholder="From"
                  className={cx("date-input")}
                />
              </div>
            </div>
          </div>
          <button
            className={cx("create-question-distribution-detail-btn", {
              "disabled-btn": !examTitle,
            })}
            onClick={handleImportScoreDetail}
            disabled={!examTitle}
          >
            <i
              className={cx("fa-regular fa-cloud-arrow-up", "import-icon")}
            ></i>
            <span className={cx("import-text")}>
              Import question distribution
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateQuestionDistributionModal;
