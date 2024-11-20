import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Calendar, Badge } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import moment from "moment";
import LearningLayout from "~/layouts/Student/LearningLayout/LearningPageLayout";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import styles from "./ExamSchedule.module.scss";
import apiClient from "~/services/apiService";

const cx = classNames.bind(styles);

function ExamSchedule() {
  const [examAttempts, setExamAttempts] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchExamAttempts = async () => {
      try {
        const response = await apiClient.get(`/exam-attempts/getExamAttemptByStudyProfile`);
        setExamAttempts(response.data.data || []);
        console.log(response)
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
        if (attemptDate < currentDate) {
          type = "error";
        } else if (attempt.status === false) {
          type = "warning";
        } else if (attempt.status === true) {
          type = "success";
        }

        return {
          type,
          content: attempt.exam.examTitle,
          duration: "Duration: " + attempt.exam.totalTime + " mins",
          examId: attempt.exam.id,
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
    if (listData.length > 0) {
      const firstExamId = listData[0].examId;
      navigate(`/take-exam/${firstExamId}`);
    }
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
