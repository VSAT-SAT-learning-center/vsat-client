import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { renderMathAndText } from "~/utils/renderMathAndText";
import styles from "./UnitTestPractice.module.scss";
const cx = classNames.bind(styles);

function UnitTestPractice({
  question,
  onAnswerSelected,
  onAnswerChecked,
  selectedAnswer,
  showExplanation,
  setValidateAnswer,
  firstSelectedAnswer,
  setFirstSelectedAnswer,
}) {
  const [answerStatus, setAnswerStatus] = useState({}); // Track styles for each answer

  useEffect(() => {
    // Expose the validation function to the parent
    setValidateAnswer(() => handleValidation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAnswer]);

  const handleAnswerClick = (id) => {
    if (answerStatus[id] === "incorrect") return; // Prevent reselecting an already incorrect answer

    // Set the first selected answer if it's not already set
    if (!firstSelectedAnswer) {
      setFirstSelectedAnswer(id);
    }

    onAnswerSelected(id); // Notify parent of selected answer
  };

  const handleValidation = () => {
    const selected = question.answers.find((answer) => answer.answerId === selectedAnswer);

    if (selected) {
      if (selected.isCorrect) {
        setAnswerStatus((prev) => ({
          ...prev,
          [selected.answerId]: "correct", // Mark correct answer
        }));
        onAnswerChecked(true); // Notify parent that the answer is correct
      } else {
        setAnswerStatus((prev) => ({
          ...prev,
          [selected.answerId]: "incorrect", // Mark incorrect answer
        }));
        onAnswerChecked(false); // Notify parent that the answer is incorrect
      }
    }
  };

  useEffect(() => {
    // Reset the state when a new question is loaded
    setAnswerStatus({});
  }, [question]);

  return (
    <div className={cx("learing-part-unit-test-content-practice")}>
      <div className={cx("question-practice-container")}>
        <div
          className={cx("question-content")}
          dangerouslySetInnerHTML={{ __html: renderMathAndText(question?.content) }}
        ></div>
        <div className={cx("question-answers")}>
          <div className={cx("answers-title")}>Choose 1 answer:</div>
          <div className={cx("answers-list")}>
            {question?.answers.map((answer, index) => (
              <div
                className={cx("answer-item", {
                  selected: selectedAnswer === answer.answerId,
                })}
                key={answer.answerId}
                onClick={() => handleAnswerClick(answer.answerId)}
              >
                <div
                  className={cx("answer-label", answerStatus[answer.answerId])}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                <div
                  className={cx("answer-text")}
                  dangerouslySetInnerHTML={{
                    __html: renderMathAndText(answer.text),
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
        {showExplanation && (
          <div className={cx("question-explanation")}>
            <div className={cx("title")}>Explanation:</div>
            <div
              className={cx("explain-content")}
              dangerouslySetInnerHTML={{ __html: renderMathAndText(question?.explain) }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UnitTestPractice;
