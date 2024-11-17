import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import RWImg from "~/assets/images/content/r&w.png";
import { formatDate } from "~/utils/formatDate";
import styles from "./LearningItem.module.scss";

const cx = classNames.bind(styles);

function LearningItem({ item}) {
  const navigate = useNavigate();

  const handleClickItem = () => {
    if (item.status === "True") {
      navigate(`/learning/part/${item.id}`);
    }
  };

  return (
    <div
      className={cx("learning-item", { "disabled-item": item.status !== "True" })}
      onClick={item.status === "True" ? () => handleClickItem() : undefined}
      style={{ cursor: item.status === "True" ? "pointer" : "not-allowed" }}
    >
      <div className={cx("item-header")}>
        <div className={cx("header-image")}>
          <img
            src={RWImg}
            alt="learning-material-img"
            className={cx("image")}
          />
        </div>
        <div className={cx("header-title")}>Study Profile</div>
      </div>
      <div className={cx("item-description")}>
        Math Target Score: {item.targetscoreMath}
      </div>
      <div className={cx("item-description")}>
        Reading & Writing Target Score: {item.targetscoreRW}
      </div>
      <div className={cx("item-content")}>
        <div className={cx("content-footer")}>
          <div className={cx("footer-date")}>
            Start Date: {formatDate(item.startdate)}
          </div>
          <div className={cx("footer-date")}>
            End Date: {formatDate(item.enddate)}
          </div>
          <div
            className={cx(
              "footer-status",
              item.status === "True" ? "approved" : "rejected"
            )}
          >
            {item.status === "True" ? "Active" : "Inactive"}
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
