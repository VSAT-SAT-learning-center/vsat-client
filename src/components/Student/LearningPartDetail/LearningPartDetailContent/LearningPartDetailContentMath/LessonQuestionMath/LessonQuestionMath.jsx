import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useState } from "react";
import { renderMathAndText } from "~/utils/renderMathAndText";
import styles from "./LessonQuestionMath.module.scss";
const cx = classNames.bind(styles);
function LessonQuestionMath({ title, questionMathData }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [isCheckError, setIsCheckError] = useState(false);
  const [isShowExplain, setIsShowExplain] = useState(false);
  const [checkedAnswers, setCheckedAnswers] = useState({});
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [incorrectIndex, setIncorrectIndex] = useState(null);
  const [correctIndex, setCorrectIndex] = useState(null);
  const handleOptionChange = (e) => {
    if (isCheckError) setIsCheckError(false);
    setSelectedOption(e.target.value);
  };

  const handleCheckQuesion = () => {
    if (selectedOption === "") {
      setIsCheckError(true);
      return;
    }
    const selectedIndex = questionMathData?.answers.findIndex(
      (answer) => answer.label === selectedOption
    );

    setCheckedAnswers((prev) => ({
      ...prev,
      [selectedOption]:
        selectedOption === questionMathData?.correctAnswer
          ? "correct"
          : "incorrect",
    }));

    if (selectedOption !== questionMathData?.correctAnswer) {
      setIncorrectIndex(selectedIndex);
    } else {
      setCorrectIndex(selectedIndex);
    }

    if (selectedOption === questionMathData?.correctAnswer) {
      setIsAnswerCorrect(true);
    }
  };

  const handleShowExplain = () => {
    setIsShowExplain(!isShowExplain);
  };

  return (
    <div className={cx("question-container")}>
      <div className={cx("question-title")}>{title}</div>
      <div
        className={cx("question-content")}
        dangerouslySetInnerHTML={{
          __html: renderMathAndText(questionMathData?.prompt),
        }}
      ></div>
      <div className={cx("question-answers")}>
        <div className={cx("answers-title")}>Choose 1 answer:</div>
        <div className={cx("answers-list")}>
          {questionMathData?.answers.map((answer, index) => (
            <div
              key={answer.answerId}
              className={cx("answer", {
                correctAnswer: checkedAnswers[answer.label] === "correct",
                incorrectAnswer: checkedAnswers[answer.label] === "incorrect",
                disabled: isAnswerCorrect,
                "no-border-bottom":
                  incorrectIndex === index + 1 || correctIndex === index + 1,
              })}
            >
              <label
                className={cx("answer-label", { disabled: isAnswerCorrect })}
              >
                <input
                  type="radio"
                  value={answer.label}
                  checked={selectedOption === answer.label}
                  onChange={handleOptionChange}
                  className={cx("answer-select", {
                    correctAnswer: checkedAnswers[answer.label] === "correct",
                    incorrectAnswer:
                      checkedAnswers[answer.label] === "incorrect",
                    disabled: isAnswerCorrect,
                  })}
                  disabled={isAnswerCorrect}
                />
                <div
                  className={cx("answer-text", {
                    correctAnswer: checkedAnswers[answer.label] === "correct",
                    incorrectAnswer:
                      checkedAnswers[answer.label] === "incorrect",
                  })}
                  dangerouslySetInnerHTML={{
                    __html: renderMathAndText(answer.text),
                  }}
                />
              </label>
            </div>
          ))}
        </div>
        {isCheckError && (
          <div className={cx("check-nothing-error")}>
            <div className={cx("error-text")}>
              {
                "We couldn't grade your answer. It looks like you left something blank or entered in an invalid answer."
              }
            </div>
          </div>
        )}
        <div className={cx("question-check")}>
          <button
            className={cx("question-check-btn")}
            onClick={handleCheckQuesion}
          >
            Check
          </button>
        </div>
        <div className={cx("question-show-explain")}>
          <div className={cx("show-explain-title")} onClick={handleShowExplain}>
            <div className={cx("title")}>
              {isAnswerCorrect && isShowExplain
                ? "Hide explanation"
                : "Answer explanation"}
            </div>
            <i
              className={cx(
                isAnswerCorrect && isShowExplain
                  ? "fa-solid fa-chevron-up"
                  : "fa-solid fa-chevron-down",
                "icon-show"
              )}
            ></i>
          </div>
          {isAnswerCorrect && isShowExplain && (
            <div
              className={cx("explain-content-text")}
              dangerouslySetInnerHTML={{
                __html: renderMathAndText(questionMathData.explanation),
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

LessonQuestionMath.propTypes = {
  title: PropTypes.string,
  questionMathData: PropTypes.object,
};

export default LessonQuestionMath;
