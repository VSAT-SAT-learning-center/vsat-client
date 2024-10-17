import classNames from "classnames/bind";
import PropTypes from "prop-types";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import styles from "./AdminPageLayout.module.scss";
const cx = classNames.bind(styles);

function PageLayout({ children }) {
  return (
    <div className={cx(`admin-page-wrapper`)}>
      <Sidebar />
      <div className={cx(`admin-page-container`)}>
        <Topbar />
        <div className={cx(`admin-page-main`)}>{children}</div>
      </div>
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
