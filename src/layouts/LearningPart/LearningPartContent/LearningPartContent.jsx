import classNames from "classnames/bind";
import UnitArea from "../../../components/LearningPart/LearningPartContent/UnitArea";
import styles from "./LearningPartContent.module.scss";
const cx = classNames.bind(styles);

function LearningPartContent() {
  return (
    <div className={cx("learning-part-content-container")}>
      <div className={cx("content-header")}>
        <div className={cx("content-title")}>Unit 1: About the digital SAT</div>
      </div>
      <div className={cx("content-main")}>
        <div className={cx("content-about-unit")}>
          <div className={cx("about-unit-title")}>About this unit</div>
          <div className={cx("about-unit-desc")}>
            Dont know much about the digital SAT? Start here! This unit gives
            you an overview of the structure, format, content, and scoring of
            the test. Youll also learn how to take official practice tests and
            create an SAT prep plan and schedule.
          </div>
        </div>
        <UnitArea/>
        <UnitArea/>
      </div>
    </div>
  );
}

export default LearningPartContent;
