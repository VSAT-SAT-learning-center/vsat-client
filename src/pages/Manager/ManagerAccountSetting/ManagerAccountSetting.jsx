import classNames from "classnames/bind";
import PageLayout from "~/layouts/Manager/PageLayout";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import styles from "./ManagerAccountSetting.module.scss";
const cx = classNames.bind(styles);
function ManagerAccountSetting() {
  return (
    <PageLayout>
      <div className={cx("manager-account-setting-wrapper")}>
        <div className={cx("manager-account-setting-container")}>
          <div className={cx("manager-account-setting-header")}>
            <div className={cx("manager-account-setting-text")}>Manager Account Setting</div>
          </div>
          <div className={cx("manager-account-setting-content")}></div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>

  );
}

export default ManagerAccountSetting;
