import classNames from "classnames/bind";
import PropTypes from "prop-types";
import MathRenderer from "../../MathRenderer";
import styles from "./LessonMathConcDetail.module.scss";
import LessonMathConcDetailExample from "./LessonMathConcDetailExample";

const cx = classNames.bind(styles);

function LessonMathConcDetail({ lesson }) {
  return (
    <div className={cx("lesson-content-conc-detail")}>
      <MathRenderer loadedContent={lesson.content} />
      {lesson.example &&
        lesson.example.question !== "" &&
        lesson.example.explanation !== "" && (
          <LessonMathConcDetailExample example={lesson.example} />
        )}
    </div>
  );
}

LessonMathConcDetail.propTypes = {
  lesson: PropTypes.string,
};

export default LessonMathConcDetail;
