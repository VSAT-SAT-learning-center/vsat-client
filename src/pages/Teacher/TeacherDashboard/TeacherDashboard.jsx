import classNames from "classnames/bind";
import PageLayout from "~/layouts/Teacher/PageLayout";
import styles from "./TeacherDashboard.module.scss";
const cx = classNames.bind(styles);
function TeacherDashboard() {
  return (
    <PageLayout>
      <div className={cx("teacher-dashboard-title")}>Dashboard</div>
    </PageLayout>
  );
}

export default TeacherDashboard;
