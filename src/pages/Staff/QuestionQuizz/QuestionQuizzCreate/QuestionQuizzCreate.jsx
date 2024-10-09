import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./QuestionQuizzCreate.module.scss";
const cx = classNames.bind(styles);
function QuestionQuizzCreate() {
  return (
    <PageLayout>
      <div className={cx("question-quizz-create-title")}>QuestionQuizzCreate</div>
    </PageLayout>
  );
}

export default QuestionQuizzCreate;
