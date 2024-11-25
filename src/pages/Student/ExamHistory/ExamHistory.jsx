import classNames from "classnames/bind";
import LearningLayout from "~/layouts/Student/LearningLayout/LearningPageLayout";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import styles from "./ExamHistory.module.scss";
const cx = classNames.bind(styles);
function ExamHistory() {
  return (
    <LearningLayout>
      <div className={cx("exam-history-wrapper")}>
        <div className={cx("exam-history-container")}>
          <div className={cx("exam-history-header")}>
            <div className={cx("exam-history-text")}>Exam History</div>
          </div>
          <div className={cx("exam-history-content")}></div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </LearningLayout>
  );
}

export default ExamHistory;
