import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "~/contexts/AuthContext";
import { formatDate } from "~/utils/formatDate";
import styles from "./LearningItem.module.scss";

const cx = classNames.bind(styles);

function LearningItem({ item, index, setShowLearningProfileView, setProfileSelected }) {
  const { user } = useContext(AuthContext);

  const handleClickItem = () => {
    setProfileSelected(item)
    setShowLearningProfileView(true)
  };

  return (
    <div
      className={cx("learning-item")}
      onClick={handleClickItem}
    >
      <div className={cx("item-header")}>
        <div className={cx("header-infor")}>
          <div className={cx("header-image")}>
            <img
              src={user?.profilepictureurl}
              alt="learning-material-img"
              className={cx("image")}
            />
          </div>
          <div className={cx("header-title")}>Study Profile {index}</div>
        </div>
        <div
          className={cx(
            "header-status",
            item.status === "Completed"
              ? "approved"
              : item.status === "Inactive"
                ? "rejected"
                : ""
          )}
        >
          {item.status}
        </div>
      </div>
      <div className={cx("item-content")}>
        <div className={cx("content-infor")}>
          <div className={cx("infor-item")}>
            <i className={cx("fa-regular fa-bullseye-arrow")}></i>
            <span className={cx("text")}>Target Reading and Writing:</span>
            <span className={cx("number")}>{item?.targetscoreRW}</span>
          </div>
          <div className={cx("infor-item")}>
            <i className={cx("fa-regular fa-bullseye-arrow")}></i>
            <span className={cx("text")}>Target Math:</span>
            <span className={cx("number")}>{item?.targetscoreMath}</span>
          </div>
        </div>
        <div className={cx("content-date")}>
          <div className={cx("date-item")}>
            Start Date: {formatDate(item.startdate)}
          </div>
          <div className={cx("date-item")}>
            End Date: {formatDate(item.enddate)}
          </div>
        </div>
      </div>
    </div>
  );
}

LearningItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default LearningItem;
