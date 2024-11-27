import classNames from "classnames/bind";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import LearningLayout from "~/layouts/Student/LearningLayout/LearningPageLayout";
import styles from "./Feedback.module.scss";
const cx = classNames.bind(styles);

function Feedback() {
  return (
    <LearningLayout>
      <div className={cx("feedback-wrapper")}>
        <div className={cx("feedback-container")}>
          <div className={cx("feedback-header")}>
            <div className={cx("feedback-text")}>Feedback</div>
          </div>
          <div className={cx("feedback-content")}></div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </LearningLayout>
  )
}

export default Feedback
