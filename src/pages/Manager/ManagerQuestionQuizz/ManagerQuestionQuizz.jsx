import classNames from "classnames/bind";
import PageLayout from "~/layouts/Manager/PageLayout";
import styles from "./ManagerQuestionQuizz.module.scss";
const cx = classNames.bind(styles);
function ManagerQuestionQuizz() {
  return (
    <PageLayout>
      <div className={cx("question-quizz-censor-title")}>QuestionQuizz</div>
    </PageLayout>
  );
}

export default ManagerQuestionQuizz;
