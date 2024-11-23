import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UnitTest from "~/assets/images/content/unittest.gif";
import UnitArea from "~/components/Student/LearningPart/LearningPartContent/UnitArea";
import apiClient from "~/services/apiService";
import styles from "./LearningPartContent.module.scss";
const cx = classNames.bind(styles);

function LearningPartContent({ learningContent, activeUnit, sectionId }) {
  const navigate = useNavigate()
  const [testStatusMap, setTestStatusMap] = useState({});

  useEffect(() => {
    const fetchContinueQuestion = async () => {
      // Check inside the function
      if (!activeUnit?.unitProgressId) {
        console.log("No active unit or unitProgressId found.");
        return;
      }

      try {
        const { data: latestQuizData } = await apiClient.get(`/quiz-attempts/${activeUnit?.unitProgressId}/latest`);
        if (latestQuizData?.data?.status === "In Progress") {
          setTestStatusMap((prevState) => ({
            ...prevState,
            [activeUnit.unitProgressId]: "Resume",
          }));
        } else {
          setTestStatusMap((prevState) => ({
            ...prevState,
            [activeUnit.unitProgressId]: "Start",
          }));
        }
      } catch (error) {
        console.error("Error while fetching continue question:", error);
      }
    };

    // Call the function
    fetchContinueQuestion();
  }, [activeUnit?.unitProgressId]);

  const handleClickUnitTest = () => {
    const formattedTitle = activeUnit.unitTitle
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    navigate(`/learning/${learningContent}/${activeUnit.unitId}:${formattedTitle}/${activeUnit.unitProgressId}/unit-test`);
  }

  const testStatus = testStatusMap[activeUnit?.unitProgressId] || "Start";

  return (
    <div className={cx("learning-part-content-container")}>
      <div className={cx("content-header")}>
        <div className={cx("content-title")}>{activeUnit?.unitTitle}</div>
      </div>
      <div className={cx("content-main")}>
        <div className={cx("content-about-unit")}>
          <div className={cx("about-unit-title")}>About this unit</div>
          <div className={cx("about-unit-desc")}>{activeUnit?.description}</div>
        </div>
        {activeUnit?.unitAreas.map((unitArea) => (
          <UnitArea
            key={unitArea.unitAreaId}
            unitArea={unitArea}
            learningContent={learningContent}
            activeUnit={activeUnit}
            sectionId={sectionId}
          />
        ))}
        <div className={cx("unit-test-content")}>
          <div className={cx("unit-test-infor")}>
            <div className={cx("title")} onClick={handleClickUnitTest}>Unit test</div>
            <div className={cx("desc")}>Level up on all the skills in this unit and collect up to 400 Mastery points!</div>
            <button className={cx("test-btn")} onClick={handleClickUnitTest}>{testStatus} Unit Test</button>
          </div>
          <div className={cx("unit-test-img")}>
            <img src={UnitTest} alt="unit-test-img" className={cx("test-image")} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearningPartContent;
