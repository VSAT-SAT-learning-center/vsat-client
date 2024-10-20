import classNames from "classnames/bind"
import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import PublishSidebarIInsidetem from "./PublishSidebarIInsidetem"
import styles from "./PublishSidebarItem.module.scss"
const cx = classNames.bind(styles)

function PublishSidebarItem({ topic, unitId, lessonId }) {
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
    <div className={cx("publish-sidebar_item")}>
      <div className={cx("sidebar-topic-item")} onClick={handleClickShowLesson}>
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
        <div className={cx("sidebar-lesson-list")}>
          {topic.lessons.filter((lesson) => lesson.type === "Text" || lesson.type === "Math")
            .map((lesson) => (
              <PublishSidebarIInsidetem key={lesson.id} unitId={unitId} lessonId={lessonId} lesson={lesson} />
            ))}
        </div>
      )}

    </div>
  )
}

PublishSidebarItem.propTypes = {
  topic: PropTypes.object,
  unitId: PropTypes.string,
  lessonId: PropTypes.string,
};

export default PublishSidebarItem
