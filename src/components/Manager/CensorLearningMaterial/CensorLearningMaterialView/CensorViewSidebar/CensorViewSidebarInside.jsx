import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./CensorViewSidebar.module.scss";
const cx = classNames.bind(styles);

function CensorViewSidebarInside({ lesson, lessonData }) {

  return (
    <div className={cx("detail-lesson-item", { active: lesson.id === lessonData.id })}
    >
      <div className={cx("lesson-item-icon")}>
        <i className={cx("fa-sharp fa-regular fa-file", "icon-lesson")}></i>
      </div>
      <div className={cx("lesson-item-title")}>{lesson.title}</div>
    </div>
  )
}

CensorViewSidebarInside.propTypes = {
  lesson: PropTypes.object,
  lessonData: PropTypes.object,
}

export default CensorViewSidebarInside
