import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { lessonType } from "~/data/Staff/LessonType";
import styles from "./LessonTypeModal.module.scss";
const cx = classNames.bind(styles);

function LessonTypeModal({
  setIsShowLessonTypeModal,
  setIsShowCreateLesson,
  setLessonType,
}) {
  const handleClickChooseLessonType = (lesson) => {
    if (
      lesson.text === "Text" ||
      lesson.text === "Math" ||
      lesson.text === "Quiz"
    ) {
      setLessonType(lesson.text);
      setIsShowCreateLesson(true);
      setIsShowLessonTypeModal(false);
    }
  };
  return (
    <div className={cx("lesson-type-modal-wrapper")}>
      <div className={cx("lesson-type-modal-container")}>
        <div className={cx("lesson-type-modal-header")}>
          <div className={cx("lesson-type-modal-title")}>Lessons</div>
          <div
            className={cx("lesson-type-modal-close")}
            onClick={() => setIsShowLessonTypeModal(false)}
          >
            <i className={cx("fa-regular fa-xmark", "icon")}></i>
          </div>
        </div>
        <div className={cx("lesson-type-modal-content")}>
          {lessonType.map((lesson) => (
            <div
              className={cx("lesson-type-item-container")}
              key={lesson.id}
              onClick={() => handleClickChooseLessonType(lesson)}
            >
              <div className={cx("lesson-type-item-icon")}>
                <i className={cx(lesson.icon, "icon")}></i>
              </div>
              <div className={cx("lesson-type-item-text")}>{lesson.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

LessonTypeModal.propTypes = {
  setIsShowLessonTypeModal: PropTypes.func,
  setIsShowCreateLesson: PropTypes.func,
  setLessonType: PropTypes.func,
};

export default LessonTypeModal;
