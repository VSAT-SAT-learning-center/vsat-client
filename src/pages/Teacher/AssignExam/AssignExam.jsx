import classNames from "classnames/bind";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import PageLayout from "~/layouts/Teacher/PageLayout";
import styles from "./AssignExam.module.scss";
const cx = classNames.bind(styles);

function AssignExam() {
  return (
    <PageLayout>
      <div className={cx("teacher-assign-exam-wrapper")}>
        <div className={cx("teacher-assign-exam-container")}>
          <div className={cx("teacher-assign-exam-header")}>
            <div className={cx("teacher-assign-exam-text")}>Assign Exam</div>
          </div>
          <div className={cx("teacher-assign-exam-content")}></div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>
  );
}

export default AssignExam;
