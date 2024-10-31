import classNames from "classnames/bind";
import styles from "./CreateExamScoreModal.module.scss";
const cx = classNames.bind(styles);

function CreateExamScoreModal({
  examTitle,
  examType,
  setExamTitle,
  setExamType,
  setIsShowCreateExamScoreModal,
  setIsShowImportExamScore,
}) {
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
    <div className={cx("create-exam-score-modal-wrapper")}>
      <div className={cx("create-exam-score-modal-container")}>
        <div className={cx("create-exam-score-modal-header")}>
          <div className={cx("create-exam-score-modal-title")}>
            Create Exam Score
          </div>
          <div
            className={cx("create-exam-score-modal-close")}
            onClick={() => setIsShowCreateExamScoreModal(false)}
          >
            <i className={cx("fa-regular fa-xmark")}></i>
          </div>
        </div>
        <div className={cx("create-exam-score-modal-content")}>
          <div className={cx("create-exam-item-main")}>
            <div className={cx("item-icon")}>
              <i className="fa-sharp fa-regular fa-file-pen"></i>
            </div>
            <input
              type="text"
              className={cx("item-input")}
              placeholder="Exam Score Title"
              autoFocus={true}
              onChange={handleChangeExamTitle}
            />
          </div>
          <div className={cx("create-exam-item-main")}>
            <div className={cx("item-icon")}>
              <i className="fa-sharp fa-regular fa-file-pen"></i>
            </div>
            <input
              type="text"
              className={cx("item-input")}
              placeholder="Exam score type"
              onChange={handleChangeExamType}
            />
          </div>
          <button
            className={cx("create-exam-score-detail-btn", {
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

export default CreateExamScoreModal;
