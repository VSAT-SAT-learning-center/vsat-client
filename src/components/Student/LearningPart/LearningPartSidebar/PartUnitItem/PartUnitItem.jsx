import classNames from "classnames/bind";
import styles from "./PartUnitItem.module.scss";
const cx = classNames.bind(styles);

function PartUnitItem({ index, unit, isActive, onClick }) {
  return (
    <div className={cx("learning-part-unit-item", { "unit-active": isActive })} onClick={onClick}>
      <div className={cx("unit-title")}>UNIT {index}</div>
      <div className={cx("unit-desc")}>{unit.unitTitle}</div>
    </div>
  );
}

export default PartUnitItem;
