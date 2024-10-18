import classNames from "classnames/bind";
import PageLayout from "~/layouts/Admin/PageLayout";
import styles from "./AdminAccountSetting.module.scss";
const cx = classNames.bind(styles);
function AdminAccountSetting() {
  return (
    <PageLayout>
      <div className={cx("admin-account-setting-title")}>Account Setting</div>
    </PageLayout>
  );
}

export default AdminAccountSetting;
