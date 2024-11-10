import classNames from "classnames/bind";
import PropTypes from "prop-types";
import LessonQuestion from "../LessonQuestion";
import styles from "./LessonPrac.module.scss";
const cx = classNames.bind(styles);

function LessonPrac({ lessonContent }) {
  return (
    <div className={cx("lesson-content-prac")}>
      <div className={cx("prac-title")}>{lessonContent?.title}</div>
      <LessonQuestion title={lessonContent?.title} questionData={lessonContent?.question} />
    </div>
  );
}

LessonPrac.propTypes = {
  lessonContent: PropTypes.object,
};

export default LessonPrac;
