import classNames from "classnames/bind";
import PageLayout from "~/layouts/Teacher/PageLayout";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import styles from "./TeacherAccountSetting.module.scss";
const cx = classNames.bind(styles);
function TeacherAccountSetting() {
  return (
    <PageLayout>
      <div className={cx("teacher-account-setting-wrapper")}>
        <div className={cx("teacher-account-setting-container")}>
          <div className={cx("teacher-account-setting-header")}>
            <div className={cx("teacher-account-setting-text")}> </div>
          </div>
          <div className={cx("teacher-account-setting-content")}></div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>

  );
}

export default TeacherAccountSetting;
