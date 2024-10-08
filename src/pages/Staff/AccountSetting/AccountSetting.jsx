import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./AccountSetting.module.scss";
const cx = classNames.bind(styles);
function AccountSetting() {
  return (
    <PageLayout>
      <div className={cx("account-setting-title")}>AccountSetting</div>
    </PageLayout>
  );
}

export default AccountSetting;
