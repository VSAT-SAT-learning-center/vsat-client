import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./ViewSidebar.module.scss";
const cx = classNames.bind(styles);

function ViewSidebarInside({ lesson, lessonData, setLessonData }) {
  const handleChooseLesson = () => {
    setLessonData(lesson)
  }
  return (
    <div className={cx("detail-lesson-item", { active: lesson.id === lessonData.id })} onClick={handleChooseLesson}>
      <div className={cx("lesson-item-icon")}>
        <i className={cx("fa-sharp fa-regular fa-file", "icon-lesson")}></i>
      </div>
      <div className={cx("lesson-item-title")}>{lesson.title}</div>
    </div>
  )
}

ViewSidebarInside.propTypes = {
  lesson: PropTypes.object,
  lessonData: PropTypes.object,
}

export default ViewSidebarInside
