import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./Settings.module.scss";
const cx = classNames.bind(styles);
function Settings() {
  return (
    <PageLayout>
      <div className={cx("settings-title")}>Settings</div>
    </PageLayout>
  );
}

export default Settings;
