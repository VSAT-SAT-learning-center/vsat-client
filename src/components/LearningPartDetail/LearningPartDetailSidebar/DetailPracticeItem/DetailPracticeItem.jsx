import classNames from "classnames/bind";
import styles from "./DetailPracticeItem.module.scss";
const cx = classNames.bind(styles);

function DetailPracticeItem() {
  return (
    <div className={cx("detail-content-practice-item")}>
      <div className={cx("pratice-item-icon")}>
        <div className={cx("practice-item-sub-icon")}></div>
      </div>
      <div className={cx("practice-item-title")}>
        <div className={cx("title")}>
          Command of textual evidence: foundations
        </div>
        <div className={cx("sub-title")}>Familiar</div>
      </div>
    </div>
  );
}

export default DetailPracticeItem;
