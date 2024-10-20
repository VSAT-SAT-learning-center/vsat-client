import classNames from "classnames/bind";
import PropTypes from "prop-types";
import MathRenderer from "../MathRenderer";
import styles from "./LessonThingsRemember.module.scss";
const cx = classNames.bind(styles);

function LessonThingsRemember({ lessonContent }) {
  return (
    <div className={cx("lesson-content-remember")}>
      <div className={cx("remember-title")}>{lessonContent?.title}</div>
      <MathRenderer loadedContent={lessonContent?.contents[0].text} />
    </div>
  );
}

LessonThingsRemember.propTypes = {
  lessonContent: PropTypes.object,
};

export default LessonThingsRemember;
