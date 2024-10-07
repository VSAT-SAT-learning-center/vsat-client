import classNames from "classnames/bind";
import LessonQuestionMath from "../LessonQuestionMath";
import styles from "./LessonMathPrac.module.scss";
const cx = classNames.bind(styles);

function LessonMathPrac() {
  return (
    <div className={cx("lesson-content-your-turn")}>
      <div className={cx("your-turn-title")}>Your turn!</div>
      <LessonQuestionMath title="Practice: use special factoring" />
    </div>
  );
}

export default LessonMathPrac;
