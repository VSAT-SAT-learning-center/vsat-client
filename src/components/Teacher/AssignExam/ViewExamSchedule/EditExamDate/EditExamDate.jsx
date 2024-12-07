import { Calendar } from "antd";
import classNames from "classnames/bind";
import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "react-toastify";
import apiClient from "~/services/apiService";
import styles from "./EditExamDate.module.scss";
const cx = classNames.bind(styles);

function EditExamDate({ target, setShowEditDate, setShowViewExamSchedule, fetchExamAttempts }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const formatDate = (date) => dayjs(date).format("MM/DD/YYYY");

  const handleUpdate = async () => {
    const dateToLog = selectedDate
      ? formatDate(selectedDate)
      : formatDate(new Date());

    if (!dateToLog) {
      toast.error("Date is invalid or not selected!", {
        autoClose: 1500
      });
      return;
    }
    try {
      const payload = {
        targetLeaningId: target?.id,
        attemptdatetime: dateToLog,
      };
      await apiClient.put("/exam-attempts/updateDateExamAttempt", payload);
      await fetchExamAttempts(dayjs().month(), dayjs().year());
      setShowEditDate(false)
      setShowViewExamSchedule(false)
      toast.success("Exam date updated successfully!", {
        autoClose: 1500
      });
    } catch (error) {
      console.error("Error while update date exam:", error);
      toast.error("Failed to update exam date. Please try again.", {
        autoClose: 1500
      });
    }
  };
  return (
    <div className={cx("edit-exam-date-wrapper")}>
      <div className={cx("edit-exam-date-container")}>
        <div className={cx("edit-exam-date-header")}>
          <div className={cx("exam-date-title")}>Edit Exam Date</div>
        </div>
        <div className={cx("edit-exam-date-content")}>
          <Calendar
            fullscreen={false}
            onSelect={(value) => setSelectedDate(value.toDate())}
          />
        </div>
        <div className={cx("edit-exam-date-footer")}>
          <button
            className={cx("cancel-btn")}
            onClick={() => setShowEditDate(false)}
          >
            Cancel
          </button>
          <button className={cx("edit-btn")} onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditExamDate;
