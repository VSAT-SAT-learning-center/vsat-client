import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./QuestionQuizz.module.scss";
const cx = classNames.bind(styles);
function QuestionQuizz() {
  return (
    <PageLayout>
      <div className={cx("question-quizz-title")}>QuestionQuizz</div>
    </PageLayout>
  );
}

export default QuestionQuizz;
