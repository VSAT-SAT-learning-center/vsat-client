import classNames from "classnames/bind";
import styles from "./PopupCensorConfirm.module.scss";
const cx = classNames.bind(styles);

function PopupCensorConfirm() {
  return (
    <div className={cx("popup-censor-confirm-wrapper")}>
      <div className={cx("popup-censor-confirm-container")}></div>
    </div>
  );
}

export default PopupCensorConfirm;
