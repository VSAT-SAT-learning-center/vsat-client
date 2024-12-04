import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import LessonMathConc from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentMath/LessonMathConc";
import LessonMathDef from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentMath/LessonMathDef";
import LessonMathPrac from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentMath/LessonMathPrac";
import LessonThingsRemember from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentMath/LessonThingsRemember";
import LessonApp from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentRW/LessonApp";
import LessonConc from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentRW/LessonConc";
import LessonDef from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentRW/LessonDef";
import LessonPrac from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentRW/LessonPrac";
import LessonTips from "~/components/Student/LearningPartDetail/LearningPartDetailContent/LearningPartDetailContentRW/LessonTips";
import EditAvancedView from "./EditAvancedView";
import styles from "./EditDetailView.module.scss";
import EditNormalView from "./EditNormalView";
import EditQuestionView from "./EditQuestionView";
const cx = classNames.bind(styles);

function EditDetailView({ lesson, setLessonData, setShowEditDetailView }) {
  const [sortedLessonContents, setSortedLessonContents] = useState([]);
  const [showEditDefinition, setShowEditDefinition] = useState(false);
  const [showEditQuestion, setShowEditQuestion] = useState(false);
  const [showEditSpecial, setShowEditSpecial] = useState(false);
  const [editLessonData, setEditLessonData] = useState(null);
  useEffect(() => {
    if (lesson?.lessonContents) {
      const sortOrder = [
        "Definition",
        "Conceptual",
        "Application",
        "Tips & Tricks",
        "Practice",
      ];
      const sorted = [...lesson.lessonContents].sort(
        (a, b) =>
          sortOrder.indexOf(a.contentType) - sortOrder.indexOf(b.contentType)
      );
      setSortedLessonContents(sorted);
    }
  }, [lesson]);

  const handleEditLessonContentMath = (lesson) => {
    if (
      lesson.contentType === "Definition" ||
      lesson.contentType === "Tips & Tricks" ||
      lesson.contentType === "Conceptual"
    ) {
      setShowEditDefinition(true);
      setEditLessonData(lesson);
    } else if (lesson.contentType === "Practice") {
      setShowEditQuestion(true);
      setEditLessonData(lesson);
    }
  };

  const handleEditLessonContentRW = (lesson) => {
    if (
      lesson.contentType === "Application" ||
      lesson.contentType === "Tips & Tricks" ||
      lesson.contentType === "Conceptual"
    ) {
      setShowEditDefinition(true);
      setEditLessonData(lesson);
    } else if (lesson.contentType === "Practice") {
      setShowEditQuestion(true);
      setEditLessonData(lesson);
    } else if (lesson.contentType === "Definition") {
      setShowEditSpecial(true);
      setEditLessonData(lesson);
    }
  };

  const updateLessonContent = (updatedContent) => {
    setSortedLessonContents((prevContents) =>
      prevContents.map((content) =>
        content.id === updatedContent.id ? updatedContent : content
      )
    );
  };

  const handleEditLesson = () => {
    const updatedLesson = {
      ...lesson,
      lessonContents: sortedLessonContents,
    };
    setLessonData(updatedLesson);
    setShowEditDetailView(false);
  }

  return (
    <>
      {showEditDefinition && (
        <EditNormalView
          editLessonData={editLessonData}
          setShowEditDefinition={setShowEditDefinition}
          updateLessonData={updateLessonContent}
        />
      )}
      {showEditQuestion && (
        <EditQuestionView
          editLessonData={editLessonData}
          setShowEditQuestion={setShowEditQuestion}
          updateLessonData={updateLessonContent}
        />
      )}
      {showEditSpecial && (
        <EditAvancedView
          editLessonData={editLessonData}
          setShowEditSpecial={setShowEditSpecial}
          updateLessonData={updateLessonContent}
        />
      )}
      <div className={cx("edit-detail-view-wrapper")}>
        <div className={cx("edit-detail-view-container")}>
          <div className={cx("edit-detail-view-header")}>
            <div
              className={cx("view-back")}
              onClick={() => setShowEditDetailView(false)}
            >
              <i className={cx("fa-solid fa-arrow-left", "back-icon")}></i>
            </div>
            <div className={cx("view-title")}>Edit Lesson</div>
            <button className={cx("view-empty")} onClick={handleEditLesson}>
              <span className={cx("text")}>Save</span>
            </button>
          </div>
          <div className={cx("edit-detail-content-container")}>
            {lesson?.type === "Math" ? (
              <div className={cx("edit-detail-view-content")}>
                {sortedLessonContents?.map((lessonContent) => (
                  <div
                    className={cx("detail-content", "math-content")}
                    key={lessonContent?.id}
                  >
                    <div className={cx("detail-header")}>
                      <div className={cx("title")}>
                        {lessonContent?.contentType}
                      </div>
                      <button
                        className={cx("action")}
                        onClick={() =>
                          handleEditLessonContentMath(lessonContent)
                        }
                      >
                        <i className={cx("fa-regular fa-pen-to-square")}></i>
                      </button>
                    </div>
                    <div className={cx("detail-main")}>
                      {lessonContent.contentType === "Definition" && (
                        <LessonMathDef lessonContent={lessonContent} />
                      )}
                      {lessonContent.contentType === "Conceptual" && (
                        <LessonMathConc lessonContent={lessonContent} />
                      )}
                      {lessonContent.contentType === "Practice" && (
                        <LessonMathPrac lessonContent={lessonContent} />
                      )}
                      {lessonContent.contentType === "Tips & Tricks" && (
                        <LessonThingsRemember lessonContent={lessonContent} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={cx("edit-detail-view-content")}>
                {sortedLessonContents?.map((lessonContent) => (
                  <div
                    className={cx("detail-content", "rw-content")}
                    key={lessonContent?.id}
                  >
                    <div className={cx("detail-header")}>
                      <div className={cx("title")}>
                        {lessonContent?.contentType}
                      </div>
                      <button
                        className={cx("action")}
                        onClick={() => handleEditLessonContentRW(lessonContent)}
                      >
                        <i className={cx("fa-regular fa-pen-to-square")}></i>
                      </button>
                    </div>
                    <div className={cx("detail-main")}>
                      {lessonContent.contentType === "Definition" && (
                        <LessonDef lessonContent={lessonContent} />
                      )}
                      {lessonContent.contentType === "Conceptual" && (
                        <LessonConc lessonContent={lessonContent} />
                      )}
                      {lessonContent.contentType === "Application" && (
                        <LessonApp lessonContent={lessonContent} />
                      )}
                      {lessonContent.contentType === "Tips & Tricks" && (
                        <LessonTips lessonContent={lessonContent} />
                      )}
                      {lessonContent.contentType === "Practice" && (
                        <LessonPrac lessonContent={lessonContent} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default EditDetailView;
