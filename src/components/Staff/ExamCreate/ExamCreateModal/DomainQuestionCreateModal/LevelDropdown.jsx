import classNames from "classnames/bind";
import styles from "./DomainQuestionCreateModal.module.scss";
const cx = classNames.bind(styles);

function LevelDropdown({ onClick, levels }) {
  return (
    <div className={cx("select-level-dropdown-container")}>
      {levels?.map((level) => (
        <div
          className={cx("level-select-container")}
          key={level.id}
          onClick={() => onClick(level)}
        >
          <i className={cx("fa-light fa-layer-group", "level-icon")}></i>
          <div className={cx("level-text")}>{level.name}</div>
        </div>
      ))}
    </div>
  );
}

export default LevelDropdown;
