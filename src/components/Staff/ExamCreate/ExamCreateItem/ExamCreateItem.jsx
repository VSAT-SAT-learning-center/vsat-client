import classNames from "classnames/bind";
import { formatDate } from "~/utils/formatDate";
import styles from "./ExamCreateItem.module.scss";
const cx = classNames.bind(styles);

function ExamCreateItem({ setIsShowCreateExamView }) {
  return (
    <div className={cx("exam-create-item-container")}>
      <div className={cx("exam-create-item-header")}>
        <div className={cx("header-infor")}>
          <div className={cx("number")}>1</div>
          <div className={cx("exam-title")}>Exam 1</div>
        </div>
        <button
          className={cx("view-detail-btn")}
          onClick={() => setIsShowCreateExamView(true)}
        >
          <i className={cx("fa-regular fa-arrow-up-right-from-square")}></i>
        </button>
      </div>
      <div className={cx("exam-create-item-content")}>
        <div className={cx("exam-item-infor-type")}>
          <div className={cx("item-icon")}>
            <i className="fa-sharp fa-regular fa-file-lines"></i>
          </div>
          <div className={cx("type-title")}>Exam structure:</div>
          <div className={cx("type-text")}>Exam structure 1</div>
        </div>
        <div className={cx("exam-item-infor-type")}>
          <div className={cx("item-icon")}>
            <i className="fa-sharp fa-regular fa-file-lines"></i>
          </div>
          <div className={cx("type-title")}>Exam type:</div>
          <div className={cx("type-text")}>Pratical exam</div>
        </div>
        <div className={cx("exam-item-infor-type")}>
          <div className={cx("item-icon")}>
            <i className="fa-regular fa-clock"></i>
          </div>
          <div className={cx("type-title")}>Duration:</div>
          <div className={cx("type-text")}>134 minutes</div>
        </div>
        <div className={cx("exam-item-infor-type")}>
          <div className={cx("item-icon")}>
            <i className="fa-sharp fa-regular fa-list"></i>
          </div>
          <div className={cx("type-title")}>Question: </div>
          <div className={cx("type-text")}>98 questions</div>
        </div>
        <div className={cx("exam-item-infor-type")}>
          <div className={cx("item-icon")}>
            <i className="fa-sharp fa-regular fa-timer"></i>
          </div>
          <div className={cx("type-title")}>Created at:</div>
          <div className={cx("type-text")}>{formatDate(Date.now())}</div>
        </div>
      </div>
    </div>
  );
}

export default ExamCreateItem;
