import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import RWRerender from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentRW/RWRerender";
import styles from "./CreateDefinitionView.module.scss";
import EditorToolbar, { formats, modules } from "./EditorToolbar";
const cx = classNames.bind(styles);
function CreateDefinitionView({
  setIsShowLessonContentRW,
  setLessonContentView,
}) {
  const [content, setContent] = useState("");
  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleClickCancel = () => {
    setLessonContentView("");
    setIsShowLessonContentRW(false);
  };
  return (
    <div className={cx("create-definiton-view-wrapper")}>
      <div className={cx("create-definiton-view-header")}>
        <div className={cx("lesson-title")}>Command of evidence: textual</div>
      </div>
      <div className={cx("create-definiton-view-container")}>
        <div className={cx("create-lesson-editor")}>
          <div className={cx("lesson-editor-input")}>
            <EditorToolbar />
            <ReactQuill
              className={cx("editor-input")}
              theme="snow"
              value={content}
              onChange={handleContentChange}
              placeholder={"Write something content..."}
              modules={modules}
              formats={formats}
            />
          </div>
          <div className={cx("create-question-action")}>
            <div className={cx("create-icon")}>
              <i className={cx("fa-regular fa-circle-plus", "icon")}></i>
            </div>
            <div className={cx("create-text")}>New question</div>
          </div>
        </div>

        <div className={cx("create-lesson-preview")}>
          <div className={cx("lesson-preview")}>
            {content && <RWRerender loadedContent={content} />}
          </div>
        </div>
      </div>
      <div className={cx("create-definiton-view-footer")}>
        <button className={cx("back-btn")} onClick={handleClickCancel}>
          Cancel
        </button>
        <button className={cx("continue-btn")}>Save</button>
      </div>
    </div>
  );
}
CreateDefinitionView.propTypes = {
  setIsShowLessonContentRW: PropTypes.func,
  setLessonContentView: PropTypes.func,
};

export default CreateDefinitionView;
