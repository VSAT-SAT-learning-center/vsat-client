import classNames from "classnames/bind";
import styles from "./LearningPartDetailContent.module.scss";
const cx = classNames.bind(styles);

function LearningPartDetailContent() {
  return (
    <div className={cx("learning-part-detail-content-wrapper")}>
      <div className={cx("learning-part-detail-content-container")}></div>
    </div>
  )
}

export default LearningPartDetailContent
