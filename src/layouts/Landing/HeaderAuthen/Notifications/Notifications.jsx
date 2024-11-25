import classNames from "classnames/bind";
import styles from "./Notifications.module.scss";
const cx = classNames.bind(styles);

function Notifications({ notifications }) {
  return (
    <div className={cx("notification-wrapper")}>
      <div className={cx("notification-container")}>
        <div className={cx("notification-heading")}>
          <div className={cx("text")}>Notifications</div>
        </div>
        <div className={cx("mark-as-read")}>
          <button
            className={cx("mark-as-read-btn")}
          >
            Mark as read
          </button>
        </div>
        <div className={cx("notification-list")}>
          {notifications?.map((notify, index) => (
            <div className={cx("notification-item")} key={index}>{notify.message}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Notifications
