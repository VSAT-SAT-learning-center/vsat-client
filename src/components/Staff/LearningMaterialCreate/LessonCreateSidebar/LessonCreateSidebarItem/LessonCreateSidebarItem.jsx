import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styles from "./LessonCreateSidebarItem.module.scss";
import LessonInsideItem from "./LessonInsideItem";
const cx = classNames.bind(styles);

function LessonCreateSidebarItem({ unitId, topic, lessonId }) {
  const [isShowLesson, setIsShowLesson] = useState(false);

  useEffect(() => {
    if (topic.lessons.some((lesson) => lesson.id === lessonId)) {
      setIsShowLesson(true);
    }
  }, [lessonId, topic.lessons]);
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
          {topic.lessons
            .filter((lesson) => lesson.type === "Text" || lesson.type === "Math")
            .map((lesson) => (
              <LessonInsideItem
                key={lesson.id}
                unitId={unitId}
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
  unitId: PropTypes.string,
  topic: PropTypes.object,
  lessonId: PropTypes.string,
};

export default LessonCreateSidebarItem;
