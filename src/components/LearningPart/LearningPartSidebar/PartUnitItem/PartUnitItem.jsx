import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "./PartUnitItem.module.scss";
const cx = classNames.bind(styles);

function PartUnitItem({ item, learningContent }) {
  const navigate = useNavigate();
  const hanldeClickUnitItem = () => {
    navigate(`/learning/${learningContent}/1:foundations-information-and-ideas/1`);
  }
  return (
    <div className={cx("learning-part-unit-item")} onClick={hanldeClickUnitItem}>
      <div className={cx("unit-title")}>UNIT 1</div>
      <div className={cx("unit-desc")}>{item}</div>
    </div>
  );
}

PartUnitItem.propTypes = {
  item: PropTypes.string.isRequired,
  learningContent: PropTypes.string.isRequired,
};


export default PartUnitItem;
