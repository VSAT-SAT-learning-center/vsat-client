import classNames from "classnames/bind";
import PageLayout from "~/layouts/Manager/PageLayout";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import styles from "./ManagerFeedback.module.scss";
const cx = classNames.bind(styles);
function ManagerFeedback() {
  return (
    <PageLayout>
      <div className={cx("manager-feedback-wrapper")}>
        <div className={cx("manager-feedback-container")}>
          <div className={cx("manager-feedback-header")}>
            <div className={cx("manager-feedback-text")}>Feedback</div>
          </div>
          <div className={cx("manager-feedback-content")}></div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>

  );
}

export default ManagerFeedback;
