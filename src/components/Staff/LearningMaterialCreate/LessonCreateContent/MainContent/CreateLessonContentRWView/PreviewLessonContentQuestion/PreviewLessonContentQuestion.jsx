import classNames from "classnames/bind";
import DOMPurify from "dompurify";
import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./PreviewLessonContentQuestion.module.scss";
const cx = classNames.bind(styles);

function PreviewLessonContentQuestion({ title, questionData }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [isCheckError, setIsCheckError] = useState(false);
  const [isShowExplain, setIsShowExplain] = useState(false);
  const handleOptionChange = (e) => {
    if (isCheckError) setIsCheckError(false);
    setSelectedOption(e.target.value);
  };

  const handleShowExplain = () => {
    setIsShowExplain(!isShowExplain);
  };

  const sanitizedQuestion = DOMPurify.sanitize(questionData.prompt);
  const sanitizedExplain = DOMPurify.sanitize(questionData.explanation);

  return (
    <div className={cx("question-container")}>
      <div className={cx("question-title")}>{title}</div>
      <div
        className={cx("question-content")}
        dangerouslySetInnerHTML={{ __html: sanitizedQuestion }}
      ></div>
      <div className={cx("question-answers")}>
        <div className={cx("answers-title")}>Choose 1 answer:</div>
        <div className={cx("answers-list")}>
          {questionData.answers.map((option) => (
            <div key={option.answerId} className={cx("answer")}>
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
                />
              </label>
            </div>
          ))}
        </div>
        <div className={cx("question-show-explain")}>
          <div className={cx("show-explain-title")} onClick={handleShowExplain}>
            <div className={cx("title")}>
              {isShowExplain ? "Hide explanation" : "Answer explanation"}
            </div>
            <i
              className={cx(
                isShowExplain
                  ? "fa-solid fa-chevron-up"
                  : "fa-solid fa-chevron-down",
                "icon-show"
              )}
            ></i>
          </div>
          {isShowExplain && (
            <div
              className={cx("explain-content-text")}
              dangerouslySetInnerHTML={{ __html: sanitizedExplain }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

PreviewLessonContentQuestion.propTypes = {
  questionData: PropTypes.object,
  title: PropTypes.string,
};

export default PreviewLessonContentQuestion;
