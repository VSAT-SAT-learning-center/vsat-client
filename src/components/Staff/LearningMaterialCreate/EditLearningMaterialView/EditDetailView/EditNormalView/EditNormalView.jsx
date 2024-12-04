import classNames from "classnames/bind";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import MathRenderer from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentMath/MathRenderer";
import styles from "./EditNormalView.module.scss";
const cx = classNames.bind(styles);

function EditNormalView({ editLessonData, setShowEditDefinition, updateLessonData }) {
  const [content, setContent] = useState(editLessonData?.contents[0]?.text);
  const handleSave = () => {
    const updatedLessonData = {
      ...editLessonData,
      contents: [
        {
          ...editLessonData.contents[0],
          text: content,
        },
      ],
    };
    updateLessonData(updatedLessonData);
    setShowEditDefinition(false);
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
        </div>
        <div className={cx("edit-definition-preview")}>
          <div className={cx("lesson-preview")}>
            <MathRenderer loadedContent={content} />
          </div>
        </div>
      </div>
      <div className={cx("edit-definition-view-footer")}>
        <button className={cx("back-btn")} onClick={() => setShowEditDefinition(false)}>
          Cancel
        </button>
        <button className={cx("save-btn")} onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditNormalView
