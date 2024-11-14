import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
import TrialExamItem from "~/components/TrialExam/TrialExamItem";
import HeaderAuthen from "~/layouts/Landing/HeaderAuthen";
import apiClient from "~/services/apiService";
import styles from "./TrialExam.module.scss";
const cx = classNames.bind(styles);
function TrialExam() {
  const [examList, setExamList] = useState([]);
  const fetchExamList = useCallback(async () => {
    try {
      const examName = "Trial Exam"
      // setIsWaiting(true);
      const response = await apiClient.get(`/exams/getExamByExamType/${examName}`);
      setExamList(response.data.data);
    } catch (error) {
      console.error("Failed to fetch exam structure list:", error);
    } finally {
      // setIsWaiting(false);
    }
  }, []);

  useEffect(() => {
    fetchExamList();
  }, [fetchExamList]);
  return (
    <div className={cx("trial-exam-wrapper")}>
      <HeaderAuthen />
      <div className={cx("trial-exam-container")}>
        {examList?.map((exam, index) => (
          <TrialExamItem key={exam.id} index={index + 1} exam={exam} />
        ))}
      </div>
    </div>
  );
}

export default TrialExam;
