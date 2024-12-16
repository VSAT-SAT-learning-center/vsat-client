import { Skeleton } from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import DashboardLineChart from "~/components/Manager/ManagerDashboard/Chart/DashboardLineChart";
import Widget from "~/components/Manager/ManagerDashboard/Widget";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import ExamPieChart from "~/components/Staff/StaffDashboard/Chart/ExamPieChart";
import LMPieChart from "~/components/Staff/StaffDashboard/Chart/LMPieChart";
import QuestionPieChart from "~/components/Staff/StaffDashboard/Chart/QuestionPieChart";
import PageLayout from "~/layouts/Manager/PageLayout";
import apiClient from "~/services/apiService";
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
  const [isWaiting, setIsWaiting] = useState(false)
  const [widgets, setWidgets] = useState([]);
  const [selectedWidget, setSelectedWidget] = useState(null)
  const [overviewData, setOverviewData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      setIsWaiting(true)
      try {
        const response = await apiClient.get("/questions/statisticForManager")
        const data = response.data;
        const learningMaterials = [data.unit.approved, data.unit.pending, data.unit.rejected];
        const questions = [data.questions.approved, data.questions.pending, data.questions.rejected];
        const exams = [data.exam.approved, data.exam.pending, data.exam.rejected];
        const widgetsData = [
          {
            id: 0,
            type: "Learning Materials",
            icon: "fa-sharp fa-solid fa-book",
            title: "Materials Pending Approval",
            data: learningMaterials.reduce((sum, value) => sum + value, 0),
            number: data.unit.pending,
            pieData: learningMaterials
          },
          {
            id: 1,
            type: "Questions",
            icon: "fa-sharp fa-solid fa-circle-question",
            title: "Questions Flagged for Review",
            data: questions.reduce((sum, value) => sum + value, 0),
            number: data.questions.pending,
            pieData: questions
          },
          {
            id: 2,
            type: "Exams",
            icon: "fa-solid fa-file-lines",
            title: `Exams Flagged for Review`,
            data: exams.reduce((sum, value) => sum + value, 0),
            number: data.exam.pending,
            pieData: exams
          },
          {
            id: 3,
            type: "Feedbacks",
            icon: "fa-solid fa-comment-dots",
            title: `Total Feedbacks in ${currentMonth}`,
            data: data.feedback.evaluateFeedback,
            number: 0,
          },
        ];
        const categories = [
          data.unit,
          data.questions,
          data.exam,
        ];
        
        const totals = categories.map((category) => 
          category.approved + category.pending + category.rejected
        );
        
        const toPercentage = (value, total) => (total > 0 ? ((value / total) * 100).toFixed(2) : 0);
        
        const formattedData = [
          {
            name: "Approved",
            data: categories.map((category, index) =>
              toPercentage(category.approved, totals[index])
            ),
          },
          {
            name: "Pending",
            data: categories.map((category, index) =>
              toPercentage(category.pending, totals[index])
            ),
          },
          {
            name: "Rejected",
            data: categories.map((category, index) =>
              toPercentage(category.rejected, totals[index])
            ),
          },
        ];
        setWidgets(widgetsData);
        setSelectedWidget(widgetsData[0]);
        setOverviewData(formattedData)
      } catch (error) {
        console.error("Error while fetching manager dashboard data:", error)
      } finally {
        setIsWaiting(false)
      }
    }

    fetchData()
  }, [currentMonth])
  return (
    <PageLayout>
      <div className={cx("manager-dashboard-wrapper")}>
        <div className={cx("manager-dashboard-container")}>
          <div className={cx("manager-dashboard-header")}>
            <div className={cx("manager-dashboard-text")}>Dashboard</div>
          </div>
          {isWaiting ? (
            <div className={cx("manager-dashboard-no-content")}>
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
            <div className={cx("manager-dashboard-content")}>
              <div className={cx("dashboard-widgets-container")}>
                {widgets.map((widget, index) => (
                  <Widget key={index} widget={widget} setSelectedWidget={setSelectedWidget} />
                ))}
              </div>
              <div className={cx("dashboard-chart-container")}>
                {selectedWidget?.type === "Learning Materials" && <LMPieChart data={selectedWidget.pieData} />}
                {selectedWidget?.type === "Questions" && <QuestionPieChart data={selectedWidget.pieData} />}
                {selectedWidget?.type === "Exams" && <ExamPieChart data={selectedWidget.pieData} />}
                <DashboardLineChart data={overviewData} />
              </div>
            </div>
          )}
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>

  );
}

export default ManagerDashboard;
