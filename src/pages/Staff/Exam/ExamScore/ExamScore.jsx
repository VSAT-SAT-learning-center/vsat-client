import classNames from "classnames/bind";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./ExamScore.module.scss";
const cx = classNames.bind(styles);
function ExamScore() {
  return (
    <PageLayout>
      <div className={cx("create-score-wrapper")}>
        <div className={cx("create-score-container")}>
          <div className={cx("create-score-header")}>
            <div className={cx("create-score-text")}>Exam Score</div>
            <button className={cx("create-score-import")}>
              <i
                className={cx("fa-regular fa-cloud-arrow-up", "import-icon")}
              ></i>
              <span className={cx("import-text")}>Import</span>
            </button>
          </div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>
  );
}

export default ExamScore;
