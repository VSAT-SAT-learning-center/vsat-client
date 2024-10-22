import classNames from "classnames/bind";
import PropTypes from "prop-types";
import LessonQuestionMath from "../LessonQuestionMath";
import styles from "./LessonMathConc.module.scss";
import LessonMathConcDetail from "./LessonMathConcDetail/LessonMathConcDetail";
const cx = classNames.bind(styles);

function LessonMathConc({ lessonContent }) {
  return (
    <div className={cx("lesson-content-conc")}>
      <div className={cx("conc-title")}>
        {lessonContent?.title}
      </div>
      <div className={cx("conc-content")}>
        {lessonContent.contents.map((lesson, index) => (
          <LessonMathConcDetail lesson={lesson} key={index} />
        ))}
      </div>
      <div className={cx("conc-try-it")}>
        <div className={cx("try-it-title")}>Try it!</div>
        <LessonQuestionMath title={lessonContent?.title} questionMathData={lessonContent?.question} />
      </div>
    </div>
  );
}

LessonMathConc.propTypes = {
  lessonContent: PropTypes.object,
};

export default LessonMathConc;
