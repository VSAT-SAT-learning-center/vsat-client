import classNames from "classnames/bind";
import DOMPurify from "dompurify";
import RWRerender from "../RWRerender/RWRerender";
import styles from "./LessonConc.module.scss";
const cx = classNames.bind(styles);

function LessonConc() {
  const content = `
  <p>A "precise" word is one that means exactly what it should in a given situation: it will fit its sentence perfectly and&nbsp;<strong>reinforce the text's meaning.</strong></p><p>This last bit is important. We're not just looking for a word that sounds right or looks good. Instead, we need to understand the text and select the word with a meaning that&nbsp;<em>best matches</em>&nbsp;the point the text is making. This means that, when attempting words in context questions, reading comprehension is just as important as our knowledge of vocabulary.</p><p>To help us identify the best word in context, we should focus on two things: context and connotation.</p><h3>Context</h3><p>Context refers to the specific scenario we're attempting to match a word or phrase to. To understand the context, we must&nbsp;<strong>read the provided text carefully</strong>.</p><p>Because we need to know the&nbsp;<em>meaning</em>&nbsp;of the word we're looking for, that meaning will be provided a second time within the text. This results in many prompts for words in context questions following a similar pattern of</p><blockquote><strong>Statement. Restatement.</strong></blockquote><p>The trick then is to match the word we're looking for with the equivalent idea in the other statement.</p><p><strong>For example, let's look back at our example item prompt:</strong></p><blockquote>In recommending Bao Phi’s collection Sông I Sing, a librarian noted that pieces by the spoken-word poet don’t lose their ______ nature when printed: the language has the same pleasant musical quality on the page as it does when performed by Phi.</blockquote><p>We have two matching statements here:</p><ul><li>The poems keep their _____ nature when printed.</li><li>The poems have the same pleasant musical quality when "on the page".</li></ul><p>Notice how the blank in the first statement lines up with the phrase&nbsp;<em>pleasant musical quality</em>&nbsp;in the second statement. This is the context that tells us what word that we should choose: the word that most closely means "pleasant" and "musical".</p><h3>Connotation</h3><p>"Connotations" are the associations that we have with different words. One common example of connotation is whether a word feels&nbsp;<em>positive</em>&nbsp;or&nbsp;<em>negative</em>. Words can have similar meanings but vastly different connotations.</p><p>For example, the words "promising" and "ominous" both mean that something is predictive of the future. However, while "promising" has a strongly positive connotation, "ominous" has a strongly negative connotation. Therefore, these words can't logically applied to the same context.</p><p>If you're stuck on a words in context question, try focusing on these connotations. Is the sentence positive? Then the word we choose should be positive too!</p><p><strong>For example:</strong></p><ul><li>The basketball star's&nbsp;<strong>promising</strong>&nbsp;play this season suggests a bright future.</li><li>The dark,&nbsp;<strong>ominous</strong>&nbsp;clouds on the horizon suggest a storm is coming.</li></ul><p>Based on context clues like "bright" and "storm", it's clear where the positive and negative words are most appropriate.</p>
  `;

  const sanitizedContent = DOMPurify.sanitize(content);
  return (
    <div className={cx("lesson-content-conc")}>
      <div className={cx("conc-title")}>
        How should we think about textual evidence questions?
      </div>
      <RWRerender loadedContent={sanitizedContent} />
    </div>
  );
}

export default LessonConc;
