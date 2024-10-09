import classNames from "classnames/bind";
import styles from "./HeaderNotification.module.scss";
const cx = classNames.bind(styles);

function HeaderNotification() {
  const countNotifications = 10;
  return (
    <div className={cx("notification")}>
      <i className={cx("fa-sharp fa-regular fa-bell", "icon")}></i>
      {countNotifications > 0 && (
        <div className={cx("count-notification")}>
          <div className={cx("number")}>
            {countNotifications > 9 ? 9 : countNotifications}
          </div>
          {countNotifications > 9 && (
            <i className={cx("fa-solid fa-plus", "plus-icon")}></i>
          )}
        </div>
      )}
    </div>
  );
}

export default HeaderNotification;