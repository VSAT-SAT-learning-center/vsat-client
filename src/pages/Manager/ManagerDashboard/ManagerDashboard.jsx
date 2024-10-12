import classNames from "classnames/bind";
import PageLayout from "~/layouts/Manager/PageLayout";
import styles from "./ManagerDashboard.module.scss";
const cx = classNames.bind(styles);
function ManagerDashboard() {
  return (
    <PageLayout>
      <div className={cx("manager-dashboard-title")}>Dashboard</div>
    </PageLayout>
  );
}

export default ManagerDashboard;
