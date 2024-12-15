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
      title: `Exams Created in ${currentMonth}`,
      pieData: [45, 35, 20],
    },
    {
      id: 3,
      type: "Students",
      icon: "fa-solid fa-user",
      data: 125,
      number: 25,
      title: `Students Engaged in ${currentMonth}`,
      pieData: [50, 40, 10],
    },
  ]);
  const [selectedWidget, setSelectedWidget] = useState(widgets[0])
  const [domainQuestions, setDomainQuestions] = useState([])
  const [examStatistics, setExamStatistics] = useState([])
  const [examDistributionData, setDistributionData] = useState([])

  useEffect(() => {
    const fetchStatisticsData = async () => {
      try {
        const response = await apiClient.get("/questions/statisticForStaff");
        const data = response.data;
        const domainsquestion = data.domainsquestion
        const resultAverage = data.resultAverage
        const examDistribution = data.examDistribution
        const learningMaterials = [data.unit.approved, data.unit.pending, data.unit.rejected];
        const questions = [data.questions.approved, data.questions.pending, data.questions.rejected];
        const exams = [data.exam.approved, data.exam.pending, data.exam.rejected];
        const students = [
          data.studyprofile.complete,
          data.studyprofile.active,
          data.studyprofile.inactive
        ];

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

        setExamStatistics(examData)
        setDomainQuestions(formattedData);
        setDistributionData(examDistributionData)

        setWidgets((prevWidgets) =>
          prevWidgets.map((widget) => {
            switch (widget.type) {
              case "Learning Materials":
                return {
                  ...widget,
                  data: learningMaterials.reduce((sum, value) => sum + value, 0),
                  number: data.unit.pending,
                  pieData: learningMaterials
                };
              case "Questions":
                return {
                  ...widget,
                  data: questions.reduce((sum, value) => sum + value, 0),
                  number: data.questions.pending,
                  pieData: questions
                };
              case "Exams":
                return {
                  ...widget,
                  data: exams.reduce((sum, value) => sum + value, 0),
                  number: data.exam.createofmonth,
                  pieData: exams
                };
              case "Students":
                return {
                  ...widget,
                  data: students.reduce((sum, value) => sum + value, 0),
                  number: data.studyprofile.createofmonth,
                  pieData: students
                };
              default:
                return widget;
            }
          })
        );
      } catch (error) {
        console.error("Error while fetching statistics data:", error);
      }
    };

    fetchStatisticsData();
  }, []);


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
              {selectedWidget.type === "Learning Materials" && <LMPieChart data={selectedWidget.pieData} />}
              {selectedWidget.type === "Questions" && <QuestionPieChart data={selectedWidget.pieData} />}
              {selectedWidget.type === "Exams" && <ExamPieChart data={selectedWidget.pieData} />}
              {selectedWidget.type === "Students" && <StudentPieChart data={selectedWidget.pieData} />}
              <QuestionBarChart data={domainQuestions} />
            </div>
            <div className={cx("dashboard-statistic-container")}>
              <ExamBarChart examData={examStatistics} />
              <ExamTableChart examData={examDistributionData}/>
            </div>
          </div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>
  );
}

export default Dashboard;
