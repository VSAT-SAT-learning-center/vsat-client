import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./CreateLessonContentAction.module.scss";
const cx = classNames.bind(styles);

function CreateLessonContentAction({ setIsShowLessonContent }) {
  return (
    <button
      className={cx("create-lesson-content-action")}
      onClick={() => setIsShowLessonContent(true)}
    >
      <div className={cx("create-icon")}>
        <i className={cx("fa-regular fa-circle-plus", "icon")}></i>
      </div>
      <div className={cx("create-text")}>New content</div>
    </button>
  );
}

CreateLessonContentAction.propTypes = {
  setIsShowLessonContent: PropTypes.func,
};

export default CreateLessonContentAction;
