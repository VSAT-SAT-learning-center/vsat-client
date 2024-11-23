import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderAuthen from "~/layouts/Landing/HeaderAuthen";
import LearningPartContent from "~/layouts/Student/LearningPart/LearningPartContent";
import LearningPartSidebar from "~/layouts/Student/LearningPart/LearningPartSidebar";
import apiClient from "~/services/apiService";
import styles from "./LearningPart.module.scss";
const cx = classNames.bind(styles);
function LearningPart() {
  const { slug, sectionId } = useParams();
  const [units, setUnits] = useState([])
  const [activeUnit, setActiveUnit] = useState(null);
  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await apiClient.get(`/unit-progress/${sectionId}`)
        const fetchedUnits = response.data.data;
        setUnits(fetchedUnits);
        if (fetchedUnits.units.length > 0) {
          setActiveUnit(fetchedUnits.units[0]);
        }
      } catch (error) {
        console.error("Error whitle fetching units:", error);
      }
    }
    fetchUnits()
  }, [sectionId])
  return (
    <div className={cx("learning-part-wrapper")}>
      <HeaderAuthen />
      <div className={cx("learning-part-container")}>
        <LearningPartSidebar learningContent={slug} units={units} activeUnit={activeUnit}
          setActiveUnit={setActiveUnit} />
        <LearningPartContent learningContent={slug} activeUnit={activeUnit} sectionId={sectionId} />
      </div>
    </div>
  );
}

export default LearningPart;
