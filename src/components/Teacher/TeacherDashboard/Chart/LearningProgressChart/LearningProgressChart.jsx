import classNames from "classnames/bind";
import { useState } from "react";
import Chart from "react-apexcharts";
import styles from "./LearningProgressChart.module.scss";

const cx = classNames.bind(styles);

function LearningProgressChart() {
  const [chartData] = useState({
    series: [
      {
        name: "Completed",
        data: [40, 30, 60, 20, 50, 35], 
      },
      {
        name: "In Progress",
        data: [30, 20, 20, 15, 20, 10], 
      },
      {
        name: "Not Started",
        data: [30, 50, 20, 65, 30, 55],
      },
    ],
    options: {
      chart: {
        type: "bar",
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => `${val}%`,
      },
      xaxis: {
        categories: ["Alice", "Bob", "Charlie", "Diana", "Evan", "Fiona"],
      },
      yaxis: {
        min: 0,
        max: 100,
      },
      colors: ["#2446b6", "#f4cf39", "#d7354f"],
      legend: {
        position: "bottom",
        horizontalAlign: "center",
      },
      grid: {
        borderColor: "#e0e0e0",
      },
    },
  });

  return (
    <div className={cx("chart-progress-container")}>
      <div className={cx("chart-title")}>Learning Progress Statistics</div>
      <div className={cx("chart-content")}>
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={415}
        />
      </div>
    </div>
  );
}

export default LearningProgressChart;
