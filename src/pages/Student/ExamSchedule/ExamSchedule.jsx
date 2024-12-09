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
  const [currentDate, setCurrentDate] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExamAttempts = async () => {
      try {
        const response = await apiClient.get(`/exam-attempts/getExamAttemptByStudyProfile`);
        setExamAttempts(response.data.data.examAttemptArrs);
        setCurrentDate(moment(response.data.data.currentTime));
      } catch (error) {
        console.error("Error fetching exam attempts:", error);
      }
    };

    fetchExamAttempts();
  }, []);

  const getListData = (value) => {
    if (!currentDate) return [];
    const listData = examAttempts
      .filter((attempt) => {
        const attemptDate = moment(attempt.attemptdatetime);
        return (
          attemptDate.year() === value.year() &&
          attemptDate.month() === value.month() &&
          attemptDate.date() === value.date()
        );
      })
      .map((attempt) => {
        const attemptDate = moment(attempt.attemptdatetime);
        let type = "success";
        if (attemptDate.isBefore(currentDate, "day")) {
          type = "error";
        } else if (attemptDate.isAfter(currentDate, "day")) {
          type = "warning";
        } else if (attemptDate.isSame(currentDate, "day")) {
          type = "success";
        }

        return {
          type,
          content: attempt.exam.examTitle,
          duration: `Duration: ${attempt.exam.totalTime} mins`,
          examId: attempt.exam.id,
          status: attempt.status,
          attemptDate: attemptDate,
        };
      });

    return listData || [];
  };



  const handleSelectDate = (value) => {
    if (!currentDate) return;

    const listData = getListData(value);
    if (listData.length === 0) return;

    const firstExam = listData[0];
    const attemptDate = moment(firstExam.attemptDate);

    const isToday = attemptDate.isSame(currentDate, "day");
    const isPast = attemptDate.isBefore(currentDate, "day");
    const isFuture = attemptDate.isAfter(currentDate, "day");

    if (isPast && firstExam.status === true) {
      toast.info("This exam has already ended. Redirecting to exam history.", {
        autoClose: 1500,
      });
      navigate("/exam-history");
      return;
    }

    if (isPast && firstExam.status === false) {
      toast.error("This exam has ended, and you did not attempt it.", {
        autoClose: 1500,
      });
      return;
    }

    if (isToday && firstExam.status === false) {
      navigate(`/take-exam/${firstExam.examId}`);
      return;
    }

    if (isToday && firstExam.status === true) {
      toast.success("This exam is already taken.", {
        autoClose: 1500,
      });
      navigate("/exam-history");
      return;
    }

    if (isFuture) {
      toast.info("This exam is scheduled for a future date. Please wait until the exam begins.", {
        autoClose: 1500,
      });
      return;
    }

    toast.warning("Unexpected condition. Please try again.", {
      autoClose: 1500,
    });
  };

  const cellRender = (currentDate, info) => {
    if (!currentDate) return info.originNode;
    if (info.type === "date") {
      const listData = getListData(currentDate);
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
    }
    return info.originNode;
  };

  return (
    <LearningLayout>
      <div className={cx("exam-schedule-wrapper")}>
        <div className={cx("exam-schedule-container")}>
          <div className={cx("exam-schedule-header")}>
            <div className={cx("exam-schedule-text")}>Exam Schedule</div>
          </div>
          <div className={cx("exam-schedule-content")}>
            <Calendar cellRender={cellRender} onSelect={handleSelectDate} />
          </div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </LearningLayout>
  );
}

export default ExamSchedule;
