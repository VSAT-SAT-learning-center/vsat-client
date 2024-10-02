import classNames from "classnames/bind";
import DOMPurify from "dompurify";
import styles from "./LessonTips.module.scss";
const cx = classNames.bind(styles);

function LessonTips() {
  const content = `
  <h3>Charge it (+/-)</h3><p>Sometimes connotation alone is enough to answer a words in context question. Is the text expressing something&nbsp;<strong>positive</strong>? If so, we can eliminate any choices that are too&nbsp;<strong>negative</strong>&nbsp;or&nbsp;<strong>neutral</strong>.</p><h3>Avoid unknowns</h3><p>On test day, you may encounter some words that you don't know. Many test-takers make the mistake of selecting words that they don't know in the choices instead of ones they know better and "feel right". These students think the words they know better must be "traps", because they might "seem too easy". This strategy can often backfire.</p><p>To raise your chances of getting words in context questions correct, try this instead:</p><ul><li>Eliminate what you can from the words you&nbsp;<em>do</em>&nbsp;know</li><li>Select an option from what remains.</li></ul><p><strong>Note:</strong>&nbsp;The only time you should select a word you don't know is if you can confidently eliminate&nbsp;<em>all</em>&nbsp;of the other choices.</p>
  `;

  const sanitizedContent = DOMPurify.sanitize(content);
  return (
    <div className={cx("lesson-content-tips")}>
      <div className={cx("tips-title")}>Top tips</div>
      <div
        className={cx("tips-content")}
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      ></div>
    </div>
  );
}

export default LessonTips;
