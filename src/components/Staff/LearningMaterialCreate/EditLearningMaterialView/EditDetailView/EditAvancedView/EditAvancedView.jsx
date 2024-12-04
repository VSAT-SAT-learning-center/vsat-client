import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import MathRenderer from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentMath/MathRenderer";
import PreviewLessonContentMathQuestion from "../../../LessonCreateContent/MainContent/CreateLessonContentMathView/PreviewLessonContentMathQuestion";
import EditLessonContentQuestion from "../EditQuestionView/EditLessonContentQuestion";
import styles from "./EditAvancedView.module.scss";
const cx = classNames.bind(styles);

function EditAvancedView({
  editLessonData,
  setShowEditSpecial,
  updateLessonData,
}) {
  const [content, setContent] = useState(editLessonData?.contents[0]?.text);
  const [currentQuestion, setCurrentQuestion] = useState(
    editLessonData?.question
  );

  useEffect(() => {
    setCurrentQuestion(editLessonData?.question);
  }, [editLessonData]);

  const handleUpdateQuestion = (updatedQuestion) => {
    setCurrentQuestion(updatedQuestion);
    const updatedContent = { ...editLessonData, question: updatedQuestion };
    updateLessonData(updatedContent);
  };

  const handleSave = () => {
    const updatedLessonData = {
      ...editLessonData,
      contents: [
        {
          ...editLessonData.contents[0],
          text: content,
        },
      ],
      question: currentQuestion,
    };
    updateLessonData(updatedLessonData);
    setShowEditSpecial(false);
  };
  return (
    <div className={cx("edit-definition-view-wrapper")}>
      <div className={cx("edit-definition-view-header")}>
        <div className={cx("lesson-title")}>{editLessonData?.title}</div>
        <div className={cx("lesson-type")}>{editLessonData?.contentType}</div>
      </div>
      <div className={cx("edit-definition-view-container")}>
        <div className={cx("edit-definition-editor")}>
          <div className={cx("lesson-editor-input")}>
            <ReactQuill
              value={content}
              onChange={setContent}
              className={cx("editor-input")}
              theme="snow"
              placeholder={"Write something content..."}
            />
          </div>
          <EditLessonContentQuestion
            questionData={currentQuestion}
            updateQuestionData={handleUpdateQuestion}
          />
        </div>
        <div className={cx("edit-definition-preview")}>
          <div className={cx("lesson-preview")}>
            <MathRenderer loadedContent={content} />
            <PreviewLessonContentMathQuestion
              title={"Edit Question"}
              questionData={currentQuestion}
            />
          </div>
        </div>
      </div>
      <div className={cx("edit-definition-view-footer")}>
        <button
          className={cx("back-btn")}
          onClick={() => setShowEditSpecial(false)}
        >
          Cancel
        </button>
        <button className={cx("save-btn")} onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}

export default EditAvancedView;
