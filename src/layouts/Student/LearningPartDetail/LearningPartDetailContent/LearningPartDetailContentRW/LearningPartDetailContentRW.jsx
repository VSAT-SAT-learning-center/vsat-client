import classNames from "classnames/bind";
import LessonApp from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentRW/LessonApp";
import LessonConc from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentRW/LessonConc";
import LessonDef from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentRW/LessonDef";
import LessonPrac from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentRW/LessonPrac";
import LessonTips from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentRW/LessonTips";
import styles from "./LearningPartDetailContentRW.module.scss";
const cx = classNames.bind(styles);
function LearningPartDetailContentRW() {
  const topic = '"command of evidence: textual"';
  return (
    <div className={cx("learning-part-detail-content-rw-container")}>
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
          <LessonDef />
          <LessonConc />
          <LessonApp />
          <LessonTips />
          <LessonPrac />
        </div>
      </div>
    </div>
  );
}

export default LearningPartDetailContentRW;
