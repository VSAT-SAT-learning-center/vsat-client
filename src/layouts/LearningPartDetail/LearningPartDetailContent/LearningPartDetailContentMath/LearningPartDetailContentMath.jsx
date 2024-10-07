import classNames from "classnames/bind";
import LessonMathConc from "../../../../components/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentMath/LessonMathConc";
import LessonMathDef from "../../../../components/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentMath/LessonMathDef";
import LessonMathPrac from "../../../../components/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentMath/LessonMathPrac";
import LessonThingsRemember from "../../../../components/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentMath/LessonThingsRemember";
import styles from "./LearningPartDetailContentMath.module.scss";
const cx = classNames.bind(styles);

function LearningPartDetailContentMath() {
  const topic = `Factoring quadratic and polynomial expressions`;
  return (
    <div className={cx("learning-part-detail-content-math-container")}>
      <div className={cx("lesson-main-title")}>
        <div className={cx("main-title")}>{topic} | Lesson</div>
      </div>
      <div className={cx("lesson-guide")}>
        <div className={cx("content-guide")}>
          <div className={cx("guide-text")}>
            {`A guide to ${topic.toLowerCase()} questions on the digital SAT`}
          </div>
        </div>
      </div>
      <div className={cx("lesson-content-container")}>
        <div className={cx("lesson-content-main")}>
          <LessonMathDef />
          <LessonMathConc />
          <LessonMathPrac />
          <LessonThingsRemember />
        </div>
      </div>
    </div>
  );
}

export default LearningPartDetailContentMath;
