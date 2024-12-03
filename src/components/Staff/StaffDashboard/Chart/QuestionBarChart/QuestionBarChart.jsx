import classNames from "classnames/bind";
import Chart from "react-apexcharts";
import styles from "./QuestionBarChart.module.scss";
const cx = classNames.bind(styles);

function QuestionBarChart() {
  const chartOptions = {
    chart: {
      type: "bar",
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    xaxis: {
      categories: [
        "Information and Ideas",
        "Craft and Structure",
        "Expression of Ideas",
        "Standard English Conventions",
        "Algebra",
        "Advanced Math",
        "Problem-Solving and Data Analysis",
        "Geometry and Trigonometry",
      ],
    },
    dataLabels: {
      enabled: true,
    },
    colors: ["#2446b6", "#f4cf39", "#d7354f"],
  };

  const chartSeries = [
    {
      name: "Approved",
      data: [12, 14, 8, 10, 18, 20, 6, 7],
    },
    {
      name: "Pending",
      data: [6, 7, 4, 5, 10, 9, 3, 2],
    },
    {
      name: "Rejected",
      data: [2, 3, 2, 1, 3, 4, 1, 1],
    },
  ];
  return (
    <div className={cx("chart-bar-question-container")}>
      <div className={cx("chart-title")}>Question Bar Chart</div>
      <div className={cx("chart-content")}>
        <Chart options={chartOptions} series={chartSeries} type="bar" height={415} />
      </div>
    </div>
  )
}

export default QuestionBarChart
