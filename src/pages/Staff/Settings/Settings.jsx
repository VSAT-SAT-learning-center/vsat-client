import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import styles from "./Settings.module.scss";
const cx = classNames.bind(styles);
function Settings() {
  return (
    <PageLayout>
      <div className={cx("settings-wrapper")}>
        <div className={cx("settings-container")}>
          <div className={cx("settings-header")}>
            <div className={cx("settings-text")}>Setting</div>
          </div>
          <div className={cx("settings-content")}></div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>

  );
}

export default Settings;
