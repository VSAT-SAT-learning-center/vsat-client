import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { renderLessonTypeIcon } from "~/utils/renderLessonTypeIcon";
import styles from "./LessonItemPreview.module.scss";
const cx = classNames.bind(styles);

function LessonItemPreview({
  type,
  topic,
  setTopics,
  setLessons,
  setIsShowCreateLesson,
  lessonType,
}) {
  const [lessonTitle, setLessonTitle] = useState("New lesson");

  const handleChangeLessonTitle = (e) => {
    setLessonTitle(e.target.value);
  };
  const handleCreateNewLesson = () => {
    const newLesson = {
      id: uuidv4(),
      title: lessonTitle,
      type: lessonType,
    };
    if (type === "update") {
      setTopics((prevTopics) =>
        prevTopics.map((t) =>
          t.id === topic.id ? { ...t, lessons: [...t.lessons, newLesson] } : t
        )
      );
    } else if (type === "create") {
      setLessons((prevLessons) => [...prevLessons, newLesson]);
    }

    setIsShowCreateLesson(false);
  };
  return (
    <div className={cx("lesson-item")}>
      <div className={cx("lesson-drag-handle")}>
        <div className={cx("handle-icon")}>
          <i
            className={cx("fa-sharp fa-solid fa-grip-dots-vertical", "icon")}
          ></i>
        </div>
      </div>
      <div className={cx("lesson-information")}>
        <div className={cx("lesson-information-content")}>
          <div className={cx("lesson-input")}>
            <input
              type="text"
              placeholder="New lesson"
              autoFocus={true}
              className={cx("title-input")}
              onChange={handleChangeLessonTitle}
            />
          </div>
          <div className={cx("lesson-type")}>
            <div className={cx("lesson-type-icon")}>
              <i className={cx(renderLessonTypeIcon(lessonType), "icon")}></i>
            </div>
            <div className={cx("lesson-type-text")}>{lessonType}</div>
          </div>
        </div>
        <div className={cx("lesson-information-config")}>
          <div
            className={cx("cancel-action")}
            onClick={() => setIsShowCreateLesson(false)}
          >
            <div className={cx("action-text")}>Cancel</div>
          </div>
          <div className={cx("save-action")} onClick={handleCreateNewLesson}>
            <div className={cx("action-text")}>Save</div>
          </div>
        </div>
      </div>
    </div>
  );
}

LessonItemPreview.propTypes = {
  type: PropTypes.string,
  topic: PropTypes.object,
  setTopics: PropTypes.func,
  setLessons: PropTypes.func,
  setIsShowCreateLesson: PropTypes.func,
  lessonType: PropTypes.string,
};

export default LessonItemPreview;
