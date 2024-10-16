import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { v4 as uuidv4 } from "uuid";
import RWRerender from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentRW/RWRerender";
import { generateLessonContentType } from "~/utils/generateLessonContentType";
import CreateLessonContentQuestion from "./CreateLessonContentQuestion";
import styles from "./CreateLessonContentView.module.scss";
import EditorToolbar, { formats, modules } from "./EditorToolbar";
import PreviewLessonContentQuestion from "./PreviewLessonContentQuestion";

const cx = classNames.bind(styles);
function CreateLessonContentView({
  nameLesson,
  setLesson,
  setIsShowLessonContentRW,
  setLessonContentView,
  lessonContentType,
  currentIndex,
  completedItems,
  setCurrentIndex,
  setCompletedItems,
  contentTitleInput,
  setContentTitleInput,
}) {
  const [content, setContent] = useState("");
  const [questionContent, setQuestionContent] = useState(null);
  const [isShowCreateQuestion, setIsShowCreateQuestion] = useState(false);

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleClickSave = () => {
    const newLessonContent = {
      contendId: uuidv4(),
      contentType: generateLessonContentType(lessonContentType),
      contentTitle: contentTitleInput,
      content: content || "",
      question: questionContent || null,
    };
    setLesson((prevLesson) => ({
      ...prevLesson,
      lessonContent: [...prevLesson.lessonContent, newLessonContent],
    }));
    setCompletedItems([...completedItems, currentIndex]);
    setCurrentIndex((prev) => prev + 1);
    setLessonContentView(false);
    setIsShowLessonContentRW(true);
    setContentTitleInput("");
  };

  const handleClickCancel = () => {
    setLessonContentView(false);
    setIsShowLessonContentRW(false);
    setContentTitleInput("");
  };

  const isSaveDisabled =
    lessonContentType === "Definition"
      ? !content || !questionContent
      : !content && !questionContent;

  return (
    <div className={cx("create-definiton-view-wrapper")}>
      <div className={cx("create-definiton-view-header")}>
        <div className={cx("lesson-title")}>{nameLesson}</div>
      </div>
      <div className={cx("create-definiton-view-container")}>
        <div className={cx("create-lesson-editor")}>
          {lessonContentType !== "Practice" && (
            <div
              className={cx("lesson-editor-input")}
              style={{
                height: lessonContentType === "Definition" ? "88%" : "100%",
              }}
            >
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
          )}
          {(lessonContentType === "Definition" ||
            lessonContentType === "Practice") &&
            (isShowCreateQuestion ? (
              <CreateLessonContentQuestion
                setQuestionContent={setQuestionContent}
                setIsShowCreateQuestion={setIsShowCreateQuestion}
              />
            ) : (
              <div
                className={cx("create-question-action")}
                onClick={() => setIsShowCreateQuestion(true)}
              >
                <div className={cx("create-icon")}>
                  <i className={cx("fa-regular fa-circle-plus", "icon")}></i>
                </div>
                <div className={cx("create-text")}>New question</div>
              </div>
            ))}
        </div>
        <div className={cx("create-lesson-preview")}>
          <div className={cx("lesson-preview")}>
            {content && <RWRerender loadedContent={content} />}
            {questionContent && (
              <PreviewLessonContentQuestion
                title={nameLesson}
                questionData={questionContent}
              />
            )}
          </div>
        </div>
      </div>
      <div className={cx("create-definiton-view-footer")}>
        <button className={cx("back-btn")} onClick={handleClickCancel}>
          Cancel
        </button>
        <button
          className={cx("save-btn", { "disabled-btn": isSaveDisabled })}
          disabled={isSaveDisabled}
          onClick={handleClickSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}
CreateLessonContentView.propTypes = {
  nameLesson: PropTypes.string,
  setLesson: PropTypes.func,
  setIsShowLessonContentRW: PropTypes.func,
  setLessonContentView: PropTypes.func,
  lessonContentType: PropTypes.string,
  currentIndex: PropTypes.number,
  setCurrentIndex: PropTypes.func,
  setCompletedItems: PropTypes.func,
  completedItems: PropTypes.array,
  contentTitleInput: PropTypes.string,
  setContentTitleInput: PropTypes.func,
};

export default CreateLessonContentView;
