import classNames from "classnames/bind";
import styles from "./LearningPartDetailContent.module.scss";
import LearningPartDetailContentRW from "./LearningPartDetailContentRW/LearningPartDetailContentRW";
// import LearningPartDetailContentMath from "./LearningPartDetailContentMath/LearningPartDetailContentMath";
const cx = classNames.bind(styles);

function LearningPartDetailContent() {
  return (
    <div className={cx("learning-part-detail-content-wrapper")}>
      <LearningPartDetailContentRW />
      {/* <LearningPartDetailContentMath /> */}
    </div>
  );
}

export default LearningPartDetailContent;
