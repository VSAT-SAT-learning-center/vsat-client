import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { formatDate } from "~/utils/formatDate";
import { renderMathAndText } from "~/utils/renderMathAndText";
import styles from "./QuestionQuizzItem.module.scss";
const cx = classNames.bind(styles);

function QuestionQuizzItem({
  question,
  index,
  setQuestionPreview,
  setQuestionEdit,
  setIsShowQuizzItemPreview, 
  setIsShowUpdateQuestionModal,
}) {
  const handlePreviewQuestion = () => {
    setQuestionPreview(question);
    setIsShowQuizzItemPreview(true); 
  };

  const handleEditQuestion = () => {
    setQuestionEdit(question);
    setIsShowUpdateQuestionModal(true);
  };

  return (
    <div className={cx("question-quizz-create-item")}>
      <div className={cx("question-item-top")}>
        <div className={cx("question-author")}>
          <i className={cx("fa-solid fa-circle-question", "author-icon")}></i>
          <span className={cx("author-name")}>Question</span>
        </div>
        <div
          className={cx(
            "question-status",
            question?.status === "Approved"
              ? "approved-status"
              : question?.status === "Pending"
              ? "pending-status"
              : question?.status === "Draft"
              ? "draft-status"
              : "rejected-status"
          )}
        >
          {question?.status}
        </div>
      </div>
      <div className={cx("question-item-main")}>
        <div className={cx("question-number")}>{index + 1}</div>
        {question?.section.name === "Math" ? (
          <div
            className={cx("question-content")}
            dangerouslySetInnerHTML={{
              __html: renderMathAndText(question?.content),
            }}
          />
        ) : (
          <div
            className={cx("question-content")}
            dangerouslySetInnerHTML={{ __html: question?.content }}
          ></div>
        )}
      </div>
      <div className={cx("question-item-bottom")}>
        <div className={cx("question-create-date")}>
          Created at: {formatDate(question?.createdat)}
        </div>
        <div className={cx("question-action")}>
          <button className={cx("preview-btn")} onClick={handlePreviewQuestion}>
            <i className={cx("fa-regular fa-eye")}></i>
          </button>
          {question?.status !== "Approved" &&
            question?.status !== "Pending" && (
              <button className={cx("edit-btn")} onClick={handleEditQuestion}>
                <i className={cx("fa-regular fa-pen-to-square")}></i>
              </button>
            )}
        </div>
      </div>
    </div>
  );
}

QuestionQuizzItem.propTypes = {
  question: PropTypes.object,
  index: PropTypes.number,
  setIsShowQuizzItemPreview: PropTypes.func, 
  setIsShowUpdateQuestionModal: PropTypes.func,
  setQuestionPreview: PropTypes.func,
  setQuestionEdit: PropTypes.func,
};

export default QuestionQuizzItem;
