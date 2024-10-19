import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import MathRenderer from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentMath/MathRenderer";
import CreateLessonContentExample from "../CreateLessonContentExample";
import PreviewLessonContentMathExample from "../PreviewLessonContentMathExample";
import styles from "./CreateLessonContentMathConcModal.module.scss";
const cx = classNames.bind(styles);

function CreateLessonContentMathConcModal({ setContents, setIsShowCreateConcContent }) {
  const [isShowCreateExample, setIsShowCreateExample] = useState(false);
  const [content, setContent] = useState({
    text: "",
    examples: [],
  })
  const handleContentChange = (value) => {
    setContent((prevContent) => ({
      ...prevContent,
      text: value,
    }));
  };

  const handleClickSaveContent = () => {
    setContents((prevContents) => [...prevContents, content]);
    setIsShowCreateConcContent(false);
  }

  const isSaveEnabled =
    content.text.trim().length > 0 && content.examples.length > 0;

  return (
    <div className={cx("create-conc-modal-wrapper")}>
      <div className={cx("create-conc-modal-container")}>
        <div className={cx("create-conc-content")}>
          <div className={cx("create-lesson-editor")}>
            <div className={cx("lesson-editor-input")}>
              <ReactQuill
                className={cx("editor-input")}
                theme="snow"
                placeholder={"Write something content..."}
                value={content.text}
                onChange={handleContentChange}
              />
            </div>
            {isShowCreateExample ? (
              <CreateLessonContentExample setContent={setContent} setIsShowCreateExample={setIsShowCreateExample} />
            ) : (
              <div
                className={cx("create-example-action")}
                onClick={() => setIsShowCreateExample(true)}
              >
                <div className={cx("create-icon")}>
                  <i className={cx("fa-regular fa-circle-plus", "icon")}></i>
                </div>
                <div className={cx("create-text")}>Add example</div>
              </div>
            )}
          </div>
          <div className={cx("create-lesson-preview")}>
            <div className={cx("lesson-preview")}>
              {content.text && <MathRenderer loadedContent={content.text} />}
              {content.examples.length > 0 &&
                content.examples.map((example, index) => (
                  <PreviewLessonContentMathExample key={index} example={example} />
                ))}
            </div>
          </div>
        </div>
        <div className={cx("create-conc-action")}>
          <button className={cx("back-btn")} onClick={() => setIsShowCreateConcContent(false)}>
            Cancel
          </button>
          <button className={cx("save-btn", { "disabled-btn": !isSaveEnabled })}
            disabled={!isSaveEnabled}
            onClick={handleClickSaveContent}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

CreateLessonContentMathConcModal.propTypes = {
  setContents: PropTypes.func,
  setIsShowCreateConcContent: PropTypes.func,
};

export default CreateLessonContentMathConcModal
