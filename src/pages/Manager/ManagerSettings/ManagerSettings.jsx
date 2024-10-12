import classNames from "classnames/bind";
import PageLayout from "~/layouts/Manager/PageLayout";
import styles from "./ManagerSettings.module.scss";
const cx = classNames.bind(styles);
function ManagerSettings() {
  return (
    <PageLayout>
      <div className={cx("manager-settings-title")}>Settings</div>
    </PageLayout>
  );
}

export default ManagerSettings;
