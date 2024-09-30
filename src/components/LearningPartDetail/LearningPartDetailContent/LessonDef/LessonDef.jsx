import classNames from "classnames/bind";
import DOMPurify from "dompurify";
import { useState } from "react";
import styles from "./LessonDef.module.scss";
const cx = classNames.bind(styles);

function LessonDef() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const content =
    "<p>On the Reading and Writing section of your SAT, some questions will introduce a claim about an unfamiliar subject. The question will then ask you to identify the piece of evidence that&nbsp;<strong>most strongly supports that claim.</strong></p><p>Textual evidence questions will look like this:</p>";

  const questionData = {
    questionId: 1,
    prompt:
      "<p>Jan Gimsa, Robert Sleigh, and Ulrike Gimsa have hypothesized that the sail-like structure running down the back of the dinosaur&nbsp;<em>Spinosaurus aegyptiacus</em>&nbsp;improved the animal’s success in underwater pursuits of prey species capable of making quick, evasive movements. To evaluate their hypothesis, a second team of researchers constructed two battery-powered mechanical models of&nbsp;<em>S. aegyptiacus</em>, one with a sail and one without, and subjected the models to a series of identical tests in a water-filled tank.</p><p>Which finding from the model tests, if true, would most strongly support Gimsa and colleagues’ hypothesis?</p>",
    correctAnswer: "A",
    options: [
      {
        optionId: 1,
        label: "A",
        text: "The model with a sail took significantly longer to travel a specified distance while submerged than the model without a sail did.",
      },
      {
        optionId: 2,
        label: "B",
        text: "The model with a sail displaced significantly more water while submerged than the model without a sail did.",
      },
      {
        optionId: 3,
        label: "C",
        text: "The model with a sail had significantly less battery power remaining after completing the tests than the model without a sail did.",
      },
      {
        optionId: 4,
        label: "D",
        text: "The model with a sail took significantly less time to complete a sharp turn while submerged than the model without a sail did.",
      },
    ],
  };
  const sanitizedContent = DOMPurify.sanitize(content);
  const sanitizedQuestion = DOMPurify.sanitize(questionData.prompt);
  return (
    <div className={cx("lesson-content-def")}>
      <div className={cx("def-title")}>
        What are textual evidence questions?
      </div>
      <div
        className={cx("def-content")}
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      ></div>
      <div className={cx("def-question")}>
        <div className={cx("question-title")}>Textual evidence: Exmaple</div>
        <div
          className={cx("question-content")}
          dangerouslySetInnerHTML={{ __html: sanitizedQuestion }}
        ></div>
        <div className={cx("question-instructions")}>
          <div className={cx("instructions-title")}>Choose 1 answer:</div>
          <div className={cx("instructions-answers")}>
            {questionData.options.map((option) => (
              <div className={cx("answer")} key={option.optionId}>
                <label className={cx("answer-label")}>
                  <input
                    type="radio"
                    value={option.label}
                    checked={selectedOption === option.label}
                    onChange={handleOptionChange}
                    className={cx("answer-select")}
                  />
                  <div
                    className={cx("answer-text")}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(option.text),
                    }}
                  ></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LessonDef;
