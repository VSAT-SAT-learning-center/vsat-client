import classNames from "classnames/bind";
import styles from "./AboutAchievements.module.scss";
const cx = classNames.bind(styles);

function AboutAchievements() {
  return (
    <div className={cx("achievements-container")}>
      <div className={cx("achievement-card", "orange")}>
        <div className={cx("card-title")}>100+</div>
        <div className={cx("card-sub-title")}>Specialist Good Teachers</div>
      </div>
      <div className={cx("achievement-card", "purple")}>
        <div className={cx("card-title")}>200+</div>
        <div className={cx("card-sub-title")}>Online Learning Courses</div>
      </div>
      <div className={cx("achievement-card", "red")}>
        <div className={cx("card-title")}>350+</div>
        <div className={cx("card-sub-title")}>Students participate online</div>
      </div>
      <div className={cx("achievement-card", "blue")}>
        <div className={cx("card-title")}>1000+</div>
        <div className={cx("card-sub-title")}>
          Standard and diversified banking
        </div>
      </div>
    </div>
  );
}

export default AboutAchievements;
