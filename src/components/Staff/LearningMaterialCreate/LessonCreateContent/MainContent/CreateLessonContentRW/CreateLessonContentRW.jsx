import classNames from "classnames/bind";
import { lessonRWContents } from "~/data/Staff/LessonRWContents";
import styles from "./CreateLessonContentRW.module.scss";
import PropTypes from "prop-types";
const cx = classNames.bind(styles);

function CreateLessonContentRW({ setLessonContentView }) {
  return (
    <div className={cx("create-lesson-content-rw-list")}>
      {lessonRWContents.map((lessonContent) => (
        <div
          className={cx("create-lesson-content-rw-item")}
          key={lessonContent.id}
          onClick={() => setLessonContentView(lessonContent.text)}
        >
          <div className={cx("create-rw-icon")}>
            <i className={cx(lessonContent.icon, "icon")}></i>
          </div>
          <div className={cx("create-rw-text")}>{lessonContent.text}</div>
        </div>
      ))}
    </div>
  );
}

CreateLessonContentRW.propTypes = {
  setLessonContentView: PropTypes.func,
};

export default CreateLessonContentRW;
