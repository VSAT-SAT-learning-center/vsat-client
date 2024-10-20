import classNames from "classnames/bind";
import PropTypes from "prop-types";
import MathRenderer from "../../MathRenderer";
import styles from "./LessonMathConcDetail.module.scss";
import LessonMathConcDetailExample from "./LessonMathConcDetailExample";

const cx = classNames.bind(styles);

function LessonMathConcDetail({ lesson }) {
  console.log(lesson);

  return (
    <div className={cx("lesson-content-conc-detail")}>
      <MathRenderer loadedContent={lesson.text} />
      {/* {lesson.example &&
        lesson.example.question !== "" &&
        lesson.example.explanation !== "" && (
          <LessonMathConcDetailExample example={lesson.example} />
        )} */}
      {lesson?.examples && lesson?.examples.map((example) => (
        <LessonMathConcDetailExample example={example} key={example.exampleId} />
      ))}
    </div>
  );
}

LessonMathConcDetail.propTypes = {
  lesson: PropTypes.string,
};

export default LessonMathConcDetail;
