import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import styles from "./LearningMaterialFeedback.module.scss";
const cx = classNames.bind(styles);
function LearningMaterialFeedback() {
  return (
    <PageLayout>
    <div className={cx("learning-material-ass-wrapper")}>
      <div className={cx("learning-material-ass-container")}>
        <div className={cx("learning-material-ass-header")}>
          <div className={cx("learning-material-ass-text")}>
          Learning material feedback
          </div>
        </div>
        <div className={cx("learning-material-ass-content")}></div>
      </div>
    </div>
    <LearningMaterialCreateFooter />
  </PageLayout>
  );
}

export default LearningMaterialFeedback;
