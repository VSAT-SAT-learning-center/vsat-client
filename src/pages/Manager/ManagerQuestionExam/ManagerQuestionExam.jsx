import classNames from "classnames/bind";
import PageLayout from "~/layouts/Manager/PageLayout";
import styles from "./ManagerQuestionExam.module.scss";
const cx = classNames.bind(styles);
function QuestionExam() {
  return (
    <PageLayout>
      <div className={cx("manager-question-exam-title")}>Question Exam</div>
    </PageLayout>
  );
}

export default QuestionExam;
