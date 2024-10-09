import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./LearningMaterialCreateHeader.module.scss";
const cx = classNames.bind(styles);

function LearningMaterialCreateHeader({ title }) {
  return (
    <div className={cx("learning-material-create-header")}>
      <div className={cx("learning-material-create-breadcrumb")}>
        <Link to="/staff" className={cx("home-breadcrumb")}>
          Home
        </Link>
        <i className={cx("fa-regular fa-chevron-right", "breadcrumb-icon")}></i>
        <span className={cx("active-breadcrumb")}>{title}</span>
      </div>
      <div className={cx("learning-material-create-options")}>
        <button className={cx("save-draf-btn")}>
          <span className={cx("btn-text")}>Save As Draft</span>
        </button>
        <button className={cx("publish-btn", "disabled")}>
          <span className={cx("btn-text")}>Publish Unit</span>
        </button>
      </div>
    </div>
  );
}

LearningMaterialCreateHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default LearningMaterialCreateHeader;
