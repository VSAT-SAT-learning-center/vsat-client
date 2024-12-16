import classNames from "classnames/bind";
import { useState } from "react";
import Chart from "react-apexcharts";
import styles from "./ExamPerformanceChart.module.scss";
const cx = classNames.bind(styles);

function ExamPerformanceChart({ data }) {
  const [chartData] = useState({
    series: [
      {
        name: "Average Score",
        data: data?.scores,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 400,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "50%",
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => `${val}`,
      },
      xaxis: {
        categories: data?.studentNames,
      },
      yaxis: {
        labels: {
          formatter: (val) => `${val} pts`,
        },
      },
      colors: ["#2446b6"],
      tooltip: {
        y: {
          formatter: (val) => `${val} pts`,
        },
      },
      grid: {
        borderColor: "#e0e0e0",
      },
    },
  });
  return (
    <div className={cx("chart-bar-container")}>
      <div className={cx("chart-title")}>Exam Performance Statistics</div>
      <div className={cx("chart-content")}>
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={415}
        />
      </div>
    </div>
  )
}

export default ExamPerformanceChart
