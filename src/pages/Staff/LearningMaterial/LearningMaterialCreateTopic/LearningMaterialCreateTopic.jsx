import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import classNames from "classnames/bind";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import LearningMaterialCreateHeader from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateHeader";
import MultiStepProgressBar from "~/components/Staff/LearningMaterialCreate/MultiStepProgressBar";
import TopicItem from "~/components/Staff/LearningMaterialCreate/TopicItem";
import TopicItemPreview from "~/components/Staff/LearningMaterialCreate/TopicItemPreview";
import { steps } from "~/data/Staff/StepProgressBar";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./LearningMaterialCreateTopic.module.scss";

const cx = classNames.bind(styles);

function LearningMaterialCreateTopic() {
  const navigate = useNavigate();
  const currentStep = 1;

  const [topics, setTopics] = useState([
    {
      id: "topic-1",
      title: "Introduction",
      lessons: [
        {
          id: "lesson-1",
          title: "VSAT applications in big cities",
          type: "1 Text & Images",
        },
        { id: "lesson-2", title: "VSAT Math", type: "Empty" },
      ],
    },
    {
      id: "topic-2",
      title: "VSAT Installation",
      lessons: [
        {
          id: "lesson-3",
          title: "Site survey for VSAT installation in big cities",
          type: "1 Text & Images",
        },
        {
          id: "lesson-4",
          title: "Monitoring VSAT performance in densely populated regions",
          type: "1 Text & Images",
        },
        {
          id: "lesson-5",
          title: "Equipment required for VSAT installation in big cities",
          type: "1 Text & Images",
        },
        {
          id: "lesson-6",
          title: "VSAT installation process in urban areas",
          type: "1 Text & Images",
        },
      ],
    },
  ]);
  const [isShowCreateTopicMain, setIsShowCreateTopicMain] = useState(false);

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
    setIsShowCreateTopicMain(true);
  };

  const handlePrevious = () => {
    navigate(steps[currentStep - 1].path);
  };
  const handleNext = () => {
    navigate(steps[currentStep + 1].path);
  };

  return (
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
                              key={topic.id}
                              topic={topic}
                              dragHandleProps={provided.dragHandleProps}
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

            {isShowCreateTopicMain && (
              <div className={cx("create-topic-preview")}>
                <TopicItemPreview
                  setTopics={setTopics}
                  setIsShowCreateTopicMain={setIsShowCreateTopicMain}
                />
              </div>
            )}
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
            <button className={cx("back-btn")} onClick={handlePrevious}>
              Back
            </button>
            <button className={cx("continue-btn")} onClick={handleNext}>
              Continue
            </button>
          </div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>
  );
}

export default LearningMaterialCreateTopic;
