import classNames from "classnames/bind";
import examImg from "~/assets/images/content/test.png";
import styles from "./ConfirmExamModal.module.scss";
const cx = classNames.bind(styles);

function ConfirmExamModal({ setShowSubmitConfirmation, handleSubmit, autoSubmitTimer }) {
  return (
    <div className={cx("confirmation-popup-wrapper")}>
      <div className={cx("confirmation-popup-container")}>
        <div className={cx("exam-image-container")}>
          <img src={examImg} alt="exam-img" className={cx("exam-image")} />
        </div>
        <div className={cx("confirm-title")}>
          {autoSubmitTimer > 0 ? (
            `Time is up! The exam will be automatically submitted in ${autoSubmitTimer} seconds.`
          ) : (
            "Are you sure you want to submit the exam?"
          )}
        </div>
        <div className={cx("confirm-action")}>
          <button
            className={cx("cancel-btn")}
            onClick={() => setShowSubmitConfirmation(false)}
          >
            Cancel
          </button>
          <button className={cx("confirm-btn")} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmExamModal;
