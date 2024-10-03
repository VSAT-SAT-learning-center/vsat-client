import classNames from "classnames/bind";
import { lessonMathData } from "../../../../../data/LearningPartDetailContent/lessonMathData";
import LessonQuestionMath from "../LessonQuestionMath/LessonQuestionMath";
import styles from "./LessonMathConc.module.scss";
import LessonMathConcDetail from "./LessonMathConcDetail/LessonMathConcDetail";
const cx = classNames.bind(styles);

function LessonMathConc() {
  return (
    <div className={cx("lesson-content-conc")}>
      <div className={cx("conc-title")}>
        How do I calculate the volumes and dimensions of shapes?
      </div>
      <div className={cx("conc-content")}>
        {lessonMathData.map((lesson) => (
          <LessonMathConcDetail lesson={lesson} key={lesson.id} />
        ))}
      </div>
      <div className={cx("conc-try-it")}>
        <div className={cx("try-it-title")}>Try it!</div>
        <LessonQuestionMath title="Try: factor a quadratic expression"/>
      </div>
    </div>
  );
}

export default LessonMathConc;
