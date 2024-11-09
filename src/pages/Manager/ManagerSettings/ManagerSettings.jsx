import classNames from "classnames/bind";
import PageLayout from "~/layouts/Manager/PageLayout";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import styles from "./ManagerSettings.module.scss";
const cx = classNames.bind(styles);
function ManagerSettings() {
  return (
    <PageLayout>
      <div className={cx("manager-settings-wrapper")}>
        <div className={cx("manager-settings-container")}>
          <div className={cx("manager-settings-header")}>
            <div className={cx("manager-settings-text")}> </div>
          </div>
          <div className={cx("manager-settings-content")}></div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>

  );
}

export default ManagerSettings;
