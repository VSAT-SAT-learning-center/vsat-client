import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "./LessonCreateSidebarItem.module.scss";
const cx = classNames.bind(styles);

function LessonInsideItem({ topics, lesson, lessonId }) {
  const navigate = useNavigate();
  const handleClickLessonItem = () => {
    navigate(`/staff/learning-material/create/lessons/${lesson.id}`, {
      state: { topics },
    });
  };
  return (
    <div
      className={cx("sidebar-lesson-item", { active: lessonId === lesson.id })}
      onClick={handleClickLessonItem}
    >
      <div className={cx("lesson-item-icon")}>
        <i className={cx("fa-sharp fa-regular fa-file", "icon-lesson")}></i>
      </div>
      <div className={cx("lesson-item-title")}>{lesson.title}</div>
    </div>
  );
}

LessonInsideItem.propTypes = {
  topics: PropTypes.array,
  lesson: PropTypes.object,
  lessonId: PropTypes.string,
};

export default LessonInsideItem;
