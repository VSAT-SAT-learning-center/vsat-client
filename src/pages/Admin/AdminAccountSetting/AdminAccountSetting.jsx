import classNames from "classnames/bind";
import PageLayout from "~/layouts/Admin/PageLayout";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import styles from "./AdminAccountSetting.module.scss";
const cx = classNames.bind(styles);
function AdminAccountSetting() {
  return (
    <PageLayout>
      <div className={cx("admin-account-setting-wrapper")}>
        <div className={cx("admin-account-setting-container")}>
          <div className={cx("admin-account-setting-header")}>
            <div className={cx("admin-account-setting-text")}>Account Setting</div>
          </div>
          <div className={cx("admin-account-setting-content")}></div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>

  );
}

export default AdminAccountSetting;
