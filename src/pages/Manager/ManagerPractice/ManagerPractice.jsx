import classNames from "classnames/bind";
import PageLayout from "~/layouts/Manager/PageLayout";
import styles from "./ManagerPractice.module.scss";
const cx = classNames.bind(styles);
function ManagerPractice() {
  return (
    <PageLayout>
      <div className={cx("manager-practice-title")}>Practice</div>
    </PageLayout>
  );
}

export default ManagerPractice;
