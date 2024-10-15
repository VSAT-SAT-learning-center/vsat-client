import classNames from "classnames/bind";
import { useState } from "react";
import CreateDefinitionView from "./CreateDefinitionView";
import CreateLessonContentAction from "./CreateLessonContentAction";
import CreateLessonContentRW from "./CreateLessonContentRW";
import styles from "./MainContent.module.scss";
const cx = classNames.bind(styles);

function MainContent() {
  const [isShowLessonContentRW, setIsShowLessonContentRW] = useState(false);
  const [lessonContentView, setLessonContentView] = useState("");
  const [contentTitleInput, setContentTitleInput] = useState("");

  const handleContentTitleChange = (e) => {
    setContentTitleInput(e.target.value);
  };
  return (
    <>
      {lessonContentView === "Definition" && (
        <CreateDefinitionView
          setIsShowLessonContentRW={setIsShowLessonContentRW}
          setLessonContentView={setLessonContentView}
        />
      )}
      <div className={cx("create-lessons-main-content-wrapper")}>
        <div className={cx("create-lesson-main-content-header")}>
          Command of evidence: textual
        </div>
        <div className={cx("create-lesson-main-content")}>
          <div className={cx("create-lesson-title")}>
            <div className={cx("create-title")}>
              Title <span className={cx("required")}>(Required)</span>
            </div>
            <div className={cx("create-input")}>
              <input
                type="text"
                className={cx("title-input")}
                placeholder="Name of lesson"
                autoFocus={true}
              />
            </div>
          </div>
          <div className={cx("create-lesson-information")}>
            <div className={cx("create-content-title")}>
              Lesson content <span className={cx("required")}>(Required)</span>
            </div>
            <div
              className={cx("create-content-input")}
              style={{ marginBottom: contentTitleInput ? "15px" : "0px" }}
            >
              <input
                type="text"
                className={cx("content-title-input")}
                placeholder="Title of content"
                autoFocus={true}
                onChange={handleContentTitleChange}
              />
            </div>
            {contentTitleInput ? (
              isShowLessonContentRW ? (
                <CreateLessonContentRW
                  setLessonContentView={setLessonContentView}
                />
              ) : (
                <CreateLessonContentAction
                  setIsShowLessonContentRW={setIsShowLessonContentRW}
                />
              )
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default MainContent;
