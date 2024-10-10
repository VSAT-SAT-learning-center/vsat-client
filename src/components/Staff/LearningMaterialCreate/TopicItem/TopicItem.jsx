import classNames from "classnames/bind";
import styles from "./TopicItem.module.scss";
const cx = classNames.bind(styles);
function TopicItem() {
  return (
    <div className={cx("topic-item-container")}>
      <div className={cx("topic-drag-handle")}>
        <div className={cx("handle-icon")}>
          <i
            className={cx("fa-sharp fa-solid fa-grip-dots-vertical", "icon")}
          ></i>
        </div>
      </div>
      <div className={cx("topic-content")}>
        <div className={cx("topic-title-content")}>
          <div className={cx("topic-title-text")}>Graphs of linear equations and functions: foundations</div>
          <div className={cx("topic-title-config")}>
            <div className={cx("topic-title-option")}>
              <i
                className={cx("fa-solid fa-ellipsis-vertical", "option-icon")}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopicItem;
