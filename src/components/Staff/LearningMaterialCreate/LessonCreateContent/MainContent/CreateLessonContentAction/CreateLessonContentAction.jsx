import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./CreateLessonContentAction.module.scss";
const cx = classNames.bind(styles);

function CreateLessonContentAction({ setIsShowLessonContentRW }) {
  return (
    <button
      className={cx("create-lesson-content-action")}
      onClick={() => setIsShowLessonContentRW(true)}
    >
      <div className={cx("create-icon")}>
        <i className={cx("fa-regular fa-circle-plus", "icon")}></i>
      </div>
      <div className={cx("create-text")}>New content</div>
    </button>
  );
}

CreateLessonContentAction.propTypes = {
  setIsShowLessonContentRW: PropTypes.func,
};

export default CreateLessonContentAction;
