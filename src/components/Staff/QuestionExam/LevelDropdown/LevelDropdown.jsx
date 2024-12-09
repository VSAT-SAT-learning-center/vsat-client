import classNames from "classnames/bind";
import styles from "./LevelDropdown.module.scss";
const cx = classNames.bind(styles);

function LevelDropdown({ levels, levelId, setLevel, setShowLevel, setLevelId }) {
  const handleChooseLevel = (level) => {
    setLevel(level.name)
    setShowLevel(false)
    setLevelId(level.id)
  }
  return (
    <div className={cx("dropdowm-container")}>
      {levels?.map((level) => (
        <div className={cx("dropdown-item", { active: levelId === level?.id })} key={level?.id} onClick={() => handleChooseLevel(level)}>{level?.name}</div>
      ))}
    </div>
  )
}

export default LevelDropdown
