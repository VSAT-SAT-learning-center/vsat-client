import classNames from "classnames/bind";
import PageLayout from "~/layouts/Manager/PageLayout";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import styles from "./FeedbackExam.module.scss";
const cx = classNames.bind(styles);
function FeedbackExam() {
  return (
    <PageLayout>
      <div className={cx("feedback-exam-wrapper")}>
        <div className={cx("feedback-exam-container")}>
          <div className={cx("feedback-exam-header")}>
            <div className={cx("feedback-exam-text")}>Feedback Exam</div>
          </div>
          <div className={cx("feedback-exam-content")}></div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>

  );
}

export default FeedbackExam;
