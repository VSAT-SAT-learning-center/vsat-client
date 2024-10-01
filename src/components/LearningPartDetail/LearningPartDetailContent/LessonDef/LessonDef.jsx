import classNames from "classnames/bind";
import DOMPurify from "dompurify";
import LessonQuestion from "../LessonQuestion/LessonQuestion";
import styles from "./LessonDef.module.scss";
const cx = classNames.bind(styles);

function LessonDef() {
  const content =
    "<p>On the Reading and Writing section of your SAT, some questions will introduce a claim about an unfamiliar subject. The question will then ask you to identify the piece of evidence that&nbsp;<strong>most strongly supports that claim.</strong></p><p>Textual evidence questions will look like this:</p>";

  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div className={cx("lesson-content-def")}>
      <div className={cx("def-title")}>
        What are textual evidence questions?
      </div>
      <div
        className={cx("def-content")}
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      ></div>
      <LessonQuestion title="Words in context: Example" />
    </div>
  );
}

export default LessonDef;
