import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import CreateLessonContentMath from "./CreateLessonContentMath";
import CreateLessonContentMathView from "./CreateLessonContentMathView";
import CreateLessonContentRW from "./CreateLessonContentRW";
import CreateLessonContentRWView from "./CreateLessonContentRWView";
import styles from "./MainContent.module.scss";
const cx = classNames.bind(styles);

function MainContent({ lesson, setLesson, completedItems, setCompletedItems, currentIndex, setCurrentIndex }) {
  const [nameLesson, setNameLesson] = useState("");
  const [lessonContentRWView, setLessonContentRWView] = useState(false);
  const [lessonContentMathView, setLessonContentMathView] = useState(false);
  const [lessonContentType, setLessonContentType] = useState("");
  const [contentTitleInput, setContentTitleInput] = useState("");

  useEffect(() => {
    setNameLesson(lesson?.title);
  }, [lesson?.title]);
  const handleContentTitleChange = (e) => {
    setContentTitleInput(e.target.value);
  };

  const handleNameLessonChange = (e) => {
    setNameLesson(e.target.value);
    setLesson((prevLesson) => ({
      ...prevLesson,
      title: e.target.value,
    }));
  };


  const renderLessonContent = () => {
    if (lesson.type === "Text") {
      return (
        <CreateLessonContentRW
          setLessonContentRWView={setLessonContentRWView}
          setLessonContentType={setLessonContentType}
          contentTitleInput={contentTitleInput}
          currentIndex={currentIndex}
          completedItems={completedItems}
        />
      );
    } else if (lesson.type === "Math") {
      return (
        <CreateLessonContentMath
          setLessonContentMathView={setLessonContentMathView}
          setLessonContentType={setLessonContentType}
          contentTitleInput={contentTitleInput}
          currentIndex={currentIndex}
          completedItems={completedItems}
        />
      );
    } else {
      return <div>No content available for this lesson type</div>;
    }
  };
  return (
    <>
      {lessonContentRWView && (
        <CreateLessonContentRWView
          nameLesson={nameLesson}
          lesson={lesson}
          setLesson={setLesson}
          setLessonContentRWView={setLessonContentRWView}
          lessonContentType={lessonContentType}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          completedItems={completedItems}
          setCompletedItems={setCompletedItems}
          contentTitleInput={contentTitleInput}
          setContentTitleInput={setContentTitleInput}
        />
      )}

      {lessonContentMathView && (
        <CreateLessonContentMathView
          nameLesson={nameLesson}
          lesson={lesson}
          setLesson={setLesson}
          setLessonContentMathView={setLessonContentMathView}
          lessonContentType={lessonContentType}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          completedItems={completedItems}
          setCompletedItems={setCompletedItems}
          contentTitleInput={contentTitleInput}
          setContentTitleInput={setContentTitleInput}
        />
      )}
      <div className={cx("create-lessons-main-content-wrapper")}>
        <div className={cx("create-lesson-main-content-header")}>
          {nameLesson}
        </div>
        <div className={cx("create-lesson-main-content")}>
          <div className={cx("create-lesson-title")}>
            <div className={cx("create-title")}>
              Title <span className={cx("required")}>(Required)</span>
            </div>
            <div className={cx("create-input")}>
              <input
                type="text"
                value={nameLesson}
                className={cx("title-input")}
                placeholder="Name of lesson"
                autoFocus={true}
                onChange={handleNameLessonChange}
              />
            </div>
          </div>
          <div className={cx("create-lesson-information")}>
            <div className={cx("create-content-title")}>
              Lesson content <span className={cx("required")}>(Required)</span>
            </div>
            <div
              className={cx("create-content-input")}
              style={{ marginBottom: "15px" }}
            >
              <input
                type="text"
                value={contentTitleInput}
                className={cx("content-title-input")}
                placeholder="Title of content"
                autoFocus={true}
                onChange={handleContentTitleChange}
              />
            </div>
            {renderLessonContent()}
          </div>
        </div>
      </div>
    </>
  );
}

MainContent.propTypes = {
  lesson: PropTypes.object,
  setLesson: PropTypes.func,
  setCompletedItems: PropTypes.func,
  completedItems: PropTypes.array,
  currentIndex: PropTypes.number,
  setCurrentIndex: PropTypes.func,
};

export default MainContent;
