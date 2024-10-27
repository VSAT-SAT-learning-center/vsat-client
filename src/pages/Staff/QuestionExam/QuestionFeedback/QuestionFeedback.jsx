import classNames from "classnames/bind";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./QuestionFeedback.module.scss";
const cx = classNames.bind(styles);
function QuestionFeedback() {
  return (
    <PageLayout>
      <div className={cx("question-feedback-wrapper")}>
        <div className={cx("question-feedback-container")}>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>
  );
}

export default QuestionFeedback;
