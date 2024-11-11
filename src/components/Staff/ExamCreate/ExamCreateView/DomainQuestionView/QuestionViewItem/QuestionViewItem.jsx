import classNames from "classnames/bind";
import { renderMathAndText } from "~/utils/renderMathAndText";
import styles from "./QuestionViewItem.module.scss";
const cx = classNames.bind(styles);

function QuestionViewItem({
  question,
  status,
  index,
  setQuestionPreviewData,
  setIsShowQuestionItemPreview,
  setDomainQuestions,
  setUpdateDeleteExamQuestion,
  setUpdateQuestion,
  originalQuestionIds,
}) {
  const handleClickPreviewQuestion = () => {
    setQuestionPreviewData(question);
    setIsShowQuestionItemPreview(true);
  };

  const handleClickDeleteQuestion = () => {
    setDomainQuestions((prevDomainQuestions) => ({
      ...prevDomainQuestions,
      questions: prevDomainQuestions.questions.filter(
        (q) => q.id !== question.id
      ),
    }));

    if (originalQuestionIds.includes(question.id)) {
      // If the question is from the DB, add it to `updateDeleteExamQuestion`
      setUpdateDeleteExamQuestion((prev) => [...prev, { id: question.id }]);
    } else {
      // If the question is newly added, remove it from `updateQuestion`
      setUpdateQuestion((prev) =>
        prev.filter((q) => q.questionId !== question.id)
      );
    }
  };
  return (
    <div className={cx("question-exam-create-item")}>
      <div className={cx("question-item-top")}>
        <div className={cx("question-author")}>
          <div className={cx("question-number")}>{index}</div>
          <div className={cx("author-name")}>Question</div>
        </div>
        <div className={cx("question-left")}>
          <div className={cx("question-skill")}>{question?.skill.content}</div>
          <div className={cx("question-level")}>{question?.level.name}</div>
        </div>
      </div>
      <div className={cx("question-item-main")}>
        <div
          className={cx("question-content")}
          dangerouslySetInnerHTML={{
            __html: renderMathAndText(question?.content),
          }}
        />
      </div>
      <div className={cx("question-item-bottom")}>
        <button
          className={cx("preview-btn")}
          onClick={handleClickPreviewQuestion}
        >
          <i className={cx("fa-regular fa-eye")}></i>
        </button>
        {status === "Rejected" && (
          <button
            className={cx("preview-btn")}
            onClick={handleClickDeleteQuestion}
          >
            <i className={cx("fa-sharp fa-regular fa-trash")}></i>
          </button>
        )}
      </div>
    </div>
  );
}

export default QuestionViewItem;
