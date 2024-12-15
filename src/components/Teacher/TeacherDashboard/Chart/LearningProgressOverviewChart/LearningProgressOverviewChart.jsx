import classNames from "classnames/bind";
import { useState } from "react";
import Chart from "react-apexcharts";
import styles from "./LearningProgressOverviewChart.module.scss";

const cx = classNames.bind(styles);
function LearningProgressOverviewChart() {
  const [chartData] = useState({
    series: [70, 20, 10],
    options: {
      chart: {
        type: "donut",
      },
      labels: ["Completed", "In Progress", "Not Started"],
      dataLabels: {
        enabled: true,
        formatter: (val) => `${val.toFixed(1)}%`,
      },
      colors: ["#2446b6", "#f4cf39", "#d7354f"],
      tooltip: {
        y: {
          formatter: (val) => `${val}%`, // Show progress percentage
        },
      },
      legend: {
        position: "bottom",
      },
    },
  });

  return (
    <div className={cx("chart-pie-container")}>
      <div className={cx("chart-title")}>Learning Progress Overview</div>
      <div className={cx("chart-content")}>
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="donut"
          width="415"
        />
      </div>
    </div>
  );
}

export default LearningProgressOverviewChart
