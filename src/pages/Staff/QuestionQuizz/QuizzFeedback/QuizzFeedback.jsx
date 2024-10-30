import classNames from "classnames/bind";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./QuizzFeedback.module.scss";
const cx = classNames.bind(styles);
function QuizzFeedback() {
  return (
    <PageLayout>
      <div className={cx("quizz-feedback-wrapper")}>
        <div className={cx("quizz-feedback-container")}></div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>
  );
}

export default QuizzFeedback;
