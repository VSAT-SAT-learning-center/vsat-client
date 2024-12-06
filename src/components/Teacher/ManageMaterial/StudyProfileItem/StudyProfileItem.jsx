import classNames from "classnames/bind";
import styles from "./StudyProfileItem.module.scss";
const cx = classNames.bind(styles);

function StudyProfileItem({ profile, setSelectedProfile, setIsShowViewStudyProfile }) {

  const handleViewDetailProfile = () => {
    setSelectedProfile(profile)
    setIsShowViewStudyProfile(true)
  }
  return (
    <div className={cx("study-profile-item-container")}>
      <div className={cx("study-profile-header")}>
        <div className={cx("study-profile-infor")}>
          <img
            src={profile?.account?.profilepictureurl}
            alt="profile-avatar"
            className={cx("profile-avatar")}
          />
          <div className={cx("study-profile-username")}>{profile?.account?.username}</div>
        </div>
        <div className={cx("study-profile-status",
          profile?.status === "Completed"
            ? "completed-status"
            : profile?.status === "Active"
              ? "active-status"
              : "inactive-status")}>{profile?.status}</div>
      </div>
      <div className={cx("study-profile-content")}>
        <div className={cx("profile-content-infor")}>
          <div className={cx("infor-item")}>
            <div className={cx("infor-icon")}>
              <i className={cx("fa-regular fa-layer-group")}></i>
            </div>
            <div className={cx("infor-text")}>
              Target Reading & Writing:{" "}
              <span className={cx("infor-number")}>{profile?.targetscoreRW}</span>
            </div>
          </div>
          <div className={cx("infor-item")}>
            <div className={cx("infor-icon")}>
              <i className={cx("fa-regular fa-layer-group")}></i>
            </div>
            <div className={cx("infor-text")}>
              Target Math: <span className={cx("infor-number")}>{profile?.targetscoreMath}</span>
            </div>
          </div>
          <div className={cx("infor-item")}>
            <div className={cx("infor-icon")}>
              <i className={cx("fa-regular fa-timer")}></i>
            </div>
            <div className={cx("infor-text")}>
              Start Date:{" "}
              <span className={cx("infor-number")}>
                {profile?.startdate}
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
                {profile?.enddate}
              </span>
            </div>
          </div>
        </div>
        <div className={cx("profile-content-action")}>
          <button
            className={cx("view-btn")}
            onClick={handleViewDetailProfile}
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
