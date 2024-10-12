import classNames from "classnames/bind";
import PageLayout from "~/layouts/Manager/PageLayout";
import styles from "./ExamStructureCensor.module.scss";
const cx = classNames.bind(styles);
function ExamStructureCensor() {
  return (
    <PageLayout>
      <div className={cx("exam-structure-censor-title")}>Exam Structure</div>
    </PageLayout>
  );
}

export default ExamStructureCensor;
