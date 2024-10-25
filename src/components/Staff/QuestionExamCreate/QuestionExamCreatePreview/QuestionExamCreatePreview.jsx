import classNames from "classnames/bind";
import PropTypes from "prop-types";
import apiClient from "~/services/apiService";
import styles from "./QuestionExamCreatePreview.module.scss";
const cx = classNames.bind(styles);

function QuestionExamCreatePreview({ questionPreviewData, setIsShowQuestionPreview, setIsShowCreatQuestionModal }) {
  const handleSaveQuestion = async () => {
    try {
      await apiClient.post('/questions', questionPreviewData);
      setIsShowQuestionPreview(false)
      setIsShowCreatQuestionModal(false)
    } catch (error) {
      console.error("Error saving question:", error);
    }
  }
  return (
    <div className={cx("question-create-preview-wrapper")}>
      <div className={cx("question-create-preview-container")}>
        <div className={cx("question-create-preview-header")}>
          <div className={cx("preview-back")} onClick={() => setIsShowQuestionPreview(false)}>
            <i className={cx("fa-regular fa-arrow-left")}></i>
          </div>
          <div className={cx("preview-section")}>Reading & Writing</div>
          <div className={cx("preview-level")}>Foundation</div>
        </div>
        <div className={cx("question-create-preview-content")}>
          <div className={cx("long-dashes")}></div>
          <div className={cx("preview-content-container")}>
            <div className={cx("preview-content-question")}>
              <div
                className={cx("question-rw-rerender-content")}
                dangerouslySetInnerHTML={{ __html: questionPreviewData?.content }}
              ></div>
            </div>
            <div className={cx("preview-content-answer")}>
              <div className={cx("mark-answer-container")}>
                <div className={cx("mark-answer")}>
                  <i className={cx("fa-sharp fa-regular fa-bookmark", "icon-mark")}></i>
                  <span className={cx("mark-text")}>Mark for Review</span>
                </div>
              </div>
              <div className={cx("long-dashes")}></div>
              <div className={cx("answer-list-container")}>
                {questionPreviewData?.answers.map((answer) => (
                  <div
                    key={answer.id}
                    className={cx("answer-item")}
                  >
                    <span className={cx("answer-label")}>{answer.label + ":"}</span>
                    <span
                      className={cx("answer-rerender-content")}
                      dangerouslySetInnerHTML={{ __html: answer.text }}
                    ></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={cx("long-dashes")}></div>
        </div>
        <div className={cx("question-create-preview-footer")}>
          <button className={cx("cancel-btn")} onClick={() => setIsShowQuestionPreview(false)}>Back</button>
          <button className={cx("save-btn")} onClick={handleSaveQuestion}>Save</button>
        </div>
      </div>
    </div>
  )
}

QuestionExamCreatePreview.propTypes = {
  questionPreviewData: PropTypes.object,
  setIsShowQuestionPreview: PropTypes.func,
  setIsShowCreatQuestionModal: PropTypes.func,
}

export default QuestionExamCreatePreview
