import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import styles from "./UnitArea.module.scss";
import UnitAreaLearnItem from "./UnitAreaLearnItem";
const cx = classNames.bind(styles);
function UnitArea({ learningContent, unitArea, activeUnit, sectionId }) {
  const navigate = useNavigate()
  const handleClickUnitArea = (lessonId) => {
    const formattedTitle = activeUnit.unitTitle
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    navigate(`/learning/${learningContent}/${sectionId}:${formattedTitle}/${unitArea.unitAreaProgressId}/${lessonId}`);
  }
  return (
    <div className={cx("content-unit-area")}>
      <div className={cx("unit-area-title")} onClick={() => handleClickUnitArea(unitArea?.lessons[0].lessonId)}>
        <span className={cx("title")}>{unitArea?.unitAreaTitle}</span>
      </div>
      <div className={cx("unit-area-main")}>
        <div className={cx("unit-area-learn")}>
          <div className={cx("learn-title")}>Learn</div>
          <div className={cx("learn-list")}>
            {unitArea?.lessons.map((lesson) => (
              <UnitAreaLearnItem
                key={lesson.lessonId}
                lesson={lesson}
                learningContent={learningContent}
                activeUnit={activeUnit}
                unitArea={unitArea}
                sectionId={sectionId}
              />
            ))}
          </div>
        </div>
        {/* <div className={cx("unit-area-practice")}>
          <div className={cx("practice-title")}>Practice</div>
        </div> */}
      </div>
    </div>
  );
}

export default UnitArea;
