import classNames from "classnames/bind";
import UnitArea from "~/components/Student/LearningPart/LearningPartContent/UnitArea";
import styles from "./LearningPartContent.module.scss";
const cx = classNames.bind(styles);

function LearningPartContent({ learningContent, activeUnit, sectionId }) {
  return (
    <div className={cx("learning-part-content-container")}>
      <div className={cx("content-header")}>
        <div className={cx("content-title")}>{activeUnit?.unitTitle}</div>
      </div>
      <div className={cx("content-main")}>
        <div className={cx("content-about-unit")}>
          <div className={cx("about-unit-title")}>About this unit</div>
          <div className={cx("about-unit-desc")}>{activeUnit?.description}</div>
        </div>
        {activeUnit?.unitAreas.map((unitArea) => (
          <UnitArea
            key={unitArea.unitAreaId}
            unitArea={unitArea}
            learningContent={learningContent}
            activeUnit={activeUnit}
            sectionId={sectionId}
          />
        ))}
      </div>
    </div>
  );
}

export default LearningPartContent;
