import classNames from "classnames/bind";
import PropTypes from "prop-types";
import Sidebar from "../LearningSidebar/LearningSidebar.jsx";
import HeaderAuthen from "~/layouts/Landing/HeaderAuthen";
import styles from "./PageLayout.module.scss";
const cx = classNames.bind(styles);

function PageLayout({ children }) {
  return (
    <div className={cx(`page-wrapper`)}>
      <Sidebar />
      <div className={cx(`page-container`)}>
        <HeaderAuthen />
        <div className={cx(`page-main`)}>{children}</div>
      </div>
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
