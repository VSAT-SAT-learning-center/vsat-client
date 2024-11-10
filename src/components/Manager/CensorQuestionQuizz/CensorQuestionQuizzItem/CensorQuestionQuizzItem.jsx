import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { formatDate } from "~/utils/formatDate";
import { renderMathAndText } from "~/utils/renderMathAndText";
import styles from "./CensorQuestionQuizzItem.module.scss";

const cx = classNames.bind(styles);

function CensorQuestionQuizzItem({
  question,
  index,
  setQuestionPreview,
  setIsShowQuizzItemPreview,
  setQuestionCensorView,
  setIsShowCensorQuestionQuizView,
}) {
  const handlePreviewQuestion = () => {
    setIsShowQuizzItemPreview(true);
    setQuestionPreview(question);
  };

  const handleCensorQuestion = () => {
    setIsShowCensorQuestionQuizView(true);
    setQuestionCensorView(question);
  };

  return (
    <div className={cx("question-exam-create-item")}>
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
          {question?.status === "Pending" && (
            <button className={cx("censor-btn")} onClick={handleCensorQuestion}>
              <i className={cx("fa-regular fa-gear")}></i>
            </button>
          )}
          {question?.status === "Rejected" && (
            <button className={cx("feedback-list-btn")}>
              <i className={cx("fa-regular fa-clipboard-list")}></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

CensorQuestionQuizzItem.propTypes = {
  question: PropTypes.object,
  index: PropTypes.number,
  setIsShowQuizzItemPreview: PropTypes.func,
  setQuestionPreview: PropTypes.func,
  setQuestionCensorView: PropTypes.func,
  setIsShowCensorQuestionQuizView: PropTypes.func,
};

export default CensorQuestionQuizzItem;
