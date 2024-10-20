import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import LearningMaterialCreateHeader from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateHeader";
import PublishSidebarItem from "~/components/Staff/LearningMaterialCreate/LessonCreatePublishSidebar/PublishSidebarItem";
import MultiStepProgressBar from "~/components/Staff/LearningMaterialCreate/MultiStepProgressBar";
import { steps } from "~/data/Staff/StepProgressBar";
import PageLayout from "~/layouts/Staff/PageLayout";
import LearningPartDetailContentMath from "~/layouts/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentMath";
import LearningPartDetailContentRW from "~/layouts/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentRW";
import apiClient from "~/services/apiService";
import styles from "./LearningMaterialPublish.module.scss";
const cx = classNames.bind(styles);

function LearningMaterialPublish() {
  const currentStep = 3;
  const { unitId, lessonId } = useParams();
  const [loadTopics, setLoadTopics] = useState([]);
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const fetchUnitAreas = async () => {
      try {
        const topicsResponse = await apiClient.get(
          `/unit-areas/by-unit/${unitId}`
        );
        const topics = topicsResponse.data.data;
        setLoadTopics(topics);
      } catch (error) {
        console.error("Error fetching unit areas:", error);
      }
    };

    if (unitId) {
      fetchUnitAreas();
    }
  }, [unitId]);
  useEffect(() => {
    if (!lessonId) return;

    const fetchLesson = async () => {
      try {
        const lessonResponse = await apiClient.get(`/lessons/${lessonId}`);
        const { id: lessonNewId, title, type, lessonContents } = lessonResponse.data.data;
        setLesson({
          lessonId: lessonNewId,
          title,
          type,
          lessonContents,
        });
      } catch (error) {
        console.error("Error fetching lesson information:", error);
      }
    };

    fetchLesson();
  }, [lessonId]);
  return (
    <PageLayout>
      <div className={cx("learning-material-publish-container")}>
        <LearningMaterialCreateHeader title="Publish" />
        <MultiStepProgressBar steps={steps} currentStep={currentStep} />
        <div className={cx("publish-container")}>
          <div className={cx("publish-sidebar-wrapper")}>
            <div className={cx("publish-sidebar-container")}>
              {loadTopics.map((topic) => (
                <PublishSidebarItem key={topic.id} topic={topic} unitId={unitId} lessonId={lessonId} />
              ))}
            </div>
          </div>
          <div className={cx("publish-content-wrapper")}>
            <div className={cx("publish-content-container")}>
              {lesson?.type === "Text" ? (
                <LearningPartDetailContentRW lesson={lesson} />
              ) : (
                <LearningPartDetailContentMath lesson={lesson} />
              )}
            </div>
            <div className={cx("publish-bottom")}>
              <button className={cx("publish-btn")}>Publish</button>
            </div>
          </div>

        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>
  );
}

export default LearningMaterialPublish;
