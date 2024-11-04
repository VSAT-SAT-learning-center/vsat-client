import classNames from "classnames/bind";
import PropTypes from "prop-types";
import RWImg from "~/assets/images/content/r&w.png";
import { formatDate } from "~/utils/formatDate";
import styles from "./LearningItem.module.scss";

const cx = classNames.bind(styles);

function LearningMaterialItem({ item, setIsShowCensorView, setCensorViewUnitId }) {
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
        <div className={cx("header-title")}>{item?.title}</div>
      </div>
      <div className={cx("item-description")}>{item?.description}</div>
      <div className={cx("item-content")}>
        <div className={cx("content-config")}>
          <div className={cx("config-level")}>
            <i className={cx("fa-sharp fa-light fa-layer-group", "level-icon")}></i>
            <span className={cx("level-text")}>{item?.level.name}</span>
          </div>
          <div className={cx("config-detail")}>
            <div className={cx("detail-item")}>
              <i className={cx("fa-light fa-book-open", "detail-icon")}></i>
              <span className={cx("detail-text")}>{item?.unitAreaCount} Topics</span>
            </div>
            <div className={cx("detail-item")}>
              <i className={cx("fa-light fa-file-pen", "detail-icon")}></i>
              <span className={cx("detail-text")}>{item?.lessonCount} Lessons</span>
            </div>
          </div>
        </div>
        <div className={cx("content-footer")}>
          <div className={cx("footer-date")}>Created at: {formatDate(item?.createdat)}</div>
          <div className={cx(
            "footer-status",
            item?.status === "Pending" ? "pending" :
            item?.status === "Approved" ? "approved" :
            "rejected"
          )}>
            {item?.status}
          </div>
        </div>
      </div>
    </div>
  );
}

LearningMaterialItem.propTypes = {
  item: PropTypes.object,
  setIsShowCensorView: PropTypes.func,
  setCensorViewUnitId: PropTypes.func,
};

export default LearningMaterialItem;
