import classNames from "classnames/bind";
import DOMPurify from "dompurify";
import NoData from "~/assets/images/content/nonotify.png";
import { formatDate } from "~/utils/formatDate";
import styles from "./Notifications.module.scss";
const cx = classNames.bind(styles);

function Notifications({ notifications }) {
  // console.log(notifications);

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
        {notifications.length > 0 ? (
          <div className={cx("notification-list")}>
            {notifications?.map((notify, index) => (
              <div className={cx("notification-item")} key={index}>
                <div className={cx("user-avatar")}>
                  <img
                    src={notify?.accountFrom?.profilepictureurl}
                    alt="user-avt"
                    className={cx("avatar")}
                  />
                </div>
                <div className={cx("notification-info")}>
                  <div
                    className={cx("notification-content")}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(notify.message),
                    }}
                  />
                  <div className={cx("notification-date")}>
                    {formatDate(notify.createdAt)}
                  </div>
                </div>
                {notify.isRead && (
                  <div className={cx("dot-wrapper")}>
                    <div className={cx("dot")}></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className={cx("notification-no-content")}>
            <div className={cx("no-data-content")}>
              <img
                src={NoData}
                alt="no-data"
                className={cx("no-data-img")}
              />
              <div className={cx("no-data-text")}>No notification yet</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Notifications
