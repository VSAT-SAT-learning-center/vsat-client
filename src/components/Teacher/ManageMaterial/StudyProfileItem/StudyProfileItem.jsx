import classNames from "classnames/bind";
import Avatar from "~/assets/images/banner/01.png";
import { formatDate } from "~/utils/formatDate";
import styles from "./StudyProfileItem.module.scss";
const cx = classNames.bind(styles);

function StudyProfileItem({ setIsShowViewStudyProfile }) {
  return (
    <div className={cx("study-profile-item-container")}>
      <div className={cx("study-profile-header")}>
        <div className={cx("study-profile-infor")}>
          <img
            src={Avatar}
            alt="profile-avatar"
            className={cx("profile-avatar")}
          />
          <div className={cx("study-profile-username")}>DevDoubleD</div>
        </div>
        <div className={cx("study-profile-status")}>Active</div>
      </div>
      <div className={cx("study-profile-content")}>
        <div className={cx("profile-content-infor")}>
          <div className={cx("infor-item")}>
            <div className={cx("infor-icon")}>
              <i className={cx("fa-regular fa-layer-group")}></i>
            </div>
            <div className={cx("infor-text")}>
              Target Reading & Writing:{" "}
              <span className={cx("infor-number")}>600</span>
            </div>
          </div>
          <div className={cx("infor-item")}>
            <div className={cx("infor-icon")}>
              <i className={cx("fa-regular fa-layer-group")}></i>
            </div>
            <div className={cx("infor-text")}>
              Target Math: <span className={cx("infor-number")}>600</span>
            </div>
          </div>
          <div className={cx("infor-item")}>
            <div className={cx("infor-icon")}>
              <i className={cx("fa-regular fa-timer")}></i>
            </div>
            <div className={cx("infor-text")}>
              Start Date:{" "}
              <span className={cx("infor-number")}>
                {formatDate(Date.now())}
              </span>
            </div>
          </div>
          <div className={cx("infor-item")}>
            <div className={cx("infor-icon")}>
              <i className={cx("fa-regular fa-clock")}></i>
            </div>
            <div className={cx("infor-text")}>
              End Date:{" "}
              <span className={cx("infor-number")}>
                {formatDate(Date.now())}
              </span>
            </div>
          </div>
        </div>
        <div className={cx("profile-content-action")}>
          <button
            className={cx("view-btn")}
            onClick={() => setIsShowViewStudyProfile(true)}
          >
            <i className={cx("fa-regular fa-arrow-up-right-from-square")}></i>
            <span className={cx("view-text")}>View Detail</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudyProfileItem;
