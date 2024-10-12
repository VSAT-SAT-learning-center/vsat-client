import classNames from "classnames/bind";
import PageLayout from "~/layouts/Manager/PageLayout";
import styles from "./FeedbackQuestionQuizz.module.scss";
const cx = classNames.bind(styles);
function FeedbackQuestionQuizz() {
  return (
    <PageLayout>
      <div className={cx("manager-question-quizz-title")}>Feedback</div>
    </PageLayout>
  );
}

export default FeedbackQuestionQuizz;
