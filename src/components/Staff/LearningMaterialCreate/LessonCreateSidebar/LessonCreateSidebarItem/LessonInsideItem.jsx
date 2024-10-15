import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import styles from "./LessonCreateSidebarItem.module.scss";
const cx = classNames.bind(styles);

function LessonInsideItem() {
  const navigate = useNavigate()
  const handleClickLessonItem = () => {
    navigate(`${"/staff/learning-material/create/lessons/1"}`)
  }
  return (
    <div className={cx("sidebar-lesson-item")} onClick={handleClickLessonItem}>
      <div className={cx("lesson-item-icon")}>
        <i className={cx("fa-sharp fa-regular fa-file", "icon-lesson")}></i>
      </div>
      <div className={cx("lesson-item-title")}>
        Command of evidence: textual | Lesson
      </div>
    </div>
  );
}

export default LessonInsideItem;
