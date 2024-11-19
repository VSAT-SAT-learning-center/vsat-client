import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import classNames from "classnames/bind";
import { Bar } from "react-chartjs-2";
import styles from "./DomainBarChart.module.scss";
const cx = classNames.bind(styles);
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function DomainBarChart({ domainData }) {
  const labels = domainData?.map((item) => item.domainContent);
  const correctData = domainData?.map((item) => item.correctPercent);
  const incorrectData = domainData?.map((item) => item.incorrectPercent);

  const data = {
    labels,
    datasets: [
      {
        label: "Correct Answers (%)",
        data: correctData,
        backgroundColor: "rgba(36, 70, 182, 0.6)",
        borderColor: "rgba(36, 70, 182)",
        borderWidth: 1,
      },
      {
        label: "Incorrect Answers (%)",
        data: incorrectData,
        backgroundColor: "rgba(215, 53, 79, 0.6)",
        borderColor: "rgba(215, 53, 79)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
    },
  };

  return (
    <div className={cx("domain-bar-chart-wrapper")}>
      <div className={cx("chart-title")}>Domain Chart Distribution</div>
      <Bar data={data} options={options} />
    </div>
  );
}

export default DomainBarChart;
