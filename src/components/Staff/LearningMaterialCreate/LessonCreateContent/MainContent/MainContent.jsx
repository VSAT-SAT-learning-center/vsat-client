import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import CreateLessonContentAction from "./CreateLessonContentAction";
import CreateLessonContentRW from "./CreateLessonContentRW";
import CreateLessonContentView from "./CreateLessonContentView";
import styles from "./MainContent.module.scss";
const cx = classNames.bind(styles);

function MainContent({ lesson, setLesson, completedItems, setCompletedItems }) {
  const [nameLesson, setNameLesson] = useState("");
  const [isShowLessonContentRW, setIsShowLessonContentRW] = useState(false);
  const [lessonContentView, setLessonContentView] = useState(false);
  const [lessonContentType, setLessonContentType] = useState("");
  const [contentTitleInput, setContentTitleInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

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
      lessonTitle: e.target.value,
    }));
  };
  return (
    <>
      {lessonContentView && (
        <CreateLessonContentView
          nameLesson={nameLesson}
          setLesson={setLesson}
          setIsShowLessonContentRW={setIsShowLessonContentRW}
          setLessonContentView={setLessonContentView}
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
            {isShowLessonContentRW ? (
              <CreateLessonContentRW
                setLessonContentView={setLessonContentView}
                setLessonContentType={setLessonContentType}
                contentTitleInput={contentTitleInput}
                currentIndex={currentIndex}
                completedItems={completedItems}
              />
            ) : (
              <CreateLessonContentAction
                setIsShowLessonContentRW={setIsShowLessonContentRW}
              />
            )}
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
};

export default MainContent;
