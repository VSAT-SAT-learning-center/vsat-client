import classNames from "classnames/bind";
import { useState } from "react";
import styles from "./LessonCreateSidebarItem.module.scss";
import LessonInsideItem from "./LessonInsideItem";
const cx = classNames.bind(styles);

function LessonCreateSidebarItem() {
  const [isShowLesson, setIsShowLesson] = useState(false);
  const handleClickShowLesson = () => {
    setIsShowLesson(!isShowLesson);
  };
  return (
    <div
      className={cx("create-lessons-sidebar-item-container")}
      style={{ paddingBottom: isShowLesson && "0px" }}
    >
      <div
        className={cx("create-lessons-sidebar-topic-item")}
        onClick={handleClickShowLesson}
      >
        <div className={cx("topic-item-left")}>
          <i className={cx("fa-regular fa-book-open", "topic-item-icon")}></i>
          <div className={cx("topic-item-title")}>
            Command of Evidence: Textual
          </div>
        </div>
        <i
          className={cx(
            isShowLesson
              ? "fa-light fa-chevron-down"
              : "fa-light fa-chevron-right",
            "dropdown-icon"
          )}
        ></i>
      </div>
      {isShowLesson && (
        <div className={cx("create-lessons-sidebar-lesson-container")}>
          <LessonInsideItem />
        </div>
      )}
    </div>
  );
}

export default LessonCreateSidebarItem;
