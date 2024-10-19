import classNames from "classnames/bind";
import PageLayout from "~/layouts/Teacher/PageLayout";
import styles from "./TeacherSettings.module.scss";
const cx = classNames.bind(styles);
function TeacherSettings() {
  return (
    <PageLayout>
      <div className={cx("teacher-settings-title")}>Settings</div>
    </PageLayout>
  );
}

export default TeacherSettings;
