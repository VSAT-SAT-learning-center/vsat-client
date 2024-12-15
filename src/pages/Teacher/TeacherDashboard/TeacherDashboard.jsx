import classNames from "classnames/bind";
import { useState } from "react";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";

import ExamParticipationChart from "~/components/Teacher/TeacherDashboard/Chart/ExamParticipationChart";
import ExamPerformanceChart from "~/components/Teacher/TeacherDashboard/Chart/ExamPerformanceChart";
import LearningProgressChart from "~/components/Teacher/TeacherDashboard/Chart/LearningProgressChart";
import LearningProgressOverviewChart from "~/components/Teacher/TeacherDashboard/Chart/LearningProgressOverviewChart";
import Widget from "~/components/Teacher/TeacherDashboard/Widget";
import PageLayout from "~/layouts/Teacher/PageLayout";
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
  // eslint-disable-next-line no-unused-vars
  const [widgets, setWidgets] = useState([
    {
      id: 0,
      type: "Student Profiles",
      icon: "fa-sharp fa-solid fa-user",
      data: 100,
      number: 10,
      title: "Active Student Profiles",
    },
    {
      id: 1,
      type: "Learning Paths",
      icon: "fa-sharp fa-solid fa-road",
      data: 124,
      number: 2,
      title: "Paths Pending Approval",
    },
    {
      id: 2,
      type: "Exams",
      icon: "fa-solid fa-file-lines",
      data: 15,
      number: 5,
      title: `Upcoming Exams`,
    },
    {
      id: 3,
      type: "Feedbacks",
      icon: "fa-solid fa-comment-dots",
      data: 125,
      number: 25,
      title: `Total Feedbacks in ${currentMonth}`,
    },
  ]);
  return (
    <PageLayout>
      <div className={cx("teacher-dashboard-wrapper")}>
        <div className={cx("teacher-dashboard-container")}>
          <div className={cx("teacher-dashboard-header")}>
            <div className={cx("teacher-dashboard-text")}>Dashboard</div>
          </div>
          <div className={cx("teacher-dashboard-content")}>
            <div className={cx("dashboard-widgets-container")}>
              {widgets.map((widget, index) => (
                <Widget key={index} widget={widget} />
              ))}
            </div>
            <div className={cx("dashboard-chart-container")}>
              <ExamPerformanceChart />
              <ExamParticipationChart />
            </div>
            <div className={cx("dashboard-chart-container")}>
              <LearningProgressChart />
              <LearningProgressOverviewChart />
            </div>
          </div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>
  );
}

export default TeacherDashboard;
