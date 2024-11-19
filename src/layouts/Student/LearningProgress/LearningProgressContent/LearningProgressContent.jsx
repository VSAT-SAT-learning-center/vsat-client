import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./LearningProgressContent.module.scss";

const cx = classNames.bind(styles);

function LearningProgressContent({ unitProgressData }) {
  return (
    <div className={cx("learning-progress-content-container")}>
      {unitProgressData.length > 0 ? (
        unitProgressData.map((item) => (
          <div key={item.id} className={cx("learning-item")}>
            <div className={cx("item-icon")}>
              <img
                src={item.icon || "https://via.placeholder.com/50"}
                alt={item.title}
              />
            </div>
            <div className={cx("item-content")}>
              <div className={cx("item-header")}>
                <div className={cx("item-title")}>{item.title}</div>
                <div className={cx("item-menu")}>...</div>
              </div>
              <div className={cx("item-progress")}>
                <div
                  className={cx("progress-bar")}
                  style={{ width: `${item.progress || 0}%` }}
                ></div>
              </div>
              <div className={cx("item-studied")}>
                Studied {item.lastStudiedDaysAgo || "0"} days ago
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className={cx("no-data")}>No progress available</div>
      )}
    </div>
  );
}

LearningProgressContent.propTypes = {
  unitProgressData: PropTypes.array.isRequired,
};

export default LearningProgressContent;
