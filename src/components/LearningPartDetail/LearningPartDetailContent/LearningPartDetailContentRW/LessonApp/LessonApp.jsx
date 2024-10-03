import classNames from "classnames/bind";
import DOMPurify from "dompurify";
import RWRerender from "../RWRerender/RWRerender";
import styles from "./LessonApp.module.scss";
const cx = classNames.bind(styles);

function LessonApp() {
  const content = `
    <p>To solve a textual evidence question, consider following these steps:</p>
    <blockquote><strong>Step 1:</strong>&nbsp;<em>Identify the argument</em></blockquote>
    <p>Every textual evidence question, whether scientific or literary, will introduce a central argument for the question. It might be a research hypothesis, or it might be an interpretation of a literary text, but either way it will be clearly stated. Your first job is to identify that argument and draw it out from the text.</p>
    <p>For instance, in the example question at the start of this article, you can identify the following hypothesis:&nbsp;<em>"the sail-like structure running down the back of the dinosaur Spinosaurus aegyptiacus improved the animal’s success in underwater pursuits of prey species capable of making quick, evasive movements".</em></p>
    <blockquote><strong>Step 2:</strong>&nbsp;<em>Create a test phrase</em></blockquote>
    <p>Once you've identified the argument you want to support, you should rephrase that argument in the simplest terms possible.</p>
    <p>For example, consider that hypothesis about&nbsp;<em>Spinosaurus aegyptiacus</em>. The claim is that a sail would help the dinosaur hunt quick prey while underwater. You could simplify that as follows:</p>
    <blockquote><strong>Sail on back = quicker underwater movement</strong></blockquote>
    <p>The best choice will make this same argument.</p>
    <blockquote><strong>Step 3:</strong>&nbsp;<em>Test the choices</em></blockquote>
    <p>Read each choice while keeping your test phrase in mind. Does the choice say something different than the test phrase?&nbsp;<strong>If so, eliminate that choice.</strong></p>
    <p>Once you find a choice that makes the same argument as your test phrase, you've found the answer.&nbsp;<strong>You can select that choice with confidence.</strong></p>
  `;

  const sanitizedContent = DOMPurify.sanitize(content);
  return (
    <div className={cx("lesson-content-app")}>
      <div className={cx("app-title")}>
        How to approach textual evidence questions
      </div>
      <RWRerender loadedContent={sanitizedContent} />
    </div>
  );
}

export default LessonApp;
