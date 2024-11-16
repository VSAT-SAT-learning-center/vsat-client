import classNames from "classnames/bind";
import styles from "./EnterTargetModal.module.scss";
const cx = classNames.bind(styles);
function EnterTargetModal() {
  return (
    <div className={cx("enter-target-popup-wrapper")}>
      <div className={cx("enter-target-popup-container")}>
        <div className={cx("enter-target-popup-content")}>
          <div className={cx("content-title")}>Set Your Learning Targets</div>
          <div className={cx("content-desc")}>
            Define your target scores for Reading & Writing and Math to guide
            your learning journey at VSAT.
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnterTargetModal;
