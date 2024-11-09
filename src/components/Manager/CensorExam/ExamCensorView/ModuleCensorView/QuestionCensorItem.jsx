import classNames from "classnames/bind";
import { renderMathAndText } from "~/utils/renderMathAndText";
import styles from "./ModuleCensorView.module.scss";
const cx = classNames.bind(styles);

function QuestionCensorItem({
  index,
  question,
  setQuestionPreviewData,
  setIsShowQuestionItemPreview,
}) {
  const handlePreviewQuestion = () => {
    setQuestionPreviewData(question);
    setIsShowQuestionItemPreview(true);
  };
  return (
    <div className={cx("question-censor-item")}>
      <div className={cx("question-item-top")}>
        <div className={cx("question-author")}>
          <div className={cx("question-number")}>{index}</div>
          <div className={cx("author-name")}>Question</div>
        </div>
        <div className={cx("question-left")}>
          <div className={cx("question-skill")}>{question?.skill}</div>
          <div className={cx("view-question")}>
            <button
              className={cx("preview-btn")}
              onClick={handlePreviewQuestion}
            >
              <i className={cx("fa-regular fa-eye")}></i>
            </button>
          </div>
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
    </div>
  );
}

export default QuestionCensorItem;
