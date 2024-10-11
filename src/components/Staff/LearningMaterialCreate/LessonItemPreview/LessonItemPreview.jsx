import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import styles from "./LessonItemPreview.module.scss";
const cx = classNames.bind(styles);

function LessonItemPreview({ setLessons, setIsShowCreateLesson }) {
  const handleCreateNewLesson = () => {
    const newLesson = {
      id: uuidv4(),
      title: "VSAT applications in big cities boizz",
      type: "1 Text & Images",
    };
    console.log(newLesson);

    setLessons((prevLessons) => [...prevLessons, newLesson]);
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
            />
          </div>
          <div className={cx("lesson-type")}>Empty</div>
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
  setLessons: PropTypes.func.isRequired,
  setIsShowCreateLesson: PropTypes.func.isRequired,
};

export default LessonItemPreview;
