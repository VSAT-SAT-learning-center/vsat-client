import classNames from "classnames/bind";
import PageLayout from "~/layouts/Manager/PageLayout";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import styles from "./ManagerExam.module.scss";
const cx = classNames.bind(styles);
function ManagerExam() {
  return (
    <PageLayout>
      <div className={cx("manager-exam-wrapper")}>
        <div className={cx("manager-exam-container")}>
          <div className={cx("manager-exam-header")}>
            <div className={cx("manager-exam-text")}>Exam</div>
          </div>
          <div className={cx("manager-exam-content")}></div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>

  );
}

export default ManagerExam;
