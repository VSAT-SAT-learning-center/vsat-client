import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./AccountManageFooter.module.scss";

const cx = classNames.bind(styles);

function AccountManageFooter() {
  return (
    <div className={cx("account-manage-footer-wrapper")}>
      <div className={cx("account-manage-footer-container")}>
        <div className={cx("footer-left")}>
          <div className={cx("footer-title")}> © Copyright VSAT 2024, All Right Reserverd</div>
        </div>
        <div className={cx("footer-right")}>
          <Link to="#" className={cx("foward-link-item")}>License</Link>
          <Link to="#" className={cx("foward-link-item")}>Privacy</Link>
          <Link to="#" className={cx("foward-link-item")}>Documentation</Link>
          <Link to="#" className={cx("foward-link-item")}>Support</Link>
        </div>
      </div>
    </div>
  );
}

export default AccountManageFooter;
