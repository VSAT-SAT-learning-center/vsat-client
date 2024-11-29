import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import NoQuestionData from "~/components/Staff/QuestionExamCreate/NoQuestionData";
import LearningLayout from "~/layouts/Student/LearningLayout/LearningPageLayout";
import apiClient from "~/services/apiService";
import { formatDate } from "~/utils/formatDate";
import styles from "./LearningProcess.module.scss";

const cx = classNames.bind(styles);

function LearningProcess() {
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const staticLearningMaterials = [
    {
      id: 1,
      title: "Reading & Writing",
      description:
        "Master critical reading, evidence-based analysis, and English conventions to excel in SAT Reading & Writing.",
    },
    {
      id: 2,
      title: "Math",
      description:
        "Build confidence in algebra, geometry, data analysis, and advanced math concepts to tackle every SAT Math challenge with ease.",
    },
  ];
  const [learningMaterials, setLearningMaterials] = useState([]);
  useEffect(() => {
    const fetchLearningMaterials = async () => {
      try {
        const response = await apiClient.get(
          "/study-profiles/getStudyProfileWithTargetLearningDetailWithStatus"
        );
        const fetchedMaterials =
          response.data?.data[0]?.targetlearningdetail || [];

        const mappedMaterials = Array.isArray(fetchedMaterials)
          ? fetchedMaterials.map((material) => {
            const matchingStaticMaterial = staticLearningMaterials.find(
              (staticMaterial) =>
                staticMaterial.title
                  .toLowerCase()
                  .includes(material.section.name.toLowerCase())
            );

            return {
              ...material,
              section: {
                ...material.section,
                description: matchingStaticMaterial
                  ? matchingStaticMaterial.description
                  : material.section.description,
              },
            };
          })
          : [];

        setLearningMaterials(mappedMaterials);
      } catch (error) {
        console.error("Error while fetching learning materials:", error);
      }
    };

    fetchLearningMaterials();
  }, [staticLearningMaterials]);

  const handleLearnSection = (item) => {
    if (item.status === "Inactive") return;
    if (item.section.name === "Reading & Writing") {
      navigate(`/learning/sat-reading-and-writing/${item.id}`);
    } else {
      navigate(`/learning/sat-math/${item.id}`);
    }
  };

  return (
    <LearningLayout>
      <div className={cx("learning-process-wrapper")}>
        <div className={cx("learning-process-container")}>
          <div className={cx("learning-process-header")}>
            <div className={cx("learning-process-text")}>Learning Process</div>
          </div>
          <div
            className={cx(
              learningMaterials.length > 0
                ? "learning-process-content"
                : "learning-process-no-content"
            )}
          >
            {learningMaterials.length > 0 ? (
              learningMaterials.map((item) => (
                <div
                  key={item.id}
                  className={cx("learning-card")}
                  onClick={() => handleLearnSection(item)}
                >
                  <div className={cx("card-header")}>
                    <div className={cx("card-title")}>
                      SAT {item.section.name}
                    </div>
                  </div>
                  <div className={cx("card-description")}>
                    {item.section.description}
                  </div>
                  <div className={cx("card-footer")}>
                    <div className={cx("footer-left")}>
                      <div className={cx("level")}>{item.level.name}</div>
                      <div className={cx("topics-lessons")}>
                        <span>{item.unitprogressCount} Units</span> -{" "}
                        <span>{item.lessonProgressCount} Lessons</span>
                      </div>
                      <div className={cx("created-at")}>
                        Created at: {formatDate(item.createdat)}
                      </div>
                    </div>
                    <div
                      className={cx(
                        "status",
                        item.status === "Active" ? "approved" : "rejected"
                      )}
                    >
                      {item.status}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <NoQuestionData />
            )}
          </div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </LearningLayout>
  );
}

export default LearningProcess;
