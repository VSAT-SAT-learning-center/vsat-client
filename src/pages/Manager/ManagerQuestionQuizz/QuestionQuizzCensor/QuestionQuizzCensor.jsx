import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./QuestionQuizzCensor.module.scss";
const cx = classNames.bind(styles);
function QuestionQuizzCensor() {
  return (
    <PageLayout>
      <div className={cx("question-quizz-create-title")}>QuestionQuizzCreate</div>
    </PageLayout>
  );
}

export default QuestionQuizzCensor;
