import classNames from "classnames/bind";
import Chart from "react-apexcharts";
import styles from "./LMPieChart.module.scss";
const cx = classNames.bind(styles);

function LMPieChart({ data }) {
  // Data for the pie chart
  const pieChartData = {
    labels: ["Approved", "Pending", "Rejected"],
    series: data,
  };

  const chartOptions = {
    chart: {
      type: "pie",
    },
    labels: pieChartData.labels,
    colors: ["#2446b6", "#f4cf39", "#d7354f"],
    legend: {
      position: "bottom",
    },
  }
  return (
    <div className={cx("chart-pie-container")}>
      <div className={cx("chart-title")}>Learning Material Statistics</div>
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

export default LMPieChart
