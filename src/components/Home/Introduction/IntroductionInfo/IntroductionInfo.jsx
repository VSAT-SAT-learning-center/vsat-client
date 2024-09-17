import classNames from "classnames/bind";
import styles from "./IntroductionInfo.module.scss";
const cx = classNames.bind(styles);
function IntroductionInfo() {
  return (
    <div className={cx("introduction-info")}>
      <div className={cx("introduction-info-title")}>
        <span className={cx("small-title")}>Great</span>
        <br />
        <span className={cx("smaill-title")}>Deals For You</span>
      </div>
      <div className={cx("introduction-info-desc")}>
        Discover VSAT: personalized lessons, expert instructors, trial exams, and materials for SAT success.
      </div>
    </div>
  )
}

export default IntroductionInfo
