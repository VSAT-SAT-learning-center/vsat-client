import classNames from "classnames/bind";
import MathRenderer from "../MathRenderer/MathRenderer";
import styles from "./LessonMathDef.module.scss";
const cx = classNames.bind(styles);

function LessonMathDef() {
  const content = `
      <p>Factoring quadratic and polynomial expressions questions ask you to rewrite polynomials in their equivalent, factored form.</p><p>For example, $x^2+3x+2$&nbsp;can be rewritten as $(x+1)(x+2)$, and $x^2-9$ can be rewritten as&nbsp;$(x-3)(x+3)$</p><p>In this lesson, we'll learn to:</p><ol><li>Factor polynomial expressions</li><li>Use knowledge of factoring to evaluate expressions</li></ol><p><strong>You can learn anything. Let's do this!</strong></p>
    `;
  return (
    <div className={cx("lesson-content-def")}>
      <div className={cx("def-title")}>
        What are factoring quadratic and polynomial expressions questions?
      </div>
      <MathRenderer loadedContent={content}/>
    </div>
  );
}

export default LessonMathDef;
