import classNames from "classnames/bind";
import PropTypes from "prop-types";
import RWImg from "~/assets/images/content/r&w.png";
import { formatDate } from "~/utils/formatDate";
import styles from "./LearningItem.module.scss";

const cx = classNames.bind(styles);

function LearningItem({ item, setIsShowCensorView, setCensorViewUnitId }) {
  const handleClickItem = (itemId) => {
    setIsShowCensorView(true);
    setCensorViewUnitId(itemId);
  };

  return (
    <div className={cx("learning-item")} onClick={() => handleClickItem(item.id)}>
      <div className={cx("item-header")}>
        <div className={cx("header-image")}>
          <img src={RWImg} alt="learning-material-img" className={cx("image")} />
        </div>
        <div className={cx("header-title")}>Study Profile</div>
      </div>
      <div className={cx("item-description")}>Math Target Score: {item.targetscoreMath}</div>
      <div className={cx("item-description")}>Reading & Writing Target Score: {item.targetscoreRW}</div>
      <div className={cx("item-content")}>
        <div className={cx("content-footer")}>
          <div className={cx("footer-date")}>Start Date: {formatDate(item.startdate)}</div>
          <div className={cx("footer-date")}>End Date: {formatDate(item.enddate)}</div>
          <div className={cx(
            "footer-status",
            item.status === "True" ? "approved" : "rejected"
          )}>
            {item.status === "True" ? "Active" : "Inactive"}
          </div>
        </div>
      </div>
    </div>
  );
}

LearningItem.propTypes = {
  item: PropTypes.object.isRequired,
  setIsShowCensorView: PropTypes.func,
  setCensorViewUnitId: PropTypes.func,
};

export default LearningItem;
