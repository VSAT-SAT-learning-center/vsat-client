import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./CreateLessonContentMath.module.scss";
import { lessonMathContents } from "~/data/Staff/LessonMathContents";
const cx = classNames.bind(styles);

function CreateLessonContentMath({
  setLessonContentMathView,
  setLessonContentType,
  contentTitleInput,
  currentIndex,
  completedItems,
}) {
  const handleChooseLessonContentItem = (lessonContent, index) => {
    if (index === currentIndex && contentTitleInput !== "") {
      setLessonContentMathView(true);
      setLessonContentType(lessonContent.text);
    }
  };
  return (
    <div className={cx("create-lesson-content-math-list")}>
      {lessonMathContents.map((lessonContent, index) => (
        <div
          className={cx("create-lesson-content-math-item", {
            "active-item": index === currentIndex,
            "disabled-item":
              (index !== currentIndex && !completedItems.includes(index)) ||
              (index === currentIndex && contentTitleInput === ""),
            "done-item": completedItems.includes(index),
          })}
          key={lessonContent.id}
          onClick={() => handleChooseLessonContentItem(lessonContent, index)}
        >
          <div className={cx("create-math-icon")}>
            <i className={cx(lessonContent.icon, "icon")}></i>
          </div>
          <div className={cx("create-math-text")}>{lessonContent.text}</div>
        </div>
      ))}
    </div>
  );
}

CreateLessonContentMath.propTypes = {
  setLessonContentMathView: PropTypes.func,
  setLessonContentType: PropTypes.func,
  contentTitleInput: PropTypes.string,
  currentIndex: PropTypes.number,
  completedItems: PropTypes.array,
};

export default CreateLessonContentMath;
