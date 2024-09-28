import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./UnitArea.module.scss";
const cx = classNames.bind(styles);
function UnitAreaLearnItem({ item }) {
  return (
    <div className={cx("learn-item")}>
      <div className={cx("learn-item-icon")}>
        <i className={cx("fa-sharp fa-regular fa-file", "icon")}></i>
      </div>
      <div className={cx("learn-item-title")}>{item}</div>
    </div>
  );
}

UnitAreaLearnItem.propTypes = {
  item: PropTypes.string.isRequired,
};

export default UnitAreaLearnItem;
