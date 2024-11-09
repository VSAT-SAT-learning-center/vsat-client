import classNames from "classnames/bind";
import PageLayout from "~/layouts/Teacher/PageLayout";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import styles from "./TeacherSettings.module.scss";
const cx = classNames.bind(styles);
function TeacherSettings() {
  return (
    <PageLayout>
      <div className={cx("teacher-settings-wrapper")}>
        <div className={cx("teacher-settings-container")}>
          <div className={cx("teacher-settings-header")}>
            <div className={cx("teacher-settings-text")}>Settings</div>
          </div>
          <div className={cx("teacher-settings-content")}></div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>

  );
}

export default TeacherSettings;
