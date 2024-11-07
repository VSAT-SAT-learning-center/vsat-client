import classNames from "classnames/bind";
import styles from "./QuestionCreateView.module.scss";
const cx = classNames.bind(styles);

function QuestionCreateView({ setIsShowQuestionCreateView }) {
  return (
    <div className={cx("question-create-view-wrapper")}>
      <div className={cx("question-create-view-container")}>
        <div className={cx("question-create-view-header")}>
          <div className={cx("question-text")}>Question Create</div>
        </div>
        <div className={cx("question-create-view-content")}></div>
        <div className={cx("question-create-view-footer")}>
          <button
            className={cx("cancel-btn")}
            onClick={() => setIsShowQuestionCreateView(false)}
          >
            Cancel
          </button>
          <button className={cx("preview-btn")}>
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuestionCreateView
