import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./LessonItem.module.scss";
const cx = classNames.bind(styles);

function LessonItem({ lesson, dragHandleProps }) {
  return (
    <div className={cx("lesson-item")}>
      <div className={cx("lesson-drag-handle")} {...dragHandleProps}>
        <div className={cx("handle-icon")}>
          <i
            className={cx("fa-sharp fa-solid fa-grip-dots-vertical", "icon")}
          ></i>
        </div>
      </div>
      <div className={cx("lesson-information")}>
        <div className={cx("lesson-information-content")}>
          <div className={cx("lesson-title")}>{lesson.title}</div>
          <div className={cx("lesson-type")}>{lesson.type}</div>
        </div>
        <div className={cx("lesson-information-config")}>
          <div className={cx("lesson-option")}>
            <i
              className={cx("fa-solid fa-ellipsis-vertical", "option-icon")}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}

LessonItem.propTypes = {
  lesson: PropTypes.object.isRequired,
  dragHandleProps: PropTypes.object.isRequired,
};

export default LessonItem;
