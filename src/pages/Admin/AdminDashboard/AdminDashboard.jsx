import classNames from "classnames/bind";
import PageLayout from "~/layouts/Admin/PageLayout";
import styles from "./AdminDashboard.module.scss";
const cx = classNames.bind(styles);
function AdminDashboard() {
  return (
    <PageLayout>
      <div className={cx("admin-dashboard-title")}>Dashboard</div>
    </PageLayout>
  );
}

export default AdminDashboard;
