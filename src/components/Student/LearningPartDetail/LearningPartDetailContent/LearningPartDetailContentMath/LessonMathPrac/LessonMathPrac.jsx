import classNames from "classnames/bind";
import PropTypes from "prop-types";
import LessonQuestionMath from "../LessonQuestionMath";
import styles from "./LessonMathPrac.module.scss";
const cx = classNames.bind(styles);

function LessonMathPrac({ lessonContent }) {
  return (
    <div className={cx("lesson-content-your-turn")}>
      <div className={cx("your-turn-title")}>{lessonContent?.title}</div>
      <LessonQuestionMath title={lessonContent?.title} questionMathData={lessonContent?.question} />
    </div>
  );
}

LessonMathPrac.propTypes = {
  lessonContent: PropTypes.object,
};

export default LessonMathPrac;
