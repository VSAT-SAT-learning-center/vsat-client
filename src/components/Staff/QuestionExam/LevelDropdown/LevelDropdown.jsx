import classNames from "classnames/bind";
import styles from "./LevelDropdown.module.scss";
const cx = classNames.bind(styles);

function LevelDropdown({ levels, setLevel, setShowLevel }) {
  const handleChooseLevel = (level) => {
    setLevel(level.name)
    setShowLevel(false)
  }
  return (
    <div className={cx("dropdowm-container")}>
      {levels?.map((level) => (
        <div className={cx("dropdown-item")} key={level?.id} onClick={() => handleChooseLevel(level)}>{level?.name}</div>
      ))}
    </div>
  )
}

export default LevelDropdown
