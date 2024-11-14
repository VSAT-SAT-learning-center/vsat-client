import classNames from "classnames/bind";
import exampleImg from "~/assets/images/content/example.png";
import { renderMathAndText } from "~/utils/renderMathAndText";
import styles from "./QuestionExam.module.scss";
const cx = classNames.bind(styles);
const example = `<p>Student-produced response directions</p>
<ul>
  <li>Enter only one <strong>correct answer</strong>, even if there are multiple correct answers.</li>
  <li>You can enter up to 5 characters for a positive answer and up to 6 characters for a negative answer (including the negative sign).</li>
  <li>If your answer is a fraction but it doesn't fit in the provided space, enter the decimal equivalent instead.</li>
  <li>If your answer is a decimal but it doesn't fit in the provided space, round it to \\[4\\] digits.</li>
  <li>If your answer is a mixed number (such as \\[5\\frac{1}{2}\\]), enter it as an improper fraction (\\[\\frac{11}{2}\\]) or decimal (\\[5.5\\]).</li>
  <li>Don't enter symbols such as percent sign, comma, or dollar sign.</li>
</ul>`;
function QuestionExam({ question, onAnswerSelect, currentAnswer, index, isMarkedForReview, onMarkForReview }) {
  const handleRightClick = (event) => {
    event.preventDefault();
  };

  const handleLeftClick = (event) => {
    event.preventDefault();
  };

  const handleAnswerClick = (answerId) => {
    onAnswerSelect(question.id, answerId);
  };

  const handleTextInputChange = (event) => {
    const answerText = event.target.value;
    onAnswerSelect(question.id, answerText);
  };
  return (
    <div className={cx("question-view-main")}
      onContextMenu={handleRightClick}
      onClick={handleLeftClick}>
      <div className={cx("question-view-content")}>
        {question?.isSingleChoiceQuestion === true ? (
          <div
            className={cx("question-rerender-content")}
            dangerouslySetInnerHTML={{
              __html: renderMathAndText(question?.content),
            }}
          />
        ) : (
          <div className={cx("preview-answer-example")}>
            <div
              className={cx("answer-example")}
              dangerouslySetInnerHTML={{
                __html: renderMathAndText(example),
              }}
            ></div>
            <div className={cx("example-text")}>Example</div>
            <div className={cx("example-image")}>
              <img src={exampleImg} className={cx("ex-img")} alt="example" />
            </div>
          </div>
        )}
      </div>
      <div className={cx("answer-view-content")}>
        <div className={cx("mark-answer-container")}>
          <div className={cx("question-number")}>{index + 1}</div>
          <button className={cx("mark-answer", {
            "mark-review": isMarkedForReview,
          })} onClick={onMarkForReview}>
            <i
              className={cx(isMarkedForReview ? "fa-sharp fa-solid fa-bookmark" : "fa-sharp fa-regular fa-bookmark", "icon-mark")}
            ></i>
            <span className={cx("mark-text")}> {isMarkedForReview ? "Marked for Review" : "Mark for Review"}</span>
          </button>
        </div>
        <div className={cx("long-dashes")}></div>
        <div className={cx("answer-list-container")}>
          {question?.isSingleChoiceQuestion === true ? (
            question?.answers.map((answer, index) => (
              <div
                key={answer.id}
                className={cx("answer-item", {
                  selected: currentAnswer === answer.id,
                })}
                onClick={() => handleAnswerClick(answer.id)}
              >
                <span className={cx("answer-label")}>
                  {String.fromCharCode(65 + index) + ":"}
                </span>
                <span
                  className={cx("answer-renderer-content")}
                  dangerouslySetInnerHTML={{
                    __html: renderMathAndText(answer.text),
                  }}
                ></span>
              </div>
            ))
          ) : (
            <div className={cx("answer-text-input-container")}>
              <div
                className={cx("text-input-rerender-content")}
                dangerouslySetInnerHTML={{
                  __html: renderMathAndText(question?.content),
                }}
              ></div>
              <div className={cx("text-input-content")}>
                <input
                  type="text"
                  autoFocus={true}
                  className={cx("input-text")}
                  placeholder="Your answer"
                  value={currentAnswer || ""}
                  onChange={handleTextInputChange}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionExam;
