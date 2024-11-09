import classNames from "classnames/bind";
import PageLayout from "~/layouts/Manager/PageLayout";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import styles from "./ManagerDashboard.module.scss";
const cx = classNames.bind(styles);
function ManagerDashboard() {
  return (
    <PageLayout>
      <div className={cx("manager-dashboard-wrapper")}>
        <div className={cx("manager-dashboard-container")}>
          <div className={cx("manager-dashboard-header")}>
            <div className={cx("manager-dashboard-text")}>Dashboard</div>
          </div>
          <div className={cx("manager-dashboard-content")}></div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>

  );
}

export default ManagerDashboard;
