import classNames from "classnames/bind";
import styles from "./ExamCreateModal.module.scss";
const cx = classNames.bind(styles);
function ExamCreateModal({ setIsShowCreateExamModal }) {
  return (
    <div className={cx("exam-create-modal-wrapper")}>
      <div className={cx("exam-create-modal-container")}>
        <div className={cx("exam-create-modal-header")}>
          <div
            className={cx("exam-close")}
            onClick={() => setIsShowCreateExamModal(false)}
          >
            <i className={cx("fa-regular fa-arrow-left")}></i>
          </div>
          <div className={cx("exam-title")}>Create Exam</div>
          <div className={cx("exam-empty")}></div>
        </div>
      </div>
    </div>
  );
}

export default ExamCreateModal;
