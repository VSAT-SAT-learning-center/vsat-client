import classNames from "classnames/bind";
import { formatDate } from "~/utils/formatDate";
import styles from "./ViewStudyProfile.module.scss";
const cx = classNames.bind(styles);

function TargetLearningItem({
  target,
  index,
  setTargetSelected,
  setIsShowViewTargetLearning,
}) {
  const handleViewTarget = () => {
    setTargetSelected(target);
    setIsShowViewTargetLearning(true);
  };
  return (
    <div className={cx("target-learning-item")}>
      <div className={cx("target-learing-header")}>
        <div className={cx("target-number")}>{index}</div>
        <div className={cx("target-content")}>
          <div className={cx("target-title")}>Target Learning</div>
          <div
            className={cx(
              "target-status",
              target?.status === "Completed"
                ? "completed"
                : target?.status === "Active"
                  ? "active"
                  : target?.status === "Certified"
                    ? "certified"
                    : "inactive"
            )}
          >
            {target?.status}
          </div>
        </div>
      </div>
      <div className={cx("target-learing-content")}>
        <div className={cx("target-learning-time")}>
          <div className={cx("time-item")}>
            <i className={cx("fa-regular fa-timer")}></i>
            {target?.startdate === null ? (
              <span>Not started</span>
            ) : (
              <span>{formatDate(target?.startdate)}</span>
            )}
          </div>
          <span>-</span>
          <div className={cx("time-item")}>
            <i className={cx("fa-regular fa-timer")}></i>
            {target?.enddate === null ? (
              <span>Not started</span>
            ) : (
              <span>{formatDate(target?.enddate)}</span>
            )}
          </div>
        </div>
        {(target?.status === "Completed" || target?.status === "Active") && (
          <button className={cx("view-btn")} onClick={handleViewTarget}>
            <i className={cx("fa-regular fa-arrow-up-right-from-square")}></i>
            <span className={cx("view-text")}>View</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default TargetLearningItem;
