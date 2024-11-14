import classNames from "classnames/bind";
import styles from "./QuestionDropdownModal.module.scss";
const cx = classNames.bind(styles);

function QuestionDropdownModal({
  setShowQuestionDropdown,
  questions,
  currentQuestionIndex,
  onQuestionSelect,
  isFinishClicked
}) {
  const unansweredQuestionsExist = questions.some(
    (question) => question.status === "unanswered"
  );

  return (
    <div className={cx("question-dropdown-modal-wrapper")}>
      <div className={cx("question-dropdown-modal-container")}>
        <div className={cx("question-dropdown-modal-header")}>
          <div className={cx("title-container")}>
            Section {questions[0].section === "Reading & Writing" ? "1" : "2"}, {questions[0].moduleName}: {questions[0].section}
          </div>
          <button
            className={cx("close-btn")}
            onClick={() => setShowQuestionDropdown(false)}
          >
            <i className={cx("fa-solid fa-xmark")}></i>
          </button>
        </div>
        <div className={cx("question-dropdown-modal-content")}>
          <div className={cx("question-answer-options")}>
            <div className={cx("option")}>
              <i className={cx("fa-solid fa-location-dot", "icon")}></i>
              <span className={cx("text")}>Current</span>
            </div>
            <div className={cx("option")}>
              <i className={cx("fa-regular fa-square", "icon")}></i>
              <span className={cx("text")}>Unanswered</span>
            </div>
            <div className={cx("option")}>
              <i
                className={cx(
                  "fa-sharp fa-solid fa-bookmark",
                  "icon",
                  "review-icon"
                )}
              ></i>
              <span className={cx("text")}>For Review</span>
            </div>
          </div>
          <div className={cx("question-list")}>
            {questions.map((question, index) => (
              <button key={index} className={cx("question-item", { answered: question.status === "answered", review: question.status === "review", unanswered: isFinishClicked && question.status === "unanswered", })} onClick={() => {
                onQuestionSelect(index);
                setShowQuestionDropdown(false);
              }}>
                {index === currentQuestionIndex && (
                  <i className={cx("fa-solid fa-location-dot", "current")}></i>
                )}
                {question.status === "review" && (
                  <i className={cx("fa-sharp fa-solid fa-bookmark", "review")}></i>
                )}
                <span className={cx("number")}>{index + 1}</span>
              </button>
            ))}
          </div>
          {unansweredQuestionsExist && isFinishClicked && (
            <div className={cx("alert-message")}>
              Please answer all questions before finishing this module.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionDropdownModal;
