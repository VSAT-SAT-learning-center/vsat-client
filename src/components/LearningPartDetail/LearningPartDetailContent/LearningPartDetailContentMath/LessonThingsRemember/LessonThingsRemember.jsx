import classNames from "classnames/bind";
import styles from "./LessonThingsRemember.module.scss";
import MathRenderer from "../MathRenderer/MathRenderer";
const cx = classNames.bind(styles);

function LessonThingsRemember() {
  const content = `
      <p>Square of sum:&nbsp;$a^2+2ab+b^2=(a+b)^2$</p><p>Square of difference:&nbsp;$a^2-2ab+b^2=(a-b)^2$</p><p>Difference of squares:&nbsp;$a^2-b^2=(a+b)(a-b)$</p>
    `;
  return (
    <div className={cx("lesson-content-remember")}>
      <div className={cx("remember-title")}>Things to remember</div>
      <MathRenderer loadedContent={content} />
    </div>
  );
}

export default LessonThingsRemember;
