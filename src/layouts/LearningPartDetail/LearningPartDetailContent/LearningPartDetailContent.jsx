import classNames from "classnames/bind";
import styles from "./LearningPartDetailContent.module.scss";
const cx = classNames.bind(styles);

function LearningPartDetailContent() {
  const topic = '"command of evidence: textual"';
  return (
    <div className={cx("learning-part-detail-content-wrapper")}>
      <div className={cx("learning-part-detail-content-container")}>
        <div className={cx("lesson-main-title")}>
          <div className={cx("main-title")}>
            Command of evidence: textual | Lesson
          </div>
        </div>
        <div className={cx("lesson-guide")}>
          <div className={cx("content-guide")}>
            <div className={cx("guide-text")}>
              {`A guide to ${topic} questions on the digital SAT`}
            </div>
          </div>
        </div>
        <div className={cx("lesson-content-container")}>
          <div className={cx("lesson-content-main")}>
            <div className={cx("lesson-content-def")}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearningPartDetailContent;
