import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import styles from "./AccountSetting.module.scss";
const cx = classNames.bind(styles);
function AccountSetting() {
  return (
    <PageLayout>
      <div className={cx("account-settingaccount-setting-wrapper")}>
        <div className={cx("account-settingaccount-setting-container")}>
          <div className={cx("account-settingaccount-setting-header")}>
            <div className={cx("account-settingaccount-setting-text")}>Account Setting</div>
          </div>
          <div className={cx("account-settingaccount-setting-content")}></div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>

  );
}

export default AccountSetting;
