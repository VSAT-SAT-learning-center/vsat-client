import classNames from "classnames/bind";
import PageLayout from "~/layouts/Manager/PageLayout";
import styles from "./ExamScoreCensor.module.scss";
const cx = classNames.bind(styles);
function ExamScoreCensor() {
  return (
    <PageLayout>
      <div className={cx("exam-score-censor-title")}>Exam Censor</div>
    </PageLayout>
  );
}

export default ExamScoreCensor;
