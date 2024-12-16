import { Skeleton } from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import ExamBarChart from "~/components/Staff/StaffDashboard/Chart/ExamBarChart";
import ExamPieChart from "~/components/Staff/StaffDashboard/Chart/ExamPieChart";
import ExamTableChart from "~/components/Staff/StaffDashboard/Chart/ExamTableChart";
import LMPieChart from "~/components/Staff/StaffDashboard/Chart/LMPieChart";
import QuestionBarChart from "~/components/Staff/StaffDashboard/Chart/QuestionBarChart";
import QuestionPieChart from "~/components/Staff/StaffDashboard/Chart/QuestionPieChart";
import StudentPieChart from "~/components/Staff/StaffDashboard/Chart/StudentPieChart";
import Widget from "~/components/Staff/StaffDashboard/Widget";
import PageLayout from "~/layouts/Staff/PageLayout";
import apiClient from "~/services/apiService";
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

  const [widgets, setWidgets] = useState([]);
  const [isWaiting, setIsWaiting] = useState(false)
  const [selectedWidget, setSelectedWidget] = useState(null)
  const [domainQuestions, setDomainQuestions] = useState([])
  const [examStatistics, setExamStatistics] = useState([])
  const [examDistributionData, setDistributionData] = useState([])

  useEffect(() => {
    const fetchStatisticsData = async () => {
      setIsWaiting(true)
      try {
        const response = await apiClient.get("/questions/statisticForStaff");
        const data = response.data;
        const domainsquestion = data.domainsquestion
        const resultAverage = data.resultAverage
        const examDistribution = data.examDistribution

        const order = [
          "Information and Ideas",
          "Craft and Structure",
          "Expression of Ideas",
          "Standard English Conventions",
          "Algebra",
          "Advanced Math",
          "Problem: Solving and Data Analysis",
          "Geometry and Trigonometry",
        ];

        // Sort data based on the specified order
        const sortedData = order.map((name) => {
          return domainsquestion.find((item) => item.domain.content === name) || {
            approved: 0,
            pending: 0,
            rejected: 0,
          };
        });

        // Format into desired output
        const formattedData = [
          {
            name: "Approved",
            data: sortedData.map((item) => item.approved),
          },
          {
            name: "Pending",
            data: sortedData.map((item) => item.pending),
          },
          {
            name: "Rejected",
            data: sortedData.map((item) => item.rejected),
          },
        ];

        const examData = resultAverage.map((exam) => ({
          name: exam.examType,
          totalAverage: exam.average,
          mathAverage: exam.averageMathScore,
          rwAverage: exam.averageRWScore,
        }));

        const examDistributionData = examDistribution.map((item, index) => ({
          key: index,
          student: item.student,
          exam: item.examTitle,
          readingWritingScore: item.rw,
          mathScore: item.math,
          totalScore: item.total,
        }));

        const widgetsData = [
          {
            id: 0,
            type: "Learning Materials",
            icon: "fa-sharp fa-solid fa-book",
            title: "Materials Pending Approval",
            data: [data.unit.approved, data.unit.pending, data.unit.rejected].reduce(
              (sum, value) => sum + value,
              0
            ),
            number: data.unit.pending,
            pieData: [data.unit.approved, data.unit.pending, data.unit.rejected],
          },
          {
            id: 1,
            type: "Questions",
            icon: "fa-sharp fa-solid fa-circle-question",
            title: "Questions Flagged for Review",
            data: [data.questions.approved, data.questions.pending, data.questions.rejected].reduce(
              (sum, value) => sum + value,
              0
            ),
            number: data.questions.pending,
            pieData: [data.questions.approved, data.questions.pending, data.questions.rejected],
          },
          {
            id: 2,
            type: "Exams",
            icon: "fa-solid fa-file-lines",
            title: `Exams Created in ${currentMonth}`,
            data: [data.exam.approved, data.exam.pending, data.exam.rejected].reduce(
              (sum, value) => sum + value,
              0
            ),
            number: data.exam.createofmonth,
            pieData: [data.exam.approved, data.exam.pending, data.exam.rejected],
          },
          {
            id: 3,
            type: "Students",
            icon: "fa-solid fa-user",
            title: `Students Engaged in ${currentMonth}`,
            data: [data.studyprofile.complete, data.studyprofile.active, data.studyprofile.inactive].reduce(
              (sum, value) => sum + value,
              0
            ),
            number: data.studyprofile.createofmonth,
            pieData: [
              data.studyprofile.complete,
              data.studyprofile.active,
              data.studyprofile.inactive,
            ],
          },
        ];

        setWidgets(widgetsData);
        setSelectedWidget(widgetsData[0]);
        setExamStatistics(examData)
        setDomainQuestions(formattedData);
        setDistributionData(examDistributionData)
      } catch (error) {
        console.error("Error while fetching statistics data:", error);
      } finally {
        setIsWaiting(false)
      }
    };

    fetchStatisticsData();
  }, [currentMonth]);

  return (
    <PageLayout>
      <div className={cx("staff-dashboard-wrapper")}>
        <div className={cx("staff-dashboard-container")}>
          <div className={cx("staff-dashboard-header")}>
            <div className={cx("staff-dashboard-text")}>Dashboard</div>
          </div>
          {isWaiting ? (
            <div className={cx("staff-dashboard-no-content")}>
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
            <div className={cx("staff-dashboard-content")}>
              <div className={cx("dashboard-widgets-container")}>
                {widgets.map((widget, index) => (
                  <Widget key={index} widget={widget} setSelectedWidget={setSelectedWidget} />
                ))}
              </div>
              <div className={cx("dashboard-chart-container")}>
                {selectedWidget?.type === "Learning Materials" && <LMPieChart data={selectedWidget.pieData} />}
                {selectedWidget?.type === "Questions" && <QuestionPieChart data={selectedWidget.pieData} />}
                {selectedWidget?.type === "Exams" && <ExamPieChart data={selectedWidget.pieData} />}
                {selectedWidget?.type === "Students" && <StudentPieChart data={selectedWidget.pieData} />}
                <QuestionBarChart data={domainQuestions} />
              </div>
              <div className={cx("dashboard-statistic-container")}>
                <ExamBarChart examData={examStatistics} />
                <ExamTableChart examData={examDistributionData} />
              </div>
            </div>
          )}
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>
  );
}

export default Dashboard;
