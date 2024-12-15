import classNames from "classnames/bind";
import { useState } from "react";
import DashboardLineChart from "~/components/Manager/ManagerDashboard/Chart/DashboardLineChart";
import Widget from "~/components/Manager/ManagerDashboard/Widget";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import ExamPieChart from "~/components/Staff/StaffDashboard/Chart/ExamPieChart";
import LMPieChart from "~/components/Staff/StaffDashboard/Chart/LMPieChart";
import QuestionPieChart from "~/components/Staff/StaffDashboard/Chart/QuestionPieChart";
import PageLayout from "~/layouts/Manager/PageLayout";
import styles from "./ManagerDashboard.module.scss";
const cx = classNames.bind(styles);
function ManagerDashboard() {
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
      type: "Learning Materials",
      icon: "fa-sharp fa-solid fa-book",
      data: 100,
      number: 10,
      title: "Materials Pending Approval",
      pieData: [55, 32, 13],
    },
    {
      id: 1,
      type: "Questions",
      icon: "fa-sharp fa-solid fa-circle-question",
      data: 124,
      number: 2,
      title: "Questions Flagged for Review",
      pieData: [60, 25, 15],
    },
    {
      id: 2,
      type: "Exams",
      icon: "fa-solid fa-file-lines",
      data: 15,
      number: 5,
      title: `Exams Flagged for Review`,
      pieData: [45, 35, 20],
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

  const [selectedWidget, setSelectedWidget] = useState(widgets[0])

  return (
    <PageLayout>
      <div className={cx("manager-dashboard-wrapper")}>
        <div className={cx("manager-dashboard-container")}>
          <div className={cx("manager-dashboard-header")}>
            <div className={cx("manager-dashboard-text")}>Dashboard</div>
          </div>
          <div className={cx("manager-dashboard-content")}>
            <div className={cx("dashboard-widgets-container")}>
              {widgets.map((widget, index) => (
                <Widget key={index} widget={widget} setSelectedWidget={setSelectedWidget} />
              ))}
            </div>
            <div className={cx("dashboard-chart-container")}>
              {selectedWidget.type === "Learning Materials" && <LMPieChart data={selectedWidget.pieData} />}
              {selectedWidget.type === "Questions" && <QuestionPieChart data={selectedWidget.pieData} />}
              {selectedWidget.type === "Exams" && <ExamPieChart data={selectedWidget.pieData} />}
              <DashboardLineChart />
            </div>
          </div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>

  );
}

export default ManagerDashboard;
