import classNames from "classnames/bind";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import PageLayout from "~/layouts/Teacher/PageLayout";
import styles from "./TeacherFeedback.module.scss";
const cx = classNames.bind(styles);
function TeacherFeedback() {
  return (
    <PageLayout>
      <div className={cx("teacher-feedback-wrapper")}>
        <div className={cx("teacher-feedback-container")}>
          <div className={cx("teacher-feedback-header")}>
            <div className={cx("teacher-feedback-text")}>Feedback</div>
          </div>
          <div className={cx("teacher-feedback-content")}></div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>
  )
}

export default TeacherFeedback
