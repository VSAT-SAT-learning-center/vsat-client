import classNames from "classnames/bind";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./ExamCreate.module.scss";
const cx = classNames.bind(styles);
function ExamCreate() {
  return (
    <PageLayout>
      <div className={cx("create-exam-wrapper")}>
        <div className={cx("create-exam-container")}>
          <div className={cx("create-exam-header")}>
            <div className={cx("create-exam-text")}>Create Exam</div>
          </div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>
  );
}

export default ExamCreate;
