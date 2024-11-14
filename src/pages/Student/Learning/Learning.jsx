import classNames from "classnames/bind";
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

  useEffect(() => {
    const fetchLearningMaterials = async () => {
      try {
        const response = await apiClient.get(`/study-profiles`);
        setLearningMaterials(response.data.data);
      } catch (error) {
        console.error("Error fetching learning materials:", error);
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
          <div className={cx("learning-content")}>
            {learningMaterials.length > 0 ? (
              <div className={cx("learning-content-item", "learning-item-container")}>
                {learningMaterials.map((item) => (
                  <LearningItem key={item.id} item={item} />
                ))}
              </div>
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
