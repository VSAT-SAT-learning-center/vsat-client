import classNames from "classnames/bind";
import PropTypes from "prop-types";
import MathRenderer from "../../MathRenderer";
import styles from "./LessonMathConcDetail.module.scss";
import LessonMathConcDetailExample from "./LessonMathConcDetailExample";

const cx = classNames.bind(styles);

function LessonMathConcDetail({ lesson }) {
  return (
    <div className={cx("lesson-content-conc-detail")}>
      <MathRenderer loadedContent={lesson.text} />
      {lesson?.examples && lesson?.examples.map((example) => (
        <LessonMathConcDetailExample example={example} key={example.exampleId} />
      ))}
    </div>
  );
}

LessonMathConcDetail.propTypes = {
  lesson: PropTypes.object,
};

export default LessonMathConcDetail;
