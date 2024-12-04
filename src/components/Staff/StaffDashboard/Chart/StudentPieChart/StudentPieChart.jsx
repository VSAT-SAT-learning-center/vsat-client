import classNames from "classnames/bind";
import Chart from "react-apexcharts";
import styles from "./StudentPieChart.module.scss";
const cx = classNames.bind(styles);

function StudentPieChart({ data }) {
  // Data for the pie chart
  const pieChartData = {
    labels: ["Completed", "Active", "Inactive"],
    series: data,
  };

  const chartOptions = {
    chart: {
      type: "pie",
    },
    labels: pieChartData.labels,
    colors: ["#51bfb3", "#f4cf39", "#d7354f"],
    legend: {
      position: "bottom",
    },
  }
  return (
    <div className={cx("chart-pie-container")}>
      <div className={cx("chart-title")}>Student Pie Chart</div>
      <div className={cx("chart-content")}>
        <Chart
          options={chartOptions}
          series={pieChartData.series}
          type="pie"
          width="415"
        />
      </div>
    </div>
  )
}

export default StudentPieChart
