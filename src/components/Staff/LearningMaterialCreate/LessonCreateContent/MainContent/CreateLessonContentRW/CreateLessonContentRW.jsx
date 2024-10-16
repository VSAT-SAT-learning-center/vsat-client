import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { lessonRWContents } from "~/data/Staff/LessonRWContents";
import styles from "./CreateLessonContentRW.module.scss";
const cx = classNames.bind(styles);

function CreateLessonContentRW({
  setLessonContentView,
  setLessonContentType,
  contentTitleInput,
  currentIndex,
  completedItems,
}) {
  const handleChooseLessonContentItem = (lessonContent, index) => {
    if (index === currentIndex && contentTitleInput !== "") {
      // Only proceed if contentTitleInput is not empty
      setLessonContentView(true);
      setLessonContentType(lessonContent.text);
    }
  };
  return (
    <div className={cx("create-lesson-content-rw-list")}>
      {lessonRWContents.map((lessonContent, index) => (
        <div
          className={cx("create-lesson-content-rw-item", {
            "active-item": index === currentIndex,
            "disabled-item":
              (index !== currentIndex && !completedItems.includes(index)) ||
              (index === currentIndex && contentTitleInput === ""),
            "done-item": completedItems.includes(index),
          })}
          key={lessonContent.id}
          onClick={() => handleChooseLessonContentItem(lessonContent, index)}
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
  setLessonContentType: PropTypes.func,
  contentTitleInput: PropTypes.string,
  currentIndex: PropTypes.number,
  completedItems: PropTypes.array,
};

export default CreateLessonContentRW;
