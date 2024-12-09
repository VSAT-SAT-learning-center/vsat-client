import classNames from "classnames/bind";
import styles from "./SkillDropdown.module.scss";
const cx = classNames.bind(styles);

function SkillDropdown({ skills, skillId, setSkill, setShowSkill, setSkillId }) {
  const handleChooseSkill = (skill) => {
    setSkill(skill.content)
    setShowSkill(false)
    setSkillId(skill.id)
  }
  return (
    <div className={cx("dropdowm-container")}>
      {skills?.map((skill) => (
        <div className={cx("dropdown-item", { active: skillId === skill?.id })} key={skill?.id} onClick={() => handleChooseSkill(skill)}>{skill?.content}</div>
      ))}
    </div>
  )
}

export default SkillDropdown
