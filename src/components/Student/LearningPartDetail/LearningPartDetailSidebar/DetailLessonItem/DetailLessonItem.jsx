import classNames from "classnames/bind";
import styles from "./DetailLessonItem.module.scss";
const cx = classNames.bind(styles);

function DetailLessonItem({ lesson, isActive, onClick }) {
  return (
    <div className={cx("detail-content-lesson-item", { "lesson-item-active": isActive })} onClick={onClick}>
      {lesson?.status === "Completed" ? (
        <div className={cx("lesson-item-icon", "icon-active")}>
          <div className={cx("check")}>
            <i className={cx("fa-solid fa-check", "icon-check")}></i>
          </div>
          <i className={cx("fa-sharp fa-regular fa-file", "icon-lesson")}></i>
        </div>
      ) : (
        <div className={cx("lesson-item-icon")}>
          <i className={cx("fa-sharp fa-regular fa-file", "icon-lesson")}></i>
        </div>
      )}
      <div className={cx("lesson-item-title")}>
        {lesson.title}
      </div>
    </div>
  );
}

export default DetailLessonItem;
