import classNames from "classnames/bind";
import { renderMathAndText } from "~/utils/renderMathAndText";
import styles from "./ViewResultQuestion.module.scss";
const cx = classNames.bind(styles);

function ViewResultQuestion({ question, setShowQuestionView }) {
  console.log(question);

  return (
    <div className={cx("view-result-question-wrapper")}>
      <div className={cx("view-result-question-container")}>
        <div className={cx("view-result-question-header")}>
          <div
            className={cx("question-close")}
            onClick={() => setShowQuestionView(false)}
          >
            <i className={cx("fa-regular fa-arrow-left")}></i>
          </div>
          <div className={cx("question-title")}>Question</div>
          <div className={cx("question-empty")}></div>
        </div>
        <div className={cx("view-result-question-content")}>
          <div
            className={cx("question-rerender-content")}
            dangerouslySetInnerHTML={{
              __html: renderMathAndText(question?.content),
            }}
          />
          <div className={cx("answers-list")}>
            {question?.answer.map((answer, index) => (
              <div key={answer.id} className={cx("answer-item")}>
                <span className={cx("answer-label")}>
                  {String.fromCharCode(65 + index) + ":"}
                </span>
                <span
                  className={cx("answer-rerender-content")}
                  dangerouslySetInnerHTML={{
                    __html: renderMathAndText(answer.text),
                  }}
                ></span>
              </div>
            ))}
          </div>
          <div className={cx("option-answer")}>
            <div className={cx("title")}>Your Answer:</div>
            <div
              className={cx("answer-rerender-content", {
                correct: question?.isCorrect === true,
                incorrect: question?.isCorrect === false,
              })}
              dangerouslySetInnerHTML={{
                __html: renderMathAndText(question?.studentAnswer),
              }}
            />
          </div>
          <div className={cx("option-answer")}>
            <div className={cx("title")}>Correct Answer:</div>
            <div
              className={cx("answer-rerender-content")}
              dangerouslySetInnerHTML={{
                __html: renderMathAndText(question?.correctAnswers[0].text),
              }}
            />
          </div>
          <div className={cx("option-answer")}>
            <div className={cx("title")}>Explanation:</div>
            <div
              className={cx("answer-rerender-content")}
              dangerouslySetInnerHTML={{
                __html: renderMathAndText(question?.explain),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewResultQuestion
