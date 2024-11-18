import classNames from "classnames/bind";
import { formatDate } from "~/utils/formatDate";
import styles from "./ViewStudyProfile.module.scss";
const cx = classNames.bind(styles);

function TargetLearningItem({ setIsShowViewTargetLearning }) {
  return (
    <div className={cx("target-learning-item")}>
      <div className={cx("target-learing-header")}>
        <div className={cx("target-number")}>1</div>
        <div className={cx("target-content")}>
          <div className={cx("target-title")}>Target Learning</div>
          <div className={cx("target-status")}>Active</div>
        </div>
      </div>
      <div className={cx("target-learing-content")}>
        <div className={cx("target-learning-time")}>
          <div className={cx("time-item")}>
            <i className={cx("fa-regular fa-timer")}></i>
            <span>{formatDate(Date.now())}</span>
          </div>
          <span>-</span>
          <div className={cx("time-item")}>
            <i className={cx("fa-regular fa-timer")}></i>
            <span>{formatDate(Date.now())}</span>
          </div>
        </div>
        <button className={cx("view-btn")} onClick={() => setIsShowViewTargetLearning(true)}>
          <i className={cx("fa-regular fa-arrow-up-right-from-square")}></i>
          <span className={cx("view-text")}>View</span></button>
      </div>
    </div>
  )
}

export default TargetLearningItem
