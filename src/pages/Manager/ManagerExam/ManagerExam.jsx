import classNames from "classnames/bind";
import PageLayout from "~/layouts/Manager/PageLayout";
import styles from "./ManagerExam.module.scss";
const cx = classNames.bind(styles);
function ManagerExam() {
  return (
    <PageLayout>
      <div className={cx("manager-exam-title")}>Exam</div>
    </PageLayout>
  );
}

export default ManagerExam;
