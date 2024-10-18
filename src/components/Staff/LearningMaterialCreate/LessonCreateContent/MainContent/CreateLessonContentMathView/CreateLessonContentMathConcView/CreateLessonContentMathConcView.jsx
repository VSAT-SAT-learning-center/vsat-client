import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./CreateLessonContentMathConcView.module.scss";
const cx = classNames.bind(styles);

function CreateLessonContentMathConcView({ setIsShowCreateConcContent }) {

  return (
    <div className={cx("conc-view-wrapper")}>
      <div
        className={cx("create-conc-action")}
        onClick={() => setIsShowCreateConcContent(true)}
      >
        <div className={cx("create-icon")}>
          <i className={cx("fa-regular fa-circle-plus", "icon")}></i>
        </div>
        <div className={cx("create-text")}>Add content</div>
      </div>
    </div>
  )
}

CreateLessonContentMathConcView.propTypes = {
  setIsShowCreateConcContent: PropTypes.func,

};

export default CreateLessonContentMathConcView
