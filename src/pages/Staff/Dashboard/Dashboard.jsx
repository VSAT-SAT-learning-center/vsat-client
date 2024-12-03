import classNames from "classnames/bind";
import { useState } from "react";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import ExamPieChart from "~/components/Staff/StaffDashboard/Chart/ExamPieChart";
import LMPieChart from "~/components/Staff/StaffDashboard/Chart/LMPieChart";
import QuestionBarChart from "~/components/Staff/StaffDashboard/Chart/QuestionBarChart";
import QuestionPieChart from "~/components/Staff/StaffDashboard/Chart/QuestionPieChart";
import StudentPieChart from "~/components/Staff/StaffDashboard/Chart/StudentPieChart";
import Widget from "~/components/Staff/StaffDashboard/Widget";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./Dashboard.module.scss";
const cx = classNames.bind(styles);
function Dashboard() {
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
      type: "Learning Material",
      icon: "fa-sharp fa-solid fa-book",
      data: 100,
      number: 10,
      title: "Materials Pending Approval",
      pieData: [55, 32, 13],
    },
    {
      id: 1,
      type: "Question",
      icon: "fa-sharp fa-solid fa-circle-question",
      data: 124,
      number: 2,
      title: "Questions Flagged for Review",
      pieData: [60, 25, 15],
    },
    {
      id: 2,
      type: "Exam",
      icon: "fa-solid fa-file-lines",
      data: 15,
      number: 5,
      title: `Exams Created in ${currentMonth}`,
      pieData: [45, 35, 20],
    },
    {
      id: 3,
      type: "Student",
      icon: "fa-solid fa-user",
      data: 125,
      number: 25,
      title: `Students Engaged in ${currentMonth}`,
      pieData: [50, 40, 10],
    },
  ]);

  const [selectedWidget, setSelectedWidget] = useState(widgets[0])

  return (
    <PageLayout>
      <div className={cx("staff-dashboard-wrapper")}>
        <div className={cx("staff-dashboard-container")}>
          <div className={cx("staff-dashboard-header")}>
            <div className={cx("staff-dashboard-text")}>Dashboard</div>
          </div>
          <div className={cx("staff-dashboard-content")}>
            <div className={cx("dashboard-widgets-container")}>
              {widgets.map((widget, index) => (
                <Widget key={index} widget={widget} setSelectedWidget={setSelectedWidget} />
              ))}
            </div>
            <div className={cx("dashboard-chart-container")}>
              {selectedWidget.type === "Learning Material" && <LMPieChart data={selectedWidget.pieData} />}
              {selectedWidget.type === "Question" && <QuestionPieChart data={selectedWidget.pieData} />}
              {selectedWidget.type === "Exam" && <ExamPieChart data={selectedWidget.pieData} />}
              {selectedWidget.type === "Student" && <StudentPieChart data={selectedWidget.pieData} />}
              <QuestionBarChart />
            </div>
            <div className={cx("dashboard-statistic-container")}>
              <div className={cx("exam-statistic-container")}></div>
              <div className={cx("exam-table-container")}></div>
            </div>
          </div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>
  );
}

export default Dashboard;
