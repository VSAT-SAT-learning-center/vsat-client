import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import apiClient from "~/services/apiService";
import styles from "./QuestionQuizzCreatePreview.module.scss"; 
const cx = classNames.bind(styles);

function QuestionQuizzCreatePreview({ questionPreviewData, setIsShowQuestionPreview, setIsShowCreateQuestionModal, fetchQuestions }) { 
  const [sectionName, setSectionName] = useState("");
  const [levelName, setLevelName] = useState("");

  const fetchSectionAndLevel = useMemo(() => {
    const fetchSectionName = async () => {
      try {
        if (questionPreviewData?.sectionId) {
          const response = await apiClient.get(`/section/${questionPreviewData.sectionId}`);
          return response.data.data.name;
        }
      } catch (error) {
        console.error("Error fetching section name:", error);
        return "Unknown Section";
      }
    };

    const fetchLevelName = async () => {
      try {
        if (questionPreviewData?.levelId) {
          const response = await apiClient.get(`/level/${questionPreviewData.levelId}`);
          return response.data.data.name;
        }
      } catch (error) {
        console.error("Error fetching level name:", error);
        return "Unknown Level";
      }
    };

    return { fetchSectionName, fetchLevelName };
  }, [questionPreviewData?.sectionId, questionPreviewData?.levelId]);

  useEffect(() => {
    const loadSectionAndLevelData = async () => {
      const [section, level] = await Promise.all([
        fetchSectionAndLevel.fetchSectionName(),
        fetchSectionAndLevel.fetchLevelName(),
      ]);
      setSectionName(section);
      setLevelName(level);
    };

    if (questionPreviewData?.sectionId || questionPreviewData?.levelId) {
      loadSectionAndLevelData();
    }
  }, [fetchSectionAndLevel, questionPreviewData?.levelId, questionPreviewData?.sectionId]);

  const handleSaveQuestion = async () => {
    try {
      await apiClient.post('/questions', questionPreviewData);
      setIsShowQuestionPreview(false);
      setIsShowCreateQuestionModal(false);
      fetchQuestions();
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  return (
    <div className={cx("question-quizz-create-preview-wrapper")}> 
      <div className={cx("question-quizz-create-preview-container")}> 
        <div className={cx("question-quizz-create-preview-header")}> 
          <div className={cx("preview-back")} onClick={() => setIsShowQuestionPreview(false)}>
            <i className={cx("fa-regular fa-arrow-left")}></i>
          </div>
          <div className={cx("preview-section")}>{sectionName}</div>
          <div className={cx("preview-level")}>{levelName}</div>
        </div>
        <div className={cx("question-quizz-create-preview-content")}> 
          <div className={cx("long-dashes")}></div>
          <div className={cx("preview-content-container")}>
            <div className={cx("preview-content-question")}>
              <div
                className={cx("question-rw-rerender-content")}
                dangerouslySetInnerHTML={{ __html: questionPreviewData?.content }}
              ></div>
            </div>
            <div className={cx("preview-content-answer")}>
              <div className={cx("mark-answer-container")}>
                <div className={cx("mark-answer")}>
                  <i className={cx("fa-sharp fa-regular fa-bookmark", "icon-mark")}></i>
                  <span className={cx("mark-text")}>Mark for Review</span>
                </div>
              </div>
              <div className={cx("long-dashes")}></div>
              <div className={cx("answer-list-container")}>
                {questionPreviewData?.answers.map((answer) => (
                  <div
                    key={answer.id}
                    className={cx("answer-item")}
                  >
                    <span className={cx("answer-label")}>{answer.label + ":"}</span>
                    <span
                      className={cx("answer-rerender-content")}
                      dangerouslySetInnerHTML={{ __html: answer.text }}
                    ></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={cx("long-dashes")}></div>
        </div>
        <div className={cx("question-quizz-create-preview-footer")}> 
          <button className={cx("cancel-btn")} onClick={() => setIsShowQuestionPreview(false)}>Back</button>
          <button className={cx("save-btn")} onClick={handleSaveQuestion}>Save</button>
        </div>
      </div>
    </div>
  );
}

QuestionQuizzCreatePreview.propTypes = {
  questionPreviewData: PropTypes.object,
  setIsShowQuestionPreview: PropTypes.func,
  setIsShowCreateQuestionModal: PropTypes.func,
  fetchQuestions: PropTypes.func,
};

export default QuestionQuizzCreatePreview;
