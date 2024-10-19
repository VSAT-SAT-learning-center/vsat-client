import classNames from "classnames/bind";
import PropTypes from "prop-types";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import styles from "./TeacherPageLayout.module.scss";
const cx = classNames.bind(styles);

function TeacherPageLayout({ children }) {
  return (
    <div className={cx(`teacher-page-wrapper`)}>
      <Sidebar />
      <div className={cx(`teacher-page-container`)}>
        <Topbar />
        <div className={cx(`teacher-page-main`)}>{children}</div>
      </div>
    </div>
  );
}

TeacherPageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TeacherPageLayout;
