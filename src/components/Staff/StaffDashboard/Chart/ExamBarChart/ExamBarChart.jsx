import classNames from "classnames/bind";
import Chart from "react-apexcharts";
import styles from "./ExamBarChart.module.scss";
const cx = classNames.bind(styles);

function ExamBarChart() {
  // Example data for the chart
  const examData = [
    { name: "Math Exam", averageScore: 1200, students: 30 },
    { name: "Science Exam", averageScore: 800, students: 25 },
    { name: "History Exam", averageScore: 850, students: 20 },
    { name: "English Exam", averageScore: 1150, students: 28 },
    { name: "Avarage Exam", averageScore: 960, students: 28 },
    { name: "Avarage Exam 1", averageScore: 1400, students: 28 },
  ];

  // Prepare chart series and categories
  const series = [
    {
      name: "Average Score",
      type: "column",
      data: examData.map((exam) => exam.averageScore),
    },
  ];

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: examData.map((exam) => exam.name),
    },
    yaxis: {
      min: 200,
      max: 1600,
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
    colors: ["#2446b6"],
    tooltip: {
      shared: true,
      intersect: false,
    },
    legend: {
      show: false,
    },
  };

  return (
    <div className={cx("exam-statistic-container")}>
      <div className={cx("chart-title")}>Exam Statistics</div>
      <div className={cx("chart-content")}>
        <Chart options={options} series={series} type="bar" height={465} />
      </div>
    </div>
  );
}

export default ExamBarChart;
