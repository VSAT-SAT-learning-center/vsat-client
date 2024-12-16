import classNames from "classnames/bind";
import { useState } from "react";
import Chart from "react-apexcharts";
import styles from "./LearningProgressChart.module.scss";

const cx = classNames.bind(styles);

function LearningProgressChart({ data }) {
  const [chartData] = useState({
    series: data?.progressData,
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
        categories: data?.studentNames,
      },
      yaxis: {
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
