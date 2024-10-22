import classNames from "classnames/bind";
import PropTypes from "prop-types";
import RWImg from "~/assets/images/content/r&w.png";
import { formatDate } from "~/utils/formatDate";
import styles from "./LearningMaterialItem.module.scss";
const cx = classNames.bind(styles);

function LearningMaterialItem({ item, setIsShowCensorView, setCensorViewUnitId }) {
  console.log(item);

  const handleClickItem = (itemId) => {
    setIsShowCensorView(true)
    setCensorViewUnitId(itemId);
  }
  return (
    <div className={cx("learning-material-item")} onClick={() => handleClickItem(item.id)}>
      <div className={cx("learning-material-title")}>
        <div className={cx("title-image")}>
          <img src={RWImg} alt="learning-material-img" className={"lm-img"} />
        </div>
        <div className={cx("title-text")}>{item?.title}</div>
      </div>
      <div className={cx("learning-material-about")}>{item?.description}</div>
      <div className={cx("learning-material-main")}>
        <div className={cx("learning-material-config")}>
          <div className={cx("infor-level")}>
            <i className={cx("fa-sharp fa-light fa-layer-group", "level-icon")}></i>
            <span className={cx("level-text")}>{item?.level.name}</span>
          </div>
          <div className={cx("infor-detail")}>
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
        <div className={cx("learning-material-detail")}>
          <div className={cx("date-create")}>Created at: {formatDate(item?.createdat)}</div>
          <div className={cx("status-detail", { "pending": item?.status === "Pending" })}>
            {item?.status}
          </div>
        </div>
      </div>
    </div>
  )
}

LearningMaterialItem.propTypes = {
  item: PropTypes.object,
  setIsShowCensorView: PropTypes.func,
  setCensorViewUnitId: PropTypes.func,
};

export default LearningMaterialItem
