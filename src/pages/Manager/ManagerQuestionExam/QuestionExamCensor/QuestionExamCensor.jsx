import classNames from "classnames/bind";
import PageLayout from "~/layouts/Manager/PageLayout";
import styles from "./QuestionExamCensor.module.scss";
const cx = classNames.bind(styles);
function QuestionExamCreate() {
  return (
    <PageLayout>
      <div className={cx("question-exam-censor-title")}>Question Exam Censor</div>
    </PageLayout>
  );
}

export default QuestionExamCreate;
