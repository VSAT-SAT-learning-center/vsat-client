import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./ExamScore.module.scss";
const cx = classNames.bind(styles);
function ExamScore() {
  return (
    <PageLayout>
      <div className={cx("exam-score-title")}>ExamScore</div>
    </PageLayout>
  );
}

export default ExamScore;
