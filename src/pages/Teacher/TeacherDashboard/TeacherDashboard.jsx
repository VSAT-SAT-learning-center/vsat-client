import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";

import { Skeleton } from "@mui/material";
import ExamParticipationChart from "~/components/Teacher/TeacherDashboard/Chart/ExamParticipationChart";
import ExamPerformanceChart from "~/components/Teacher/TeacherDashboard/Chart/ExamPerformanceChart";
import LearningProgressChart from "~/components/Teacher/TeacherDashboard/Chart/LearningProgressChart";
import LearningProgressOverviewChart from "~/components/Teacher/TeacherDashboard/Chart/LearningProgressOverviewChart";
import Widget from "~/components/Teacher/TeacherDashboard/Widget";
import PageLayout from "~/layouts/Teacher/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./TeacherDashboard.module.scss";
const cx = classNames.bind(styles);
function TeacherDashboard() {
  const getCurrentMonthName = () => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    return monthNames[new Date().getMonth()];
  };

  const currentMonth = getCurrentMonthName();
  const [isWaiting, setIsWaiting] = useState(false)
  const [widgets, setWidgets] = useState([
  ]);
  const [participationChartData, setParticipationChartData] = useState([]);
  const [performanceData, setPerformanceData] = useState({
    studentNames: [],
    scores: [],
  });
  const [progressState, setProgressState] = useState({
    studentNames: [],
    progressData: [],
  });
  const [overviewProgressData, setOverviewProgressData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      setIsWaiting(true)
      try {
        const response = await apiClient.get("/study-profiles/teacherDashboard")
        const data = response.data
        const participationData = data.participationOverview;
        const overviewData = data.overview

        const totalParticipation =
          participationData.completed +
          participationData.missed +
          participationData.scheduled;

        const participationPercentages = [
          ((participationData.completed / totalParticipation) * 100),
          ((participationData.scheduled / totalParticipation) * 100),
          ((participationData.missed / totalParticipation) * 100),
        ];

        const totalOverview = overviewData.completed + overviewData.inProgress + overviewData.notStarted

        const overviewPercentages = [
          Math.round((overviewData.completed / totalOverview) * 100),
          Math.round((overviewData.inProgress / totalOverview) * 100),
          Math.round((overviewData.notStarted / totalOverview) * 100),
        ];

        const widgetData = [
          {
            id: 0,
            type: "Student Profiles",
            icon: "fa-sharp fa-solid fa-user",
            data: data.statistics.totalStudyProfiles,
            number: data.statistics.inactiveStudyProfiles,
            title: "Active Student Profiles",
          },
          {
            id: 1,
            type: "Learning Paths",
            icon: "fa-sharp fa-solid fa-road",
            data: data.statistics.totalTargetLearning,
            number: data.statistics.inactiveTargetLearning,
            title: "Paths Pending Approval",
          },
          {
            id: 2,
            type: "Schedule Exams",
            icon: "fa-solid fa-file-lines",
            data: data.statistics.totalExams,
            number: data.statistics.upcomingExams,
            title: `Upcoming Exams`,
          },
          {
            id: 3,
            type: "Feedbacks",
            icon: "fa-solid fa-comment-dots",
            data: data.statistics.totalFeedback,
            number: data.statistics.feedbackThisMonth,
            title: `Total Feedbacks in ${currentMonth}`,
          },
        ]
        const mappedData = {
          studentNames: data.performanceStats.map((stat) => stat.studentName),
          scores: data.performanceStats.map((stat) => stat.averageScore),
        };

        const studentNames = data.progressStats.map((stat) => stat.studentName);
        const progressData = [
          {
            name: "Completed",
            data: data.progressStats.map((stat) => {
              const total = stat.completed + stat.inProgress + stat.notStarted;
              return total > 0 ? ((stat.completed / total) * 100).toFixed(0) : 0;
            }),
          },
          {
            name: "In Progress",
            data: data.progressStats.map((stat) => {
              const total = stat.completed + stat.inProgress + stat.notStarted;
              return total > 0 ? ((stat.inProgress / total) * 100).toFixed(0) : 0;
            }),
          },
          {
            name: "Not Started",
            data: data.progressStats.map((stat) => {
              const total = stat.completed + stat.inProgress + stat.notStarted;
              return total > 0 ? ((stat.notStarted / total) * 100).toFixed(0) : 0;
            }),
          },
        ];

        setWidgets(widgetData)
        setPerformanceData(mappedData);
        setParticipationChartData(participationPercentages);
        setOverviewProgressData(overviewPercentages);
        setProgressState({
          studentNames: studentNames,
          progressData: progressData,
        });

      } catch (error) {
        console.error("Error while fetching teacher dashboard data:", error)
      } finally {
        setIsWaiting(false)
      }
    }

    fetchData()
  }, [currentMonth])
  return (
    <PageLayout>
      <div className={cx("teacher-dashboard-wrapper")}>
        <div className={cx("teacher-dashboard-container")}>
          <div className={cx("teacher-dashboard-header")}>
            <div className={cx("teacher-dashboard-text")}>Dashboard</div>
          </div>
          {isWaiting ? (
            <div className={cx("teacher-dashboard-no-content")}>
              <div className={cx("dashboard-widgets-no-container")}>
                {[...Array(4)].map((_, i) => (
                  <Skeleton
                    key={i}
                    animation="wave"
                    variant="rectangular"
                    width="100%"
                    height={164}
                  />
                ))}
              </div>
              <div className={cx("dashboard-chart-no-container")}>
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="100%"
                  height="420px"
                />
              </div>
            </div>
          ) : (
            <div className={cx("teacher-dashboard-content")}>
              <div className={cx("dashboard-widgets-container")}>
                {widgets.map((widget, index) => (
                  <Widget key={index} widget={widget} />
                ))}
              </div>
              <div className={cx("dashboard-chart-container")}>
                <ExamPerformanceChart data={performanceData} />
                <ExamParticipationChart data={participationChartData} />
              </div>
              <div className={cx("dashboard-chart-container")}>
                <LearningProgressChart data={progressState} />
                <LearningProgressOverviewChart data={overviewProgressData} />
              </div>
            </div>
          )}
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>
  );
}

export default TeacherDashboard;
