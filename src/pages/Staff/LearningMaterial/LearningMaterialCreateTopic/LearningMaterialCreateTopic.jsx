import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import classNames from "classnames/bind";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import LearningMaterialCreateHeader from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateHeader";
import LessonTypeModal from "~/components/Staff/LearningMaterialCreate/LessonTypeModal";
import MultiStepProgressBar from "~/components/Staff/LearningMaterialCreate/MultiStepProgressBar";
import TopicItem from "~/components/Staff/LearningMaterialCreate/TopicItem";
import TopicItemPreview from "~/components/Staff/LearningMaterialCreate/TopicItemPreview";
import { steps } from "~/data/Staff/StepProgressBar";
import PageLayout from "~/layouts/Staff/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./LearningMaterialCreateTopic.module.scss";
const cx = classNames.bind(styles);

function LearningMaterialCreateTopic() {
  const navigate = useNavigate();
  const currentStep = 1;
  const { unitId } = useParams();
  const inputLessonRef = useRef(null);
  const [topics, setTopics] = useState([]);
  const [createTopicPreviews, setCreateTopicPreviews] = useState([]);
  const [lessonType, setLessonType] = useState("Empty");
  const [isShowLessonTypeModal, setIsShowLessonTypeModal] = useState(false);

  const onDragEnd = (result) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (type === "topic") {
      const reorderedTopics = Array.from(topics);
      const [movedTopic] = reorderedTopics.splice(source.index, 1);
      reorderedTopics.splice(destination.index, 0, movedTopic);
      setTopics(reorderedTopics);
    } else if (type === "lesson") {
      const sourceTopicIndex = topics.findIndex(
        (topic) => topic.id === source.droppableId
      );
      const destinationTopicIndex = topics.findIndex(
        (topic) => topic.id === destination.droppableId
      );

      const sourceLessons = Array.from(topics[sourceTopicIndex].lessons);
      const [movedLesson] = sourceLessons.splice(source.index, 1);

      if (sourceTopicIndex === destinationTopicIndex) {
        sourceLessons.splice(destination.index, 0, movedLesson);
        const updatedTopics = [...topics];
        updatedTopics[sourceTopicIndex].lessons = sourceLessons;
        setTopics(updatedTopics);
      } else {
        const destinationLessons = Array.from(
          topics[destinationTopicIndex].lessons
        );
        destinationLessons.splice(destination.index, 0, movedLesson);

        const updatedTopics = [...topics];
        updatedTopics[sourceTopicIndex].lessons = sourceLessons;
        updatedTopics[destinationTopicIndex].lessons = destinationLessons;

        setTopics(updatedTopics);
      }
    }
  };

  const handleClickCreateNewTopic = () => {
    setCreateTopicPreviews((prevPreviews) => [
      ...prevPreviews,
      { id: uuidv4() },
    ]);
  };

  const handleRemovePreview = (id) => {
    setCreateTopicPreviews((prevPreviews) =>
      prevPreviews.filter((preview) => preview.id !== id)
    );
  };

  const handleNext = async () => {
    try {
      await apiClient.post("/unit-areas/create", topics);
      navigate(`${steps[currentStep + 1].path}/${unitId}`);
    } catch (error) {
      console.error("Error creating unit:", error);
    }
  };


  const isContinueEnabled = topics.length > 0;

  return (
    <>
      {isShowLessonTypeModal && (
        <LessonTypeModal
          setIsShowLessonTypeModal={setIsShowLessonTypeModal}
          setLessonType={setLessonType}
          inputLessonRef={inputLessonRef}
        />
      )}
      <PageLayout>
        <div className={cx("learning-material-create-topics-container")}>
          <LearningMaterialCreateHeader title="Unit Topic" />
          <MultiStepProgressBar steps={steps} currentStep={currentStep} />
          <div className={cx("create-topics-container")}>
            <div className={cx("create-topics-top")}>
              <div className={cx("create-topics-title")}>Unit Topics</div>
            </div>
            <div className={cx("create-topics-content")}>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="all-topics" type="topic">
                  {(provided) => (
                    <div
                      className={cx("create-topics-list")}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {topics.map((topic, index) => (
                        <Draggable
                          key={topic.id}
                          draggableId={topic.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                            >
                              <TopicItem
                                inputLessonRef={inputLessonRef}
                                key={topic.id}
                                topic={topic}
                                setTopics={setTopics}
                                dragHandleProps={provided.dragHandleProps}
                                setIsShowLessonTypeModal={
                                  setIsShowLessonTypeModal
                                }
                                lessonType={lessonType}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              {createTopicPreviews.map((preview) => (
                <div key={preview.id} className={cx("create-topic-preview")}>
                  <TopicItemPreview
                    inputLessonRef={inputLessonRef}
                    id={preview.id}
                    unitId={unitId}
                    setTopics={setTopics}
                    onCancel={handleRemovePreview}
                    setIsShowLessonTypeModal={setIsShowLessonTypeModal}
                    lessonType={lessonType}
                  />
                </div>
              ))}
              <div
                className={cx("create-topic-action")}
                onClick={handleClickCreateNewTopic}
              >
                <div className={cx("create-icon")}>
                  <i className={cx("fa-regular fa-circle-plus", "icon")}></i>
                </div>
                <div className={cx("create-text")}>New topic</div>
              </div>
            </div>
            <div className={cx("create-topics-bottom")}>
              <button
                className={cx("continue-btn", {
                  "disabled-btn": !isContinueEnabled,
                })}
                disabled={!isContinueEnabled}
                onClick={handleNext}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
        <LearningMaterialCreateFooter />
      </PageLayout>
    </>
  );
}

export default LearningMaterialCreateTopic;
