import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import styles from "./Dashboard.module.scss";
const cx = classNames.bind(styles);
function Dashboard() {
  return (
    <PageLayout>
      <div className={cx("staff-dashboard-wrapper")}>
        <div className={cx("staff-dashboard-container")}>
          <div className={cx("staff-dashboard-header")}>
            <div className={cx("staff-dashboard-text")}>Dashboard</div>
          </div>
          <div className={cx("staff-dashboard-content")}></div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>
  );
}

export default Dashboard;
