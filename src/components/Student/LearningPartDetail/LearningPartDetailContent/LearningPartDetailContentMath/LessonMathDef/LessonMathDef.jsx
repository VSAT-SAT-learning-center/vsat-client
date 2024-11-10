import classNames from "classnames/bind";
import PropTypes from "prop-types";
import MathRenderer from "../MathRenderer";
import styles from "./LessonMathDef.module.scss";
const cx = classNames.bind(styles);

function LessonMathDef({ lessonContent }) {
  return (
    <div className={cx("lesson-content-def")}>
      <div className={cx("def-title")}>
        {lessonContent?.title}
      </div>
      <MathRenderer loadedContent={lessonContent?.contents[0].text} />
    </div>
  );
}

LessonMathDef.propTypes = {
  lessonContent: PropTypes.object,
};

export default LessonMathDef;
