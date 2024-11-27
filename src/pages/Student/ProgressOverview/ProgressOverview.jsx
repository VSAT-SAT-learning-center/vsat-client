import classNames from "classnames/bind";
import LearningLayout from "~/layouts/Student/LearningLayout/LearningPageLayout";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import styles from "./ProgressOverview.module.scss";
const cx = classNames.bind(styles);
function ProgressOverview() {
  return (
    <LearningLayout>
      <div className={cx("progress-overview-wrapper")}>
        <div className={cx("progress-overview-container")}>
          <div className={cx("progress-overview-header")}>
            <div className={cx("progress-overview-text")}>Skill Statistics</div>
          </div>
          <div className={cx("progress-overview-content")}></div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </LearningLayout>
  );
}

export default ProgressOverview;
