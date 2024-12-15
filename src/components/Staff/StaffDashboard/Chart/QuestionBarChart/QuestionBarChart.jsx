import classNames from "classnames/bind";
import Chart from "react-apexcharts";
import styles from "./QuestionBarChart.module.scss";
const cx = classNames.bind(styles);

function QuestionBarChart({ data }) {
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
  return (
    <div className={cx("chart-bar-question-container")}>
      <div className={cx("chart-title")}>Question Statistics</div>
      <div className={cx("chart-content")}>
        <Chart options={chartOptions} series={data} type="bar" height={415} />
      </div>
    </div>
  )
}

export default QuestionBarChart
