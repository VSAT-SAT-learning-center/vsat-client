import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import MathRenderer from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentMath/MathRenderer";
import CreateLessonContentQuestion from "../CreateLessonContentRWView/CreateLessonContentQuestion";
import CreateLessonContentMathConcModal from "./CreateLessonContentMathConcModal";
import CreateLessonContentMathConcView from "./CreateLessonContentMathConcView";
import styles from "./CreateLessonContentMathView.module.scss";
import PreviewLessonContentMathQuestion from "./PreviewLessonContentMathQuestion";

const cx = classNames.bind(styles);

function CreateLessonContentMathView({
  nameLesson,
  lesson,
  setLesson,
  setIsShowLessonContent,
  setLessonContentMathView,
  lessonContentType = "Conceptual",
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
  const [isShowCreateConcContent, setIsShowCreateConcContent] = useState(false)

  const handleContentChange = (value, index) => {
    const updatedContents = [...contents];
    updatedContents[index].text = value;
    setContents(updatedContents);
  };

  const handleClickCancel = () => {
    setLessonContentMathView(false);
    setIsShowLessonContent(false);
    setContentTitleInput("");
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
    setLessonContentMathView(false);
    setIsShowLessonContent(true);
    setContentTitleInput("");
  };

  return (
    <>
      {isShowCreateConcContent && <CreateLessonContentMathConcModal setContents={setContents} setIsShowCreateConcContent={setIsShowCreateConcContent} />}
      <div className={cx("create-math-view-wrapper")}>
        <div className={cx("create-math-view-header")}>
          <div className={cx("lesson-title")}>{contentTitleInput}</div>
        </div>
        <div className={cx("create-math-view-container")}>
          <div className={cx("create-lesson-editor")}>
            {lessonContentType === "Conceptual" && (
              <CreateLessonContentMathConcView setIsShowCreateConcContent={setIsShowCreateConcContent} />
            )}

            {(lessonContentType === "Definition" || lessonContentType === "Tips & Tricks") &&
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
              {contents && contents.length > 0 &&
                contents.map((content, index) => (
                  content ? (
                    <MathRenderer key={index} loadedContent={content.text} />
                  ) : null
                ))
              }
              {questionContent && (
                <PreviewLessonContentMathQuestion
                  title={nameLesson}
                  questionData={questionContent}
                />
              )}
            </div>
          </div>
        </div>
        <div className={cx("create-math-view-footer")}>
          <button className={cx("back-btn")} onClick={handleClickCancel}>
            Cancel
          </button>
          <button className={cx("save-btn")} onClick={handleClickSave}>
            Save
          </button>
        </div>
      </div>
    </>
  );
}

CreateLessonContentMathView.propTypes = {
  nameLesson: PropTypes.string,
  lesson: PropTypes.object,
  setLesson: PropTypes.func,
  setIsShowLessonContent: PropTypes.func,
  setLessonContentMathView: PropTypes.func,
  lessonContentType: PropTypes.string,
  currentIndex: PropTypes.number,
  setCurrentIndex: PropTypes.func,
  setCompletedItems: PropTypes.func,
  completedItems: PropTypes.array,
  contentTitleInput: PropTypes.string,
  setContentTitleInput: PropTypes.func,
};

CreateLessonContentMathView.defaultProps = {
  lessonContentType: "Conceptual",
};

export default CreateLessonContentMathView;
