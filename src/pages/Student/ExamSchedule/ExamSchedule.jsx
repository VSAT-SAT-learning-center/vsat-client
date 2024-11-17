import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Calendar, Badge } from "antd";
import LearningLayout from "~/layouts/Student/LearningLayout/LearningPageLayout";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import styles from "./ExamSchedule.module.scss";
import apiClient from "~/services/apiService";

const cx = classNames.bind(styles);

function ExamSchedule() {
  const [examAttempts, setExamAttempts] = useState([]);

  useEffect(() => {
    const fetchExamAttempts = async () => {
      try {
        const response = await apiClient.get(`/exam-attempts/getExamAttemptByStudyProfileId`);
        setExamAttempts(response.data.data || []); 
      } catch (error) {
        console.error("Error fetching exam attempts:", error);
      }
    };

    fetchExamAttempts();
  }, []);

  const getListData = (value) => {
    const listData = examAttempts
      .filter((attempt) => {
        const attemptDate = new Date(attempt.attemptdatetime);
        return (
          attemptDate.getFullYear() === value.year() &&
          attemptDate.getMonth() === value.month() &&
          attemptDate.getDate() === value.date()
        );
      })
      .map((attempt) => ({
        type: "success", 
        content: attempt.exam.examTitle,
        duration: "Duration: " + attempt.exam.totalTime + " mins",
        question: "Question: " +  attempt.exam.totalNumberOfQuestions + " questions",
      }));
    return listData || [];
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type} text={item.content} />
            <Badge status={item.type} text={item.duration} />
            <Badge status={item.type} text={item.question} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <LearningLayout>
      <div className={cx("exam-schedule-wrapper")}>
        <div className={cx("exam-schedule-container")}>
          <div className={cx("exam-schedule-header")}>
            <div className={cx("exam-schedule-text")}>Exam Schedule</div>
          </div>
          <div className={cx("exam-schedule-content")}>
            {/* Calendar Component */}
            <Calendar dateCellRender={dateCellRender} />
          </div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </LearningLayout>
  );
}

export default ExamSchedule;
