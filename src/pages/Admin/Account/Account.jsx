import classNames from "classnames/bind";
import AccountTable from "~/components/Admin/Account/AccountManagement/AccountTable/AccountTable";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import PageLayout from "~/layouts/Admin/PageLayout";
import styles from "./Account.module.scss";
const cx = classNames.bind(styles);
function Account() {
  return (
    <PageLayout>
      <div className={cx("admin-account-manage-wrapper")}>
        <div className={cx("admin-account-manage-container")}>
          <div className={cx("admin-account-manage-header")}>
            <div className={cx("admin-account-manage-text")}>
              User Management
            </div>
          </div>
          <div className={cx("admin-account-manage-content")}>
            <AccountTable />
          </div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>
  );
}

export default Account;
