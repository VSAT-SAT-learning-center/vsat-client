import classNames from "classnames/bind";
import styles from "./MarkCompletePopup.module.scss";

const cx = classNames.bind(styles);


function MarkCompletePopup({ message, setShowMarkPopup }) {
  return (
    <div className={cx("mark-complete-popup-wrapper")}>
      <div className={cx("mark-complete-popup-container")}>
        <div className={cx("mark-title")}>Mark complete?</div>
        <div className={cx("mark-decs")}>{message}</div>
        <div className={cx("mark-action")}>
          <button className={cx("cancel-btn")} onClick={() => setShowMarkPopup(false)}>Cancel</button>
          <button className={cx("submit-btn")}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default MarkCompletePopup
