import classNames from "classnames/bind";
import PageLayout from "~/layouts/Admin/PageLayout";
import AccountManageFooter from "~/components/Admin/Account/AccountManagement/AccountManageFooter/AccountManageFooter";
import AccountTable from "~/components/Admin/Account/AccountManagement/AccountTable/AccountTable";
import styles from "./Account.module.scss";
const cx = classNames.bind(styles);
function Account() {
  return (
    <PageLayout>
      <div className={cx("admin-account-manage-container")}>
        <div className={cx("admin-account-main")}>
          <AccountTable />
        </div>
        <AccountManageFooter />
      </div>
    </PageLayout>
  );
}

export default Account;
