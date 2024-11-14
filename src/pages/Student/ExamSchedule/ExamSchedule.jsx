import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import TrialExamItem from "~/components/Student/TrialExam/TrialExamItem";
import NoQuestionData from "~/components/Staff/QuestionExamCreate/NoQuestionData";
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
        console.log(response);
        setExamAttempts(response.data.data);
      } catch (error) {
        console.error("Error fetching exam attempts:", error);
      }
    };

    fetchExamAttempts();
  }, []);

  return (
    <LearningLayout>
      <div className={cx("exam-schedule-wrapper")}>
        <div className={cx("exam-schedule-container")}>
          <div className={cx("exam-schedule-header")}>
            <div className={cx("exam-schedule-text")}>Exam Schedule</div>
          </div>
          <div className={cx("exam-schedule-content")}>
            {examAttempts.length > 0 ? (
              <div className={cx("exam-schedule-content-item", "exam-schedule-item-container")}>
                {examAttempts.map((item, index) => (
                  <TrialExamItem key={item.id} exam={item} index={index + 1} />
                ))}
              </div>
            ) : (
              <NoQuestionData />
            )}
          </div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </LearningLayout>
  );
}

export default ExamSchedule;
