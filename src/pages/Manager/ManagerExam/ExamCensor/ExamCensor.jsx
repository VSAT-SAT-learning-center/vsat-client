import classNames from "classnames/bind";
import PageLayout from "~/layouts/Manager/PageLayout";
import styles from "./ExamCensor.module.scss";
const cx = classNames.bind(styles);
function ExamCensor() {
  return (
    <PageLayout>
      <div className={cx("censor-exam-title")}>Exam Censor</div>
    </PageLayout>
  );
}

export default ExamCensor;
