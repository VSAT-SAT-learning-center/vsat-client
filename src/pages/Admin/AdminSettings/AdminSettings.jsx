import classNames from "classnames/bind";
import PageLayout from "~/layouts/Admin/PageLayout";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import styles from "./AdminSettings.module.scss";
const cx = classNames.bind(styles);
function AdminSettings() {
  return (
    <PageLayout>
      <div className={cx("admin-settings-wrapper")}>
        <div className={cx("admin-settings-container")}>
          <div className={cx("admin-settings-header")}>
            <div className={cx("admin-settings-text")}>Settings</div>
          </div>
          <div className={cx("admin-settings-content")}></div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>

  );
}

export default AdminSettings;
