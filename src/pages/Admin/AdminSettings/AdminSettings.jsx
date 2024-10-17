import classNames from "classnames/bind";
import PageLayout from "~/layouts/Admin/PageLayout";
import styles from "./AdminSettings.module.scss";
const cx = classNames.bind(styles);
function AdminSettings() {
  return (
    <PageLayout>
      <div className={cx("manager-settings-title")}>Settings</div>
    </PageLayout>
  );
}

export default AdminSettings;
