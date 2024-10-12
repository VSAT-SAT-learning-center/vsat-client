import classNames from "classnames/bind";
import PageLayout from "~/layouts/Manager/PageLayout";
import styles from "./ManagerAccountSetting.module.scss";
const cx = classNames.bind(styles);
function ManagerAccountSetting() {
  return (
    <PageLayout>
      <div className={cx("manager-account-setting-title")}>Account Setting</div>
    </PageLayout>
  );
}

export default ManagerAccountSetting;
