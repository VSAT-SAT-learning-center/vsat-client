import classNames from "classnames/bind";
import LearningLayout from "~/layouts/Student/LearningLayout/LearningPageLayout";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import styles from "./DetailedReport.module.scss";
const cx = classNames.bind(styles);
function DetailedReport() {
  return (
    <LearningLayout>
      <div className={cx("detailed-report-wrapper")}>
        <div className={cx("detailed-report-container")}>
          <div className={cx("detailed-report-header")}>
            <div className={cx("detailed-report-text")}>Detailed Report</div>
          </div>
          <div className={cx("detailed-report-content")}></div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </LearningLayout>
  );
}

export default DetailedReport;
