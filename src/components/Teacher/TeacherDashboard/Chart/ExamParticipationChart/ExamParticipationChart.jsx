import classNames from "classnames/bind";
import { useState } from "react";
import Chart from "react-apexcharts";
import styles from "./ExamParticipationChart.module.scss";
const cx = classNames.bind(styles);

function ExamParticipationChart() {
  const [chartData] = useState({
    series: [60, 20, 20],
    options: {
      chart: {
        type: "pie",
      },
      labels: ["Completed", "Scheduled", "Missed"],
      dataLabels: {
        enabled: true,
        formatter: (val) => `${val.toFixed(1)}%`,
      },
      legend: {
        position: "bottom",
      },
      colors: ["#2446b6", "#f4cf39", "#d7354f"],
      tooltip: {
        y: {
          formatter: (val) => `${val}%`,
        },
      },
    },
  });
  return (
    <div className={cx("chart-pie-container")}>
      <div className={cx("chart-title")}>Exam Participation Overview</div>
      <div className={cx("chart-content")}>
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="pie"
          width="415"
        />
      </div>
    </div>
  )
}

export default ExamParticipationChart
