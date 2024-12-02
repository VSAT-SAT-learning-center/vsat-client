import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styles from "./ViewSidebar.module.scss";
import ViewSidebarInside from "./ViewSidebarInside";
const cx = classNames.bind(styles);

function ViewSidebar({ unitArea, lessonData, setLessonData }) {
  const [isShowLesson, setIsShowLesson] = useState(false);

  useEffect(() => {
    if (unitArea?.lessons.some((lesson) => lesson.id === lessonData?.id)) {
      setIsShowLesson(true);
    }
  }, [lessonData.id, unitArea.lessons]);

  const handleClickShowLesson = () => {
    setIsShowLesson(!isShowLesson);
  };
  return (
    <div className={cx("detail-item")}>
      <div className={cx("detail-topic-item")} onClick={handleClickShowLesson}>
        <div className={cx("topic-item-left")}>
          <div className={cx("topic-item-icon")}>
            <i className={cx("fa-regular fa-book-open", "item-icon")}></i>
          </div>
          <div className={cx("topic-item-title")}>{unitArea?.title}</div>
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
        <div className={cx("detail-lesson-list")}>
          {unitArea?.lessons && unitArea?.lessons.length > 0 && unitArea?.lessons.map((lesson) => (
            <ViewSidebarInside key={lesson.id} lesson={lesson} lessonData={lessonData} setLessonData={setLessonData} />
          ))}
        </div>
      )}
    </div>
  )
}

ViewSidebar.propTypes = {
  unitArea: PropTypes.object,
  lessonData: PropTypes.object,
}

export default ViewSidebar
