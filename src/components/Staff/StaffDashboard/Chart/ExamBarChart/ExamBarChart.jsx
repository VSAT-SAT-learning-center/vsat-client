import classNames from "classnames/bind";
import Chart from "react-apexcharts";
import styles from "./ExamBarChart.module.scss";
const cx = classNames.bind(styles);

function ExamBarChart({ examData }) {
  const series = [
    {
      name: "Total",
      data: examData.map((exam) => exam.totalAverage),
    },
    {
      name: "Math",
      data: examData.map((exam) => exam.mathAverage),
    },
    {
      name: "Reading & Writing",
      data: examData.map((exam) => exam.rwAverage),
    },
  ];

  const options = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: examData.map((exam) => exam.name),
    },
    yaxis: {
      min: 200,
      max: 1600,
    },
    colors: ["#2446b6", "#51bfb3", "#f4cf39"],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (val) => `${val}`,
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      itemMargin: {
        horizontal: 10,
      },
    },
    grid: {
      borderColor: "#e0e0e0",
    },
  };

  return (
    <div className={cx("exam-statistic-container")}>
      <div className={cx("chart-title")}>Exam Statistics</div>
      <div className={cx("chart-content")}>
        <Chart options={options} series={series} type="bar" height={450} />
      </div>
    </div>
  );
}

export default ExamBarChart;
