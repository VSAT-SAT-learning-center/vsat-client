import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./LessonCreateSidebarItem.module.scss";
import LessonInsideItem from "./LessonInsideItem";
const cx = classNames.bind(styles);

function LessonCreateSidebarItem({ newUnit, topic, lessonId }) {
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
          <div className={cx("topic-item-title")}>{topic.title}</div>
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
          {topic.lessons.map((lesson) => (
            <LessonInsideItem
              key={lesson.id}
              newUnit={newUnit}
              lesson={lesson}
              lessonId={lessonId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

LessonCreateSidebarItem.propTypes = {
  newUnit: PropTypes.object,
  topic: PropTypes.object,
  lessonId: PropTypes.string,
};

export default LessonCreateSidebarItem;
