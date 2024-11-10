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
import PreviewLessonContentConc from "./PreviewLessonContentConc";
import PreviewLessonContentMathQuestion from "./PreviewLessonContentMathQuestion";

const cx = classNames.bind(styles);

function CreateLessonContentMathView({
  nameLesson,
  lesson,
  setLesson,
  setLessonContentMathView,
  lessonContentType,
  currentIndex,
  completedItems,
  setCurrentIndex,
  setCompletedItems,
  contentTitleInput,
  setContentTitleInput,
}) {
  const [contents, setContents] = useState([]);
  const [questionContent, setQuestionContent] = useState(null);
  const [isShowCreateQuestion, setIsShowCreateQuestion] = useState(false);
  const [isShowCreateConcContent, setIsShowCreateConcContent] = useState(false)

  const handleContentChange = (value, index = 0) => {
    setContents((prev) => {
      const updatedContents = [...prev];
      updatedContents[index] = { ...updatedContents[index], text: value };
      return updatedContents;
    });
  };


  const handleClickCancel = () => {
    setLessonContentMathView(false);
    setContentTitleInput("");
  };

  const handleClickSave = () => {
    const newLessonContent = {
      lessonId: lesson.lessonId,
      contentType: lessonContentType,
      title: contentTitleInput,
      contents: contents,
      question: questionContent,
    };
    setLesson((prevLesson) => ({
      ...prevLesson,
      lessonContents: [...prevLesson.lessonContents, newLessonContent],
    }));
    setCompletedItems([...completedItems, currentIndex]);
    setCurrentIndex((prev) => prev + 1);
    setLessonContentMathView(false);
    setContentTitleInput("");
  };

  const isSaveEnabled =
    lessonContentType === "Conceptual"
      ? contents.length > 0 && questionContent !== null
      : contents.length > 0 || questionContent !== null;
  return (
    <>
      {isShowCreateConcContent && <CreateLessonContentMathConcModal contents={contents} setContents={setContents} setIsShowCreateConcContent={setIsShowCreateConcContent} />}
      <div className={cx("create-math-view-wrapper")}>
        <div className={cx("create-math-view-header")}>
          <div className={cx("lesson-title")}>{contentTitleInput}</div>
          <div className={cx("lesson-type")}>{lessonContentType}</div>
        </div>
        <div className={cx("create-math-view-container")}>
          <div className={cx("create-lesson-editor")}>
            {lessonContentType === "Conceptual" && (
              <CreateLessonContentMathConcView contents={contents} setQuestionContent={setQuestionContent} setIsShowCreateConcContent={setIsShowCreateConcContent} />
            )}
            {(lessonContentType === "Definition" || lessonContentType === "Tips & Tricks") &&
              <div className={cx("lesson-editor-input")}>
                <ReactQuill
                  className={cx("editor-input")}
                  theme="snow"
                  onChange={(value) => handleContentChange(value, 0)}
                  placeholder={"Write something content..."}
                />
              </div>
            }
            {lessonContentType === "Practice" &&
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
              {lessonContentType === "Conceptual" ? (
                <>
                  {contents &&
                    contents.length > 0 &&
                    contents.map((content, index) => (
                      <PreviewLessonContentConc key={index} content={content} />
                    ))}
                  {questionContent && (
                    <div className={cx("conc-try-it")}>
                      <div className={cx("try-it-title")}>Try it!</div>
                      <PreviewLessonContentMathQuestion
                        title={nameLesson}
                        questionData={questionContent}
                      />
                    </div>
                  )}
                </>
              ) : (
                <>
                  {contents &&
                    contents.length > 0 &&
                    contents.map((content, index) =>
                      content ? (
                        <MathRenderer key={index} loadedContent={content.text} />
                      ) : null
                    )}
                  {questionContent && (
                    <PreviewLessonContentMathQuestion
                      title={nameLesson}
                      questionData={questionContent}
                    />
                  )}
                </>
              )}
            </div>
          </div>

        </div>
        <div className={cx("create-math-view-footer")}>
          <button className={cx("back-btn")} onClick={handleClickCancel}>
            Cancel
          </button>
          <button className={cx("save-btn", { "disabled-btn": !isSaveEnabled })}
            disabled={!isSaveEnabled}
            onClick={handleClickSave}>
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
  setLessonContentMathView: PropTypes.func,
  lessonContentType: PropTypes.string,
  currentIndex: PropTypes.number,
  setCurrentIndex: PropTypes.func,
  setCompletedItems: PropTypes.func,
  completedItems: PropTypes.array,
  contentTitleInput: PropTypes.string,
  setContentTitleInput: PropTypes.func,
};

export default CreateLessonContentMathView;
