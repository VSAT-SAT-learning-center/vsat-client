import classNames from "classnames/bind";
import PageLayout from "~/layouts/Teacher/PageLayout";
import styles from "./TeacherAccountSetting.module.scss";
const cx = classNames.bind(styles);
function TeacherAccountSetting() {
  return (
    <PageLayout>
      <div className={cx("teacher-account-setting-title")}>Account Setting</div>
    </PageLayout>
  );
}

export default TeacherAccountSetting;
