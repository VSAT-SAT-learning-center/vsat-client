import classNames from "classnames/bind";
import PageLayout from "~/layouts/Manager/PageLayout";
import styles from "./FeedbackExam.module.scss";
const cx = classNames.bind(styles);
function FeedbackExam() {
  return (
    <PageLayout>
      <div className={cx("feedback-exam-title")}>Feedback</div>
    </PageLayout>
  );
}

export default FeedbackExam;
