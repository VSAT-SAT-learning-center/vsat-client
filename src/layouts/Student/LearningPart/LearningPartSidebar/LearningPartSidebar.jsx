import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import LMImg from "~/assets/images/content/lm-01.png";
import PartUnitItem from "~/components/Student/LearningPart/LearningPartSidebar/PartUnitItem";
import styles from "./LearningPartSidebar.module.scss";
const cx = classNames.bind(styles);

function LearningPartSidebar({ learningContent, units, activeUnit, setActiveUnit }) {
  const content =
    learningContent === "sat-reading-and-writing"
      ? "SAT Reading and Writing"
      : "SAT Math";
  return (
    <div className={cx("learning-part-sidebar-container")}>
      <Link to="#" className={cx("learning-part-introduction")}>
        <img
          src={LMImg}
          alt="introduction-img"
          className={cx("introduction-img")}
        />
        <div className={cx("introduction-infor")}>
          <div className={cx("infor-title")}>Digital {content} </div>
          <div className={cx("infor-details")}>
            <span className={cx("infor-units")}>{units?.totalUnitAreaCount} TOPICS</span>
            {" - "}
            <span className={cx("infor-skills")}>{units?.totalLessonCount} LESSONS</span>
          </div>
        </div>
      </Link>
      <div className={cx("learning-part-unit-list")}>
        {units.units?.map((unit, index) => (
          <PartUnitItem
            key={unit.unitId}
            index={index + 1}
            unit={unit}
            isActive={activeUnit?.unitId === unit.unitId}
            onClick={() => setActiveUnit(unit)}
          />
        ))}
      </div>
    </div>
  );
}

export default LearningPartSidebar;
