import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./LearningMaterialCreateFooter.module.scss";
const cx = classNames.bind(styles);

function LearningMaterialCreateFooter() {
  return (
    <div className={cx("learning-material-create-footer-wrapper")}>
      <div className={cx("learning-material-create-footer-container")}>
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

export default LearningMaterialCreateFooter;
