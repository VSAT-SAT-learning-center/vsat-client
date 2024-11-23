import { Skeleton } from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import NoQuestionData from "~/components/Staff/QuestionExamCreate/NoQuestionData";
import LearningItem from "~/components/Student/Learning/LearningItem/LearningItem";
import LearningProfileView from "~/components/Student/Learning/LearningProfileView";
import LearningLayout from "~/layouts/Student/LearningLayout/LearningPageLayout";
import apiClient from "~/services/apiService";
import styles from "./Learning.module.scss";

const cx = classNames.bind(styles);

function Learning() {
  const [profiles, setProfiles] = useState([]);
  const [isWaiting, setIsWaiting] = useState(false);
  const [showLearninProfileView, setShowLearningProfileView] = useState(false)
  const [profileSelected, setProfileSelected] = useState(null)

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setIsWaiting(true);
        const response = await apiClient.get(`/study-profiles/getStudyProfileByAccountId`);
        setProfiles(response.data.data);
      } catch (error) {
        console.error("Error fetching learning materials:", error);
      } finally {
        setIsWaiting(false);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <>
      {showLearninProfileView && <LearningProfileView profile={profileSelected} setShowLearningProfileView={setShowLearningProfileView} />}
      <LearningLayout>
        <div className={cx("learning-wrapper")}>
          <div className={cx("learning-container")}>
            <div className={cx("learning-header")}>
              <div className={cx("learning-text")}>Study Profile</div>
            </div>
            <div
              className={cx(
                isWaiting || profiles.length > 0
                  ? "learning-content"
                  : "learning-no-content"
              )}
            >
              {isWaiting ? (
                <>
                  {[...Array(2)].map((_, i) => (
                    <Skeleton
                      key={i}
                      animation="wave"
                      variant="rectangular"
                      width="100%"
                      height={212}
                    />
                  ))}
                </>
              ) : profiles.length > 0 ? (
                profiles.map((item) => (
                  <LearningItem
                    key={item.id}
                    item={item}
                    setShowLearningProfileView={setShowLearningProfileView}
                    setProfileSelected={setProfileSelected}
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
    </>
  );
}

export default Learning;
