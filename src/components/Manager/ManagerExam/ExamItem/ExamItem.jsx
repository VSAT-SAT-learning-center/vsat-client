import classNames from "classnames/bind";
import { formatDate } from "~/utils/formatDate";
import styles from "./ExamItem.module.scss";
const cx = classNames.bind(styles);

function ExamItem({ exam, index, setExamCensorData, setIsShowExamCensorView}) {
  const handleViewExamDetail = () => {
    setExamCensorData(exam)
    setIsShowExamCensorView(true)
  }
  return (
    <div className={cx("exam-create-item-container")}>
      <div className={cx("exam-create-item-header")}>
        <div className={cx("header-infor")}>
          <div className={cx("number")}>{index}</div>
          <div className={cx("exam-title")}>{exam?.title}</div>
        </div>
        <div className={cx("header-action")}>
          <div
            className={cx(
              "exam-status",
              exam?.status === "Approved"
                ? "approved-status"
                : exam?.status === "Pending"
                  ? "pending-status"
                  : "rejected-status"
            )}
          >
            {exam?.status}
          </div>
          <button
            className={cx("view-detail-btn")}
            onClick={handleViewExamDetail}
          >
            <i className={cx("fa-regular fa-arrow-up-right-from-square")}></i>
          </button>
        </div>
      </div>
      <div className={cx("exam-create-item-content")}>
        <div className={cx("exam-item-infor-type")}>
          <div className={cx("item-icon")}>
            <i className="fa-sharp fa-regular fa-file-lines"></i>
          </div>
          <div className={cx("type-title")}>Exam structure:</div>
          <div className={cx("type-text")}>{exam?.description}</div>
        </div>
        <div className={cx("exam-item-infor-type")}>
          <div className={cx("item-icon")}>
            <i className="fa-sharp fa-regular fa-file-lines"></i>
          </div>
          <div className={cx("type-title")}>Exam type:</div>
          <div className={cx("type-text")}>{exam?.examType?.name}</div>
        </div>
        <div className={cx("exam-item-infor-type")}>
          <div className={cx("item-icon")}>
            <i className="fa-regular fa-clock"></i>
          </div>
          <div className={cx("type-title")}>Duration:</div>
          <div className={cx("type-text")}>{exam?.totalTime} minutes</div>
        </div>
        <div className={cx("exam-item-infor-type")}>
          <div className={cx("item-icon")}>
            <i className="fa-sharp fa-regular fa-list"></i>
          </div>
          <div className={cx("type-title")}>Question: </div>
          <div className={cx("type-text")}>{exam?.totalNumberOfQuestions} questions</div>
        </div>
        <div className={cx("exam-item-infor-type")}>
          <div className={cx("item-icon")}>
            <i className="fa-sharp fa-regular fa-timer"></i>
          </div>
          <div className={cx("type-title")}>Created at:</div>
          <div className={cx("type-text")}>{formatDate(exam?.createdat)}</div>
        </div>
      </div>
    </div>
  );
}

export default ExamItem;
