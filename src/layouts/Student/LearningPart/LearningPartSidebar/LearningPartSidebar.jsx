import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LMImg from "~/assets/images/content/lm-01.png";
import PartUnitItem from "~/components/Student/LearningPart/LearningPartSidebar/PartUnitItem";
import styles from "./LearningPartSidebar.module.scss";
const cx = classNames.bind(styles);

function LearningPartSidebar({ learningContent }) {
  const content =
    learningContent === "sat-reading-and-writing"
      ? "SAT Reading and Writing"
      : "SAT Math";
  return (
    <div className={cx("learning-part-sidebar-container")}>
      <Link to="/learning/sat-reading-and-writing" className={cx("learning-part-introduction", "introduction-active")}>
        <img
          src={LMImg}
          alt="introduction-img"
          className={cx("introduction-img")}
        />
        <div className={cx("introduction-infor")}>
          <div className={cx("infor-title")}>Digital {content} </div>
          <div className={cx("infor-details")}>
            <span className={cx("infor-units")}>11 UNITS</span>
            {" - "}
            <span className={cx("infor-skills")}>41 SKILLS</span>
          </div>
        </div>
      </Link>
      <div className={cx("learning-part-unit-list")}>
        <PartUnitItem
          item="About the digital SAT"
          learningContent={learningContent}
        />
      </div>
    </div>
  );
}

LearningPartSidebar.propTypes = {
  learningContent: PropTypes.string.isRequired,
};

export default LearningPartSidebar;
