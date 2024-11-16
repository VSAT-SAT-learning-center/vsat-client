import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import ExamImg from "~/assets/images/content/exam.png";
import { formatDate } from "~/utils/formatDate";
import styles from "./TrialExamItem.module.scss";

const cx = classNames.bind(styles);

function TrialExamItem({ exam }) {
  const navigate = useNavigate();
  
  const handleTakeExam = (examId) => {
    navigate(`/trial-exam/${examId}`);
  };

  // Get current date in the same format as attemptdatetime
  const currentDate = new Date().toISOString().split("T")[0];
  const examDate = new Date(exam.attemptdatetime).toISOString().split("T")[0];
  const isExamOpen = examDate === currentDate;
  const status = isExamOpen ? "Open" : "Close";

  return (
    <div className={cx("student-exam-item-container")}>
      <div className={cx("exam-item-header")}>
        <div className={cx("exam-icon")}>
          <img src={ExamImg} alt="exam-img" className={cx("exam-img")} />
        </div>
        <div className={cx("exam-text-infor")}>
          <div className={cx("exam-name-type")}>Final exam </div>
        </div>
      </div>
      <div className={cx("exam-item-content")}>
        <div className={cx("exam-main-item")}>
          <div className={cx("exam-main-icon")}>
            <i className={cx("fa-sharp fa-regular fa-file-lines")}></i>
          </div>
          <div className={cx("exam-main-title")}>Question:</div>
          <div className={cx("exam-main-text")}>{exam.exam.totalNumberOfQuestions} questions</div>
        </div>
        <div className={cx("exam-main-item")}>
          <div className={cx("exam-main-icon")}>
            <i className={cx("fa-regular fa-clock")}></i>
          </div>
          <div className={cx("exam-main-title")}>Duration:</div>
          <div className={cx("exam-main-text")}>{exam.exam.totalTime} mins</div>
        </div>
        <div className={cx("exam-main-item")}>
          <div className={cx("exam-main-icon")}>
            <i className={cx("fa-regular fa-calendar-alt")}></i>
          </div>
          <div className={cx("exam-main-title")}>Exam Date:</div>
          <div className={cx("exam-main-text")}>{formatDate(exam.attemptdatetime)}</div>
        </div>
        <div className={cx("exam-main-item")}>
          <div className={cx("exam-main-icon")}>
            <i className={cx("fa-regular fa-user")}></i>
          </div>
          <div className={cx("exam-main-title")}>Status:</div>
          <div className={cx("exam-main-text")}>{status}</div>
        </div>
      </div>
      <div className={cx("exam-item-footer")}>
        <div className={cx("exam-create")}>
          <div className={cx("exam-create-title")}>
            Created At: {formatDate(exam.createdat)}
          </div>
        </div>
        {isExamOpen && (
          <button
            className={cx("exam-action")}
            onClick={() => handleTakeExam(exam.exam.id)}
          >
            <i className={cx("fa-regular fa-pen-to-square", "action-icon")}></i>
            <span className={cx("action-text")}>Take Exam</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default TrialExamItem;
