import classNames from "classnames/bind";
import examImg from "~/assets/images/content/test.png";
import styles from "./ReloadConfirmPopup.module.scss";
const cx = classNames.bind(styles);

function ReloadConfirmPopup({ onReload, onCancel }) {
  return (
    <div className={cx("reload-confirmation-popup-wrapper")}>
      <div className={cx("reload-confirmation-popup-container")}>
        <div className={cx("exam-image-container")}>
          <img src={examImg} alt="exam-img" className={cx("exam-image")} />
        </div>
        <div className={cx("confirm-title")}>Confirm Page Reload</div>
        <div className={cx("confirm-desc")}>Are you sure you want to reload the page? Your progress may not be saved.</div>
        <div className={cx("confirm-action")}>
          <button className={cx("cancel-btn")} onClick={onCancel}>Cancel</button>
          <button className={cx("confirm-btn")} onClick={onReload}>Reload</button>
        </div>
      </div>
    </div>
  );
}

export default ReloadConfirmPopup;
