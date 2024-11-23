import classNames from "classnames/bind";
import styles from "./LearningPartDetailContent.module.scss";
import LearningPartDetailContentMath from "./LearningPartDetailContentMath/LearningPartDetailContentMath";
import LearningPartDetailContentRW from "./LearningPartDetailContentRW/LearningPartDetailContentRW";
const cx = classNames.bind(styles);

function LearningPartDetailContent({ lesson, fetchUnitArea }) {
  return (
    <div className={cx("learning-part-detail-content-wrapper")}>
      {lesson?.type === "Text" ? (
        <LearningPartDetailContentRW lesson={lesson} fetchUnitArea={fetchUnitArea} />
      ) : (
        <LearningPartDetailContentMath lesson={lesson} fetchUnitArea={fetchUnitArea} />
      )}
    </div>
  );
}

export default LearningPartDetailContent;
