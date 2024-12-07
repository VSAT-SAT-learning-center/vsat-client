import classNames from "classnames/bind";
import styles from "./ConfimContinueModal.module.scss";
const cx = classNames.bind(styles);
function ConfimContinueModal({ setShowConfirmContinue, setShowEnterTarget }) {
  const handleCancelTrialExam = () => {
    setShowConfirmContinue(false)
    window.location.href = "/learning";
  }
  return (
    <div className={cx("confirm-continue-popup-wrapper")}>
      <div className={cx("confirm-continue-popup-container")}>
        <div className={cx("confirm-continue-popup-content")}>
          <div className={cx("content-header")}>
            Start Your Learning Journey at VSAT!
          </div>
          <div
            className={cx("content-infor")}
          >{`You've completed the trial exam. Are you ready to continue and begin your personalized learning experience at VSAT Learning Center?`}</div>
        </div>
        <div className={cx("confirm-continue-popup-footer")}>
          <button
            className={cx("cancel-btn")}
            onClick={handleCancelTrialExam}
          >
            Cancel
          </button>
          <button
            className={cx("continue-btn")}
            onClick={() => {
              setShowConfirmContinue(false);
              setShowEnterTarget(true);
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfimContinueModal;
