import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./Dashboard.module.scss";
const cx = classNames.bind(styles);
function Dashboard() {
  return (
    <PageLayout>
      <div className={cx("dashboard-title")}>Dashboard</div>
    </PageLayout>
  );
}

export default Dashboard;
