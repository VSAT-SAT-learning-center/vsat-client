import { DatePicker, Input } from "antd";
import classNames from "classnames/bind";
import { useState } from "react";
import { toast } from "react-toastify";
import apiClient from "~/services/apiService";
import styles from "./UpdateExamFinal.module.scss";
const cx = classNames.bind(styles);
function UpdateExamFinal({ profile, setShowUpdateExamFinal, fetchExams }) {
  const [examDate, setExamDate] = useState(null);
  const [mathScore, setMathScore] = useState("");
  const [readingWritingScore, setReadingWritingScore] = useState("");
  const handleDateChange = (date) => {
    setExamDate(date);
  };

  const handleSubmit = async () => {
    const payload = {
      scoreRW: parseInt(readingWritingScore, 10),
      scorMath: parseInt(mathScore, 10),
      studyProfileId: profile?.id,
      attemptdatetime: examDate.format("MM/DD/YYYY"),
    };
    try {
      await apiClient.post("exam-attempts/createExamAttemptCertified/certify", payload)
      await fetchExams();
      setShowUpdateExamFinal(false)
      toast.success("Update SAT Exam Tracker successfully!", {
        autoClose: 1500
      })
    } catch (error) {
      console.error("Error while update exam tracker:", error)
      toast.error("Update SAT Exam Tracker failed!", {
        autoClose: 1500
      })
    }
  };

  const handleReset = () => {
    setExamDate(null);
    setMathScore("");
    setReadingWritingScore("");
  };

  const isSubmitDisabled = !examDate && !mathScore && !readingWritingScore;

  return (
    <div className={cx("update-exam-final-wrapper")}>
      <div className={cx("update-exam-final-container")}>
        <div className={cx("update-exam-final-header")}>
          <div
            className={cx("profile-close")}
            onClick={() => setShowUpdateExamFinal(false)}
          >
            <i className={cx("fa-regular fa-arrow-left")}></i>
          </div>
          <div className={cx("profile-title")}>SAT Exam Tracker</div>
          <div className={cx("profile-empty")}></div>
        </div>
        <div className={cx("update-exam-final-content")}>
          <div className={cx("update-exam-item")}>
            <div className={cx("item-title")}>Exam Date</div>
            <DatePicker
              className={cx("date-picker")}
              value={examDate}
              onChange={handleDateChange}
              format="DD/MM/YYYY"
            />
          </div>
          <div className={cx("update-exam-item")}>
            <div className={cx("item-title")}>Math Score (200-800)</div>
            <Input
              type="number"
              value={mathScore}
              onChange={(e) => setMathScore(e.target.value)}
              min="200"
              max="800"
              required
              className={cx("item-input")}
            />
          </div>
          <div className={cx("update-exam-item")}>
            <div className={cx("item-title")}>
              Reading & Writing Score (200-800)
            </div>
            <Input
              type="number"
              value={readingWritingScore}
              onChange={(e) => setReadingWritingScore(e.target.value)}
              min="200"
              max="800"
              required
              className={cx("item-input")}
            />
          </div>
        </div>
        <div className={cx("update-exam-final-footer")}>
          <button className={cx("reset-btn")} onClick={handleReset}>
            Reset
          </button>
          <button
            className={cx("update-btn", { disabled: isSubmitDisabled })}
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
          >
            Submit Exam
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateExamFinal;
