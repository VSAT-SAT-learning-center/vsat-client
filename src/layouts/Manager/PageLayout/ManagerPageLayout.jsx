import classNames from "classnames/bind";
import PropTypes from "prop-types";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import styles from "./ManagerPageLayout.module.scss";
const cx = classNames.bind(styles);

function PageLayout({ children }) {
  return (
    <div className={cx(`manager-page-wrapper`)}>
      <Sidebar />
      <div className={cx(`manager-page-container`)}>
        <Topbar />
        <div className={cx(`manager-page-main`)}>{children}</div>
      </div>
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
