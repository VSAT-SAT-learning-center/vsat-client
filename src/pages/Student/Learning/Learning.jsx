import classNames from "classnames/bind";
import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import LearningItem from "~/components/Student/Learning/LearningItem/LearningItem";
import NoQuestionData from "~/components/Staff/QuestionExamCreate/NoQuestionData";
import LearningLayout from "~/layouts/Student/LearningLayout/LearningPageLayout";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import styles from "./Learning.module.scss";
import apiClient from "~/services/apiService";

const cx = classNames.bind(styles);

function Learning() {
  const [learningMaterials, setLearningMaterials] = useState([]);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    const fetchLearningMaterials = async () => {
      try {
        setIsWaiting(true);
        const response = await apiClient.get(`/study-profiles/getStudyProfileByAccountId`);
        setLearningMaterials(response.data.data);
      } catch (error) {
        console.error("Error fetching learning materials:", error);
      } finally {
        setIsWaiting(false);
      }
    };

    fetchLearningMaterials();
  }, []);

  return (
    <LearningLayout>
      <div className={cx("learning-wrapper")}>
        <div className={cx("learning-container")}>
          <div className={cx("learning-header")}>
            <div className={cx("learning-text")}>Study Profile</div>
          </div>
          <div
            className={cx(
              isWaiting || learningMaterials.length > 0
                ? "learning-content"
                : "learning-no-content"
            )}
          >
            {isWaiting ? (
              <>
                {[...Array(3)].map((_, i) => (
                  <Skeleton
                    key={i}
                    animation="wave"
                    variant="rectangular"
                    width="100%"
                    height={212}
                  />
                ))}
              </>
            ) : learningMaterials.length > 0 ? (
              learningMaterials.map((item) => (
                <LearningItem
                  key={item.id}
                  item={item}
                />
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

export default Learning;
