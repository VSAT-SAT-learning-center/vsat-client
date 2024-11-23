import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderAuthen from "~/layouts/Landing/HeaderAuthen";
import LearningProgressContent from "~/layouts/Student/LearningProgress/LearningProgressContent";
import LearningProgressSidebar from "~/layouts/Student/LearningProgress/LearningProgressSidebar";
import apiClient from "~/services/apiService";
import styles from "./LearningProgress.module.scss";

const cx = classNames.bind(styles);

function LearningProgress() {
  const { slug } = useParams();
  const [selectedContent, setSelectedContent] = useState(slug);
  const [unitProgressData, setUnitProgressData] = useState([]);

  useEffect(() => {
    const fetchUnitProgress = async () => {
      try {
        const response = await apiClient.get(`/unit-progress/${selectedContent}`);
        setUnitProgressData(response.data.data || []);
      } catch (error) {
        console.error("Error fetching unit progress:", error);
      }
    };

    if (selectedContent) {
      fetchUnitProgress();
    }
  }, [selectedContent]);

  return (
    <div className={cx("learning-progress-wrapper")}>
      <HeaderAuthen />
      <div className={cx("learning-progress-container")}>
        <LearningProgressSidebar
          learningContent={selectedContent}
          onSelectContent={setSelectedContent}
        />
        <div className={cx("learning-progress-content")}>
          <div className={cx("learning-progress-title")}>Learning progress</div>
          <LearningProgressContent unitProgressData={unitProgressData} />
        </div>
      </div>
    </div>
  );
}

export default LearningProgress;
