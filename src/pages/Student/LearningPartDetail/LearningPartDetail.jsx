import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderAuthen from "~/layouts/Landing/HeaderAuthen";
import LearningPartDetailContent from "~/layouts/Student/LearningPartDetail/LearningPartDetailContent";
import LearningPartDetailSidebar from "~/layouts/Student/LearningPartDetail/LearningPartDetailSidebar";
import apiClient from "~/services/apiService";
import styles from "./LearningPartDetail.module.scss";
const cx = classNames.bind(styles);

function LearningPartDetail() {
  const { slug, unitAreaId, lessonId } = useParams();
  const [uniArea, setUnitArea] = useState(null)
  const [activeLesson, setActiveLesson] = useState(null);

  useEffect(() => {
    const fetchUnitArea = async () => {
      try {
        const response = await apiClient.get(`/unit-area-progress/${unitAreaId}/details`)
        const data = response.data.data;
        setUnitArea(data);
        if (data?.lessons?.length > 0) {
          const foundLesson = data.lessons.find((lesson) => lesson.id === lessonId);
          setActiveLesson(foundLesson || data.lessons[0]);
        }
      } catch (error) {
        console.error("Error while fetching unit area:", error)
      }
    }

    fetchUnitArea()
  }, [lessonId, unitAreaId])

  return (
    <div className={cx("learning-part-detail-wrapper")}>
      <HeaderAuthen />
      <div className={cx("learning-part-detail-container")}>
        <LearningPartDetailSidebar slug={slug} uniAreaData={uniArea} activeLesson={activeLesson}
          onLessonSelect={setActiveLesson} />
        <LearningPartDetailContent lesson={activeLesson} />
      </div>
    </div>
  )
}

export default LearningPartDetail
