import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./LearningMaterialFeedback.module.scss";
const cx = classNames.bind(styles);
function LearningMaterialFeedback() {
  return (
    <PageLayout>
      <div className={cx("learning-material-ass-title")}>
        Learning material feedback
      </div>
    </PageLayout>
  );
}

export default LearningMaterialFeedback;
