import classNames from "classnames/bind";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./ExamFeedback.module.scss";
const cx = classNames.bind(styles);
function ExamFeedback() {
  return (
    <PageLayout>
      <div className={cx("exam-feedback-wrapper")}>
        <div className={cx("exam-feedback-container")}>
          <div className={cx("exam-feedback-header")}>
            <div className={cx("exam-feedback-text")}>Exam Feedback</div>
          </div>
          <div className={cx("exam-feedback-content")}></div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>
  );
}

export default ExamFeedback;
