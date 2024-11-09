import classNames from "classnames/bind";
import styles from "./DomainQuestionView.module.scss";
const cx = classNames.bind(styles);

function SkillDropdown({ onClick, skills }) {
  return (
    <div className={cx("select-skill-dropdown-container")}>
      {skills?.map((skill) => (
        <div
          className={cx("skill-select-container")}
          key={skill.id}
          onClick={() => onClick(skill)}
        >
          <i className={cx("fa-light fa-layer-group", "skil-icon")}></i>
          <div className={cx("skill-text")}>{skill.content}</div>
        </div>
      ))}
    </div>
  );
}

export default SkillDropdown;
