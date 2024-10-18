import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import RWRerender from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentRW/RWRerender";
import CreateLessonContentQuestion from "./CreateLessonContentQuestion";
import styles from "./CreateLessonContentRWView.module.scss";
import PreviewLessonContentQuestion from "./PreviewLessonContentQuestion";

const cx = classNames.bind(styles);
function CreateLessonContentRWView({
  nameLesson,
  lesson,
  setLesson,
  setIsShowLessonContent,
  setLessonContentRWView,
  lessonContentType,
  currentIndex,
  completedItems,
  setCurrentIndex,
  setCompletedItems,
  contentTitleInput,
  setContentTitleInput,
}) {
  const [contents, setContents] = useState([
    {
      text: "",
      examples: [],
    },
  ]);
  const [questionContent, setQuestionContent] = useState(null);
  const [isShowCreateQuestion, setIsShowCreateQuestion] = useState(false);

  const handleContentChange = (value, index) => {
    const updatedContents = [...contents];
    updatedContents[index].text = value;
    setContents(updatedContents);
  };

  const handleClickSave = () => {
    const newLessonContent = {
      lessonId: lesson.lessonId,
      contentType: lessonContentType,
      title: contentTitleInput,
      contents: contents,
      question: questionContent || null,
    };
    setLesson((prevLesson) => ({
      ...prevLesson,
      lessonContents: [...prevLesson.lessonContents, newLessonContent],
    }));
    setCompletedItems([...completedItems, currentIndex]);
    setCurrentIndex((prev) => prev + 1);
    setLessonContentRWView(false);
    setIsShowLessonContent(true);
    setContentTitleInput("");
  };

  const handleClickCancel = () => {
    setLessonContentRWView(false);
    setIsShowLessonContent(false);
    setContentTitleInput("");
  };

  const isSaveDisabled =
    lessonContentType === "Definition"
      ? !contents[0].text || !questionContent
      : !contents[0].text && !questionContent;

  return (
    <div className={cx("create-rw-view-wrapper")}>
      <div className={cx("create-rw-view-header")}>
        <div className={cx("lesson-title")}>{contentTitleInput}</div>
      </div>
      <div className={cx("create-rw-view-container")}>
        <div className={cx("create-lesson-editor")}>
          {lessonContentType !== "Practice" &&
            contents.map((contentItem, index) => (
              <div key={index} className={cx("lesson-editor-input")} style={{ height: lessonContentType === "Definition" ? "90%" : "100%" }}>
                <ReactQuill
                  className={cx("editor-input")}
                  theme="snow"
                  value={contentItem.text}
                  onChange={(value) => handleContentChange(value, index)}
                  placeholder={"Write something content..."}
                />
              </div>
            ))}
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
            {contents[0].text && <RWRerender loadedContent={contents[0].text} />}
            {questionContent && (
              <PreviewLessonContentQuestion
                title={nameLesson}
                questionData={questionContent}
              />
            )}
          </div>
        </div>
      </div>
      <div className={cx("create-rw-view-footer")}>
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
CreateLessonContentRWView.propTypes = {
  nameLesson: PropTypes.string,
  lesson: PropTypes.object,
  setLesson: PropTypes.func,
  setIsShowLessonContent: PropTypes.func,
  setLessonContentRWView: PropTypes.func,
  lessonContentType: PropTypes.string,
  currentIndex: PropTypes.number,
  setCurrentIndex: PropTypes.func,
  setCompletedItems: PropTypes.func,
  completedItems: PropTypes.array,
  contentTitleInput: PropTypes.string,
  setContentTitleInput: PropTypes.func,
};

export default CreateLessonContentRWView;
