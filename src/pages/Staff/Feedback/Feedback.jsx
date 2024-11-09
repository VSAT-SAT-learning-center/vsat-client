import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import styles from "./Feedback.module.scss";
const cx = classNames.bind(styles);
function Feedback() {
  return (
    <PageLayout>
      <div className={cx("staff-feedback-wrapper")}>
        <div className={cx("staff-feedback-container")}>
          <div className={cx("staff-feedback-header")}>
            <div className={cx("staff-feedback-text")}>Feedback</div>
          </div>
          <div className={cx("staff-feedback-content")}></div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>
  );
}

export default Feedback;
