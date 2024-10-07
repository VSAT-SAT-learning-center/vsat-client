import classNames from "classnames/bind";
import LessonQuestion from "../LessonQuestion";
import styles from "./LessonPrac.module.scss";
const cx = classNames.bind(styles);

function LessonPrac() {
  return (
    <div className={cx("lesson-content-prac")}>
      <div className={cx("prac-title")}>Your turn</div>
      <LessonQuestion title="Words in context" />
    </div>
  );
}

export default LessonPrac;
