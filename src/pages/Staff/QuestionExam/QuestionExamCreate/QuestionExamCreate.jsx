import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./QuestionExamCreate.module.scss";
const cx = classNames.bind(styles);
function QuestionExamCreate() {
  return (
    <PageLayout>
      <div className={cx("question-exam-create-title")}>Question Exam Create</div>
    </PageLayout>
  );
}

export default QuestionExamCreate;
