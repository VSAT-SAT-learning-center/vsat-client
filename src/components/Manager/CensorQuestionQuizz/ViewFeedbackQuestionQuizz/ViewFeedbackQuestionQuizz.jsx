import classNames from "classnames"
import styles from "./ViewFeedbackQuestion.module.scss"
const cx = classNames.bind(styles);
function ViewFeedbackQuestionQuizz() {
  return (
    <div className={cx("view-feedback-question-wrapper")}>
      <div className={cx("view-feedback-question-container")}></div>
    </div>
  )
}

export default ViewFeedbackQuestionQuizz
