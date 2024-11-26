import { Badge, Calendar } from "antd";
import classNames from "classnames/bind";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import LearningLayout from "~/layouts/Student/LearningLayout/LearningPageLayout";
import apiClient from "~/services/apiService";
import styles from "./ExamSchedule.module.scss";

const cx = classNames.bind(styles);

function ExamSchedule() {
  const [examAttempts, setExamAttempts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExamAttempts = async () => {
      try {
        const response = await apiClient.get(`/exam-attempts/getExamAttemptByStudyProfile`);
        setExamAttempts(response.data.data);
      } catch (error) {
        console.error("Error fetching exam attempts:", error);
      }
    };

    fetchExamAttempts();
  }, []);

  const getListData = (value) => {
    const currentDate = new Date();
    const listData = examAttempts
      .filter((attempt) => {
        const attemptDate = new Date(attempt.attemptdatetime);
        return (
          attemptDate.getFullYear() === value.year() &&
          attemptDate.getMonth() === value.month() &&
          attemptDate.getDate() === value.date()
        );
      })
      .map((attempt) => {
        const attemptDate = new Date(attempt.attemptdatetime);

        let type = "success";
        if (attemptDate.getFullYear() === currentDate.getFullYear() &&
          attemptDate.getMonth() === currentDate.getMonth() &&
          attemptDate.getDate() < currentDate.getDate()) {
          type = "error";
        } else if (attemptDate.getFullYear() === currentDate.getFullYear() &&
          attemptDate.getMonth() === currentDate.getMonth() &&
          attemptDate.getDate() > currentDate.getDate()) {
          type = "warning";
        } else if (attemptDate.getFullYear() === currentDate.getFullYear() &&
          attemptDate.getMonth() === currentDate.getMonth() &&
          attemptDate.getDate() === currentDate.getDate() || attempt.status === true) {
          type = "success";
        }

        return {
          type,
          content: attempt.exam.examTitle,
          duration: "Duration: " + attempt.exam.totalTime + " mins",
          examId: attempt.exam.id,
          status: attempt.status
        };
      });

    return listData || [];
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type} text={item.content} />
            <div>{item.duration}</div>
          </li>
        ))}
      </ul>
    );
  };

  const handleSelectDate = (value) => {
    const listData = getListData(value);
    if (listData.length === 0) return;

    const firstExam = listData[0];
    const currentDate = new Date();
    const attemptDate = new Date(value.year(), value.month(), value.date());

    const isToday =
      attemptDate.getFullYear() === currentDate.getFullYear() &&
      attemptDate.getMonth() === currentDate.getMonth() &&
      attemptDate.getDate() === currentDate.getDate();

    const isPast =
      attemptDate.getFullYear() === currentDate.getFullYear() &&
      attemptDate.getMonth() === currentDate.getMonth() &&
      attemptDate.getDate() < currentDate.getDate();

    const isFuture =
      attemptDate.getFullYear() === currentDate.getFullYear() &&
      attemptDate.getMonth() === currentDate.getMonth() &&
      attemptDate.getDate() > currentDate.getDate();

    if (isPast) {
      toast.info("This exam has already ended. Redirecting to exam history.", {
        autoClose: 1500,
      });
      navigate("/exam-history");
      return;
    }

    if (isToday) {
      navigate(`/take-exam/${firstExam.examId}`);
      return;
    }

    if (isToday && firstExam.status === true) {
      toast.success("This exam is already taken.", {
        autoClose: 1500,
      });
      return;
    }

    if (isFuture) {
      toast.info("This exam is scheduled for a future date. Please wait until the exam begins.", {
        autoClose: 1500,
      });
      return;
    }

    // Default fallback
    toast.warning("Unexpected condition. Please try again.", {
      autoClose: 1500,
    });
  };


  const currentDate = moment();
  const validRange = [currentDate.clone().subtract(1, "month"), currentDate.clone().add(1, "month")];

  return (
    <LearningLayout>
      <div className={cx("exam-schedule-wrapper")}>
        <div className={cx("exam-schedule-container")}>
          <div className={cx("exam-schedule-header")}>
            <div className={cx("exam-schedule-text")}>Exam Schedule</div>
          </div>
          <div className={cx("exam-schedule-content")}>
            <Calendar
              dateCellRender={dateCellRender}
              validRange={validRange}
              onSelect={handleSelectDate}
            />
          </div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </LearningLayout>
  );
}

export default ExamSchedule;
