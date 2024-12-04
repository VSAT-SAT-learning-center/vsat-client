import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import PreviewLessonContentMathQuestion from "../../../LessonCreateContent/MainContent/CreateLessonContentMathView/PreviewLessonContentMathQuestion";
import EditLessonContentQuestion from "./EditLessonContentQuestion";
import styles from "./EditQuestionView.module.scss";
const cx = classNames.bind(styles);

function EditQuestionView({ editLessonData, setShowEditQuestion, updateLessonData }) {
  const [currentQuestion, setCurrentQuestion] = useState(editLessonData?.question);

  useEffect(() => {
    setCurrentQuestion(editLessonData?.question);
  }, [editLessonData]);

  const handleUpdateQuestion = (updatedQuestion) => {
    setCurrentQuestion(updatedQuestion);
    const updatedContent = { ...editLessonData, question: updatedQuestion };
    updateLessonData(updatedContent);
  };

  const handleSave = () => {
    const updatedContent = { ...editLessonData, question: currentQuestion };
    updateLessonData(updatedContent);
    setShowEditQuestion(false);
  };
  return (
    <div className={cx("edit-definition-view-wrapper")}>
      <div className={cx("edit-definition-view-header")}>
        <div className={cx("lesson-title")}>{editLessonData?.title}</div>
        <div className={cx("lesson-type")}>{editLessonData?.contentType}</div>
      </div>
      <div className={cx("edit-definition-view-container")}>
        <div className={cx("edit-definition-editor")}>
          <EditLessonContentQuestion
            questionData={currentQuestion}
            updateQuestionData={handleUpdateQuestion}
          />
        </div>
        <div className={cx("edit-definition-preview")}>
          <div className={cx("lesson-preview")}>
            <div className={cx("conc-try-it")}>
              <div className={cx("try-it-title")}>Try it!</div>
              <PreviewLessonContentMathQuestion
                title={"Edit Question"}
                questionData={currentQuestion}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={cx("edit-definition-view-footer")}>
        <button className={cx("back-btn")} onClick={() => setShowEditQuestion(false)}>Cancel</button>
        <button className={cx("save-btn")} onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default EditQuestionView;
