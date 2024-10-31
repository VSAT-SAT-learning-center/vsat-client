import classNames from "classnames/bind";
import { formatDate } from "~/utils/formatDate";
import styles from "./ExamScoreItem.module.scss";

const cx = classNames.bind(styles);

function ExamScoreItem({ examScore }) {
  return (
    <div className={cx("exam-score-item-container")}>
      <div className={cx("exam-score-item-header")}>
        <div className={cx("number")}>1</div>
        <div className={cx("exam-title")}>{examScore?.title}</div>
      </div>
      <div className={cx("exam-score-item-content")}>
        <div className={cx("exam-item-infor-type")}>
          <div className={cx("item-icon")}>
            <i className="fa-sharp fa-regular fa-file-pen"></i>
          </div>
          <div className={cx("type-title")}>Exam score type:</div>
          <div className={cx("type-text")}>{examScore?.type}</div>
        </div>
        <div className={cx("exam-item-infor-type")}>
          <div className={cx("item-icon")}>
            <i className="fa-sharp fa-regular fa-timer"></i>
          </div>
          <div className={cx("type-title")}>Created at:</div>
          <div className={cx("type-text")}>
            {formatDate(examScore?.createdat)}
          </div>
        </div>
        <div className={cx("view-detail")}>
          <button className={cx("view-deail-btn")}>
            <span className={cx("view-detail-text")}>View detail</span>
            <i className={cx("fa-regular fa-arrow-up-right-from-square")}></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExamScoreItem;
