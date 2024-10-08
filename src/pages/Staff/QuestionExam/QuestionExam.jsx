import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./QuestionExam.module.scss";
const cx = classNames.bind(styles);
function QuestionExam() {
  return (
    <PageLayout>
      <div className={cx("question-exam-title")}>Question Exam</div>
    </PageLayout>
  );
}

export default QuestionExam;
