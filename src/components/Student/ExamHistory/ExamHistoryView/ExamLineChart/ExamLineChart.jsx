import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import classNames from "classnames/bind";
import { Line } from "react-chartjs-2";
import styles from "./ExamLineChart.module.scss";

const cx = classNames.bind(styles);

// Register required Chart.js modules
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, annotationPlugin);

function ExamLineChart({ examData, goal }) {
  // Extract data for the chart
  const labels = examData?.map((item) => item.testDate); 
  const scores = examData?.map((item) => item.score);

  // Chart data
  const data = {
    labels,
    datasets: [
      {
        label: "Exam Scores",
        data: scores,
        borderColor: "rgba(81, 191, 179, 0.8)",
        backgroundColor: "rgba(81, 191, 179, 0.2)",
        fill: true,
        borderWidth: 2,
        pointBackgroundColor: "rgba(81, 191, 179, 1)",
        tension: 0.4,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
      annotation: {
        annotations: {
          goalLine: {
            type: "line",
            yMin: goal,
            yMax: goal,
            borderColor: "gray",
            borderWidth: 1,
            borderDash: [7, 7],
            label: {
              content: "Goal",
              enabled: true,
              position: "end",
            },
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        min: 400,
        max: 1600,
        ticks: {
          stepSize: 200,
        },

      },
    },
  };

  return (
    <div className={cx("exam-line-chart-wrapper")}>
      <Line data={data} options={options} />
    </div>
  );
}

export default ExamLineChart;
