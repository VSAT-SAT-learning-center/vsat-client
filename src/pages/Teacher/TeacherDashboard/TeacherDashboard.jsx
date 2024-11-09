import classNames from "classnames/bind";
import PageLayout from "~/layouts/Teacher/PageLayout";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import styles from "./TeacherDashboard.module.scss";
const cx = classNames.bind(styles);
function TeacherDashboard() {
  return (
    <PageLayout>
      <div className={cx("teacher-dashboard-wrapper")}>
        <div className={cx("teacher-dashboard-container")}>
          <div className={cx("teacher-dashboard-header")}>
            <div className={cx("teacher-dashboard-text")}>Dashboard</div>
          </div>
          <div className={cx("teacher-dashboard-content")}></div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>

  );
}

export default TeacherDashboard;
