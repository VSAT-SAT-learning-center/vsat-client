import classNames from "classnames/bind";
import PageLayout from "~/layouts/Manager/PageLayout";
import styles from "./FeedbackLearningMaterial.module.scss";
const cx = classNames.bind(styles);
function LearningMaterial() {
  return (
    <PageLayout>
      <div className={cx("feedback-learning-material-title")}>Feedback</div>
    </PageLayout>
  );
}

export default LearningMaterial;
