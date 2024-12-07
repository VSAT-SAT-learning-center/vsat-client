import { Skeleton } from "@mui/material";
import classNames from "classnames/bind";
import { useCallback, useContext, useEffect, useState } from "react";
import OnboardingTrialExam from "~/components/TrialExam/TrialExamDetail/OnboardingTrialExam";
import TrialExamItem from "~/components/TrialExam/TrialExamItem";
import { AuthContext } from "~/contexts/AuthContext";
import HeaderAuthen from "~/layouts/Landing/HeaderAuthen";
import apiClient from "~/services/apiService";
import styles from "./TrialExam.module.scss";
const cx = classNames.bind(styles);
function TrialExam() {
  const { user } = useContext(AuthContext);
  const [examList, setExamList] = useState([]);
  const [isWaiting, setIsWaiting] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(() => {
    // Check user-specific onboarding status
    const userOnboardingKey = `hasSeenOnboarding_${user?.id}`;
    return localStorage.getItem(userOnboardingKey) !== "true";
  });
  const fetchExamList = useCallback(async () => {
    try {
      const examName = "Trial Exam"
      setIsWaiting(true);
      const response = await apiClient.get(`/exams/getExamByExamType/${examName}`);
      setExamList(response.data.data);
    } catch (error) {
      console.error("Failed to fetch exam structure list:", error);
    } finally {
      setIsWaiting(false);
    }
  }, []);

  useEffect(() => {
    fetchExamList();
  }, [fetchExamList]);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    if (user?.id) {
      const userOnboardingKey = `hasSeenOnboarding_${user.id}`;
      localStorage.setItem(userOnboardingKey, "true");
    }
  };

  return (
    <>
      {showOnboarding && <OnboardingTrialExam setShowOnboarding={handleOnboardingComplete} />}
      <div className={cx("trial-exam-wrapper")}>
        <HeaderAuthen />
        <div className={cx("trial-exam-container")}>
          {isWaiting ? (
            <>
              {[...Array(3)].map((_, i) => (
                <Skeleton
                  key={i}
                  animation="wave"
                  variant="rectangular"
                  width="100%"
                  height={317}
                />
              ))}
            </>
          ) : (
            examList?.map((exam, index) => (
              <TrialExamItem key={exam.id} index={index + 1} exam={exam} />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default TrialExam;
