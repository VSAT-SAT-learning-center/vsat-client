import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import classNames from "classnames/bind";
import { useEffect, useMemo, useState } from "react";
import { Radar } from "react-chartjs-2";
import styles from "./SkillRadarChart.module.scss";
const cx = classNames.bind(styles);

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function SkillRadarChart({ domains, skillsData }) {
  const domainData = useMemo(() => {
    if (!domains || !skillsData) return {};

    return domains.reduce((acc, domain) => {
      const filteredSkills = skillsData.filter((skill) => skill.domain.id === domain.domainId);

      const mergedDomainName = "Expression of Ideas and Standard English Conventions";
      if (
        domain.domainContent === "Expression of Ideas" ||
        domain.domainContent === "Standard English Conventions"
      ) {
        if (!acc[mergedDomainName]) {
          acc[mergedDomainName] = { skills: [], data: [] };
        }
        acc[mergedDomainName].skills.push(...filteredSkills.map((skill) => skill.skillContent));
        acc[mergedDomainName].data.push(
          ...filteredSkills.map((skill) => (isNaN(skill.correctPercent) ? 0 : skill.correctPercent))
        );
      } else {
        acc[domain.domainContent] = {
          skills: filteredSkills.map((skill) => skill.skillContent),
          data: filteredSkills.map((skill) => (isNaN(skill.correctPercent) ? 0 : skill.correctPercent)),
        };
      }

      return acc;
    }, {});
  }, [domains, skillsData]);

  const [selectedDomain, setSelectedDomain] = useState("");

  useEffect(() => {
    if (!selectedDomain || !domainData[selectedDomain]) {
      const firstDomain = Object.keys(domainData)[0];
      setSelectedDomain(firstDomain || "");
    }
  }, [domainData, selectedDomain]);

  const radarData = {
    labels: domainData[selectedDomain]?.skills || [],
    datasets: [
      {
        label: `${selectedDomain} Skills`,
        data: domainData[selectedDomain]?.data || [],
        fill: true,
        backgroundColor: "rgba(36, 70, 182, 0.1)",
        borderColor: "rgb(36, 70, 182)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          font: {
            size: 12,
          },
          color: "#21242c",
        },
        pointLabels: {
          font: {
            size: 13,
          },
          color: "#21242c",
          padding: 8,
        },
      },
    },
  };

  return (
    <div className={cx("radar-chart-wrapper")}>
      <div className={cx("navbar")}>
        {Object.keys(domainData)?.map((domain) => (
          <button
            key={domain}
            className={cx("nav-button", { active: selectedDomain === domain })}
            onClick={() => setSelectedDomain(domain)}
          >
            {domain}
          </button>
        ))}
      </div>
      <div className={cx("radar-chart")}>
        <Radar data={radarData} options={options} />
      </div>
    </div>
  );
}

export default SkillRadarChart;
