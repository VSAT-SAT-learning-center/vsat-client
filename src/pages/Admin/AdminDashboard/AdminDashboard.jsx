import classNames from "classnames/bind";
import PageLayout from "~/layouts/Admin/PageLayout";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import styles from "./AdminDashboard.module.scss";
const cx = classNames.bind(styles);
function AdminDashboard() {
  return (
    <PageLayout>
      <div className={cx("admin-dashboard-wrapper")}>
        <div className={cx("admin-dashboard-container")}>
          <div className={cx("admin-dashboard-header")}>
            <div className={cx("admin-dashboard-text")}>Dashboard</div>
          </div>
          <div className={cx("admin-dashboard-content")}></div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>

  );
}

export default AdminDashboard;
