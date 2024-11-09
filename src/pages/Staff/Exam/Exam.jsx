import classNames from "classnames/bind";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./Exam.module.scss";
const cx = classNames.bind(styles);
function Exam() {
  return (
    <PageLayout>
      <div className={cx("exam-wrapper")}>
        <div className={cx("exam-container")}>
          <div className={cx("exam-header")}>
            <div className={cx("exam-text")}>Exam Overview</div>
          </div>
          <div className={cx("exam-content")}></div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>
  );
}

export default Exam;
