import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "~/components/General/Loader";
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
  const navigate = useNavigate();
  const currentStep = 4;
  const { unitId, lessonId } = useParams();
  console.log(lessonId);

  const [loadTopics, setLoadTopics] = useState([]);
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(false)

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
        const {
          id: lessonNewId,
          title,
          type,
          lessonContents,
        } = lessonResponse.data.data;
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

  const handlePublishUnit = async () => {
    try {
      setLoading(true)
      await apiClient.post(`/units/${unitId}/submit`);
      toast.success("Publish learning material successfully!", {
        autoClose: 1500
      })
      navigate("/staff/learning-material/create");
    } catch (error) {
      console.error("Error publish unit:", error);
      toast.error("Publish learning material failed!", {
        autoClose: 1500
      })
    } finally {
      setLoading(false)
    }
  };
  return (
    <>
      {loading && <Loader />}
      <PageLayout>
        <div className={cx("learning-material-publish-container")}>
          <LearningMaterialCreateHeader title="Publish" />
          <MultiStepProgressBar steps={steps} currentStep={currentStep} />
          <div className={cx("publish-container")}>
            <div className={cx("publish-sidebar-wrapper")}>
              <div className={cx("publish-sidebar-container")}>
                {loadTopics.map((topic) => (
                  <PublishSidebarItem
                    key={topic.id}
                    topic={topic}
                    unitId={unitId}
                    lessonId={lessonId}
                  />
                ))}
              </div>
            </div>
            <div className={cx("publish-content-wrapper")}>
              <div className={cx("publish-content-container")}>
                {lesson?.type === "Text" ? (
                  <LearningPartDetailContentRW lesson={lesson} type={"preview"} />
                ) : (
                  <LearningPartDetailContentMath lesson={lesson} type={"preview"} />
                )}
              </div>
              <div className={cx("publish-bottom")}>
                <button className={cx("publish-btn")} onClick={handlePublishUnit}>
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>
        <LearningMaterialCreateFooter />
      </PageLayout>
    </>
  );
}

export default LearningMaterialPublish;
