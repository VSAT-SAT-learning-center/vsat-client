import { Radio } from "antd";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { v4 as uuidv4 } from "uuid";
import apiClient from "~/services/apiService";
import QuestionExamCreatePreview from "../QuestionQuizzCreatePreview";
import styles from "./QuestionQuizzCreateModal.module.scss";
const cx = classNames.bind(styles);
function QuestionQuizzCreateModal({
  setIsShowCreateQuestionModal,
  fetchQuestions,
}) {
  const [questionData, setQuestionData] = useState({});
  const [sections, setSections] = useState([]);
  const [levels, setLevels] = useState([]);
  const [domains, setDomains] = useState([]);
  const [skills, setSkills] = useState([]);
  const [answers, setAnswers] = useState([
    { id: uuidv4(), text: "", label: "A", isCorrectAnswer: false },
    { id: uuidv4(), text: "", label: "B", isCorrectAnswer: false },
    { id: uuidv4(), text: "", label: "C", isCorrectAnswer: false },
    { id: uuidv4(), text: "", label: "D", isCorrectAnswer: false },
  ]);
  const [isShowQuestionPreview, setIsShowQuestionPreview] = useState(false);
  const [questionPreviewData, setQuestionPreviewData] = useState({});
  useEffect(() => {
    const fetchLevelsAndSections = async () => {
      try {
        const [levelsResponse, sectionsResponse] = await Promise.all([
          apiClient.get("/level"),
          apiClient.get("/section"),
        ]);
        setLevels(levelsResponse.data.data);
        setSections(sectionsResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchLevelsAndSections();
  }, []);

  const handleQuestionTypeChange = (event) => {
    const selectedValue = event.target.value;
    setQuestionData((prev) => ({
      ...prev,
      isSingleChoiceQuestion: selectedValue === "singleChoice",
    }));
  };

  const handleLevelChange = (e) => {
    setQuestionData((prev) => ({
      ...prev,
      levelId: e.target.value,
    }));
  };

  const handleSectionChange = async (e) => {
    const selectedSectionId = e.target.value;
    setQuestionData((prev) => ({
      ...prev,
      sectionId: selectedSectionId,
    }));

    if (selectedSectionId) {
      try {
        const response = await apiClient.get(
          `/domains/section/${selectedSectionId}`
        );
        setDomains(response.data);
      } catch (error) {
        console.error("Error fetching domains:", error);
      }
    } else {
      setDomains([]);
    }
  };

  const handleDomainChange = async (e) => {
    const selectedDomainId = e.target.value;
    if (selectedDomainId) {
      try {
        const response = await apiClient.get(
          `/skills/domainById/${selectedDomainId}`
        );
        setSkills(response.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    } else {
      setSkills([]);
    }
  };

  const handleSkillChange = (e) => {
    const selectedSkillId = e.target.value;
    setQuestionData((prev) => ({
      ...prev,
      skillId: selectedSkillId,
    }));
  };

  const handleContentQuestionChange = (value) => {
    setQuestionData((prev) => ({
      ...prev,
      content: value,
    }));
  };

  const handleExplainAnswerChange = (value) => {
    setQuestionData((prev) => ({
      ...prev,
      explain: value,
    }));
  };

  const handleAnswerChange = (answerId, value) => {
    setAnswers(
      answers.map((answer) =>
        answer.id === answerId ? { ...answer, text: value } : answer
      )
    );
  };

  const handleCorrectAnswerChange = (answerId) => {
    if (questionData.isSingleChoiceQuestion) {
      setAnswers(
        answers.map((answer) =>
          answer.id === answerId
            ? { ...answer, isCorrectAnswer: true }
            : { ...answer, isCorrectAnswer: false }
        )
      );
    } else {
      setAnswers(
        answers.map((answer) =>
          answer.id === answerId
            ? { ...answer, isCorrectAnswer: !answer.isCorrectAnswer }
            : answer
        )
      );
    }
  };

  const handleAddAnswer = () => {
    const nextLabel = String.fromCharCode(65 + answers.length);
    setAnswers([
      ...answers,
      { id: uuidv4(), text: "", label: nextLabel, isCorrectAnswer: false },
    ]);
  };

  const handleRemoveAnswer = (answerId) => {
    if (answers.length > 1) {
      const filteredAnswers = answers.filter(
        (answer) => answer.id !== answerId
      );
      const updatedAnswers = filteredAnswers.map((answer, index) => ({
        ...answer,
        label: String.fromCharCode(65 + index),
      }));
      setAnswers(updatedAnswers);
    }
  };

  const handlePreviewQuestion = () => {
    const updatedQuestionData = {
      ...questionData,
      answers: answers,
    };
    setIsShowQuestionPreview(true);
    setQuestionPreviewData(updatedQuestionData);
  };

  const isPreviewButtonEnabled = () => {
    const areAnswersFilled = answers.every(
      (answer) => answer.text.trim() !== ""
    );
    const hasCorrectAnswer = answers.some((answer) => answer.isCorrectAnswer);
    return (
      questionData.isSingleChoiceQuestion !== undefined &&
      questionData.levelId &&
      questionData.sectionId &&
      questionData.skillId &&
      questionData.content &&
      questionData.explain &&
      areAnswersFilled &&
      hasCorrectAnswer
    );
  };

  return (
    <>
      {isShowQuestionPreview && (
        <QuestionExamCreatePreview
          questionPreviewData={questionPreviewData}
          setIsShowQuestionPreview={setIsShowQuestionPreview}
          setIsShowCreateQuestionModal={setIsShowCreateQuestionModal}
          fetchQuestions={fetchQuestions}
        />
      )}
      <div className={cx("question-create-modal-wrapper")}>
        <div className={cx("question-create-modal-container")}>
          <div className={cx("question-create-modal-header")}>
            <div className={cx("question-title")}>Create question</div>
            <div
              className={cx("question-close")}
              onClick={() => setIsShowCreateQuestionModal(false)}
            >
              <i className={cx("fa-regular fa-xmark")}></i>
            </div>
          </div>
          <div className={cx("question-create-modal-content")}>
            <div className={cx("question-create-config")}>
              <div className={cx("question-config-item")}>
                <div className={cx("config-title")}>Question Type</div>
                <div className={cx("config-selection")}>
                  <select
                    id="question-type"
                    className={cx("question-select")}
                    onChange={handleQuestionTypeChange}
                  >
                    <option value="">Select Question</option>
                    <option value="singleChoice">Single Choice</option>
                    <option value="textInput">Text Input</option>
                  </select>
                </div>
              </div>
              <div className={cx("question-config-item")}>
                <div className={cx("config-title")}>Level</div>
                <div className={cx("config-selection")}>
                  <select
                    id="level-type"
                    value={questionData.levelId}
                    className={cx("question-select")}
                    onChange={handleLevelChange}
                  >
                    <option value="">Select Level</option>
                    {levels.map((level) => (
                      <option value={level.id} key={level.id}>
                        {level.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={cx("question-config-item")}>
                <div className={cx("config-title")}>Section</div>
                <div className={cx("config-selection")}>
                  <select
                    id="section-type"
                    value={questionData.sectionId}
                    className={cx("question-select")}
                    onChange={handleSectionChange}
                  >
                    <option value="">Select Section</option>
                    {sections.map((section) => (
                      <option value={section.id} key={section.id}>
                        {section.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={cx("question-config-item")}>
                <div className={cx("config-title")}>Domain</div>
                <div className={cx("config-selection")}>
                  <select
                    id="domain-type"
                    className={cx("question-select")}
                    onChange={handleDomainChange}
                    disabled={domains.length === 0}
                  >
                    <option value="">Select Domain</option>
                    {domains.map((domain) => (
                      <option value={domain.id} key={domain.id}>
                        {domain.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={cx("question-config-item")}>
                <div className={cx("config-title")}>Skill</div>
                <div className={cx("config-selection")}>
                  <select
                    id="skill-type"
                    value={questionData.skillId}
                    className={cx("question-select")}
                    onChange={handleSkillChange}
                    disabled={skills.length === 0}
                  >
                    <option value="">Select Skill</option>
                    {skills.map((skill) => (
                      <option value={skill.id} key={skill.id}>
                        {skill.content}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className={cx("question-create-content")}>
              <div className={cx("content-left")}>
                <div className={cx("question-create-title")}>Question</div>
                <div className={cx("question-create-editor")}>
                  <ReactQuill
                    className={cx("editor-input")}
                    value={questionData.content}
                    theme="snow"
                    placeholder={"Write question content..."}
                    onChange={(value) => handleContentQuestionChange(value)}
                  />
                </div>
              </div>
              <div className={cx("content-right")}></div>
            </div>
            <div className={cx("question-answer-create-content")}>
              {answers.map((answer, index) => (
                <div className={cx("answer-create-item")} key={answer.id}>
                  <div className={cx("answer-create-select")}>
                    <div className={cx("select-answer")}>
                      <Radio
                        className={cx("answer-input-radio")}
                        checked={answer.isCorrectAnswer}
                        onChange={() => handleCorrectAnswerChange(answer.id)}
                      />
                      <span
                        className={cx("answer-input-text")}
                        onClick={() => handleCorrectAnswerChange(answer.id)}
                      >
                        Choice {index + 1}
                      </span>
                    </div>
                    <div className={cx("delete-answer")}>
                      <button
                        className={cx("delete-btn", {
                          "disabled-delete-btn": answers.length === 1,
                        })}
                        onClick={() => handleRemoveAnswer(answer.id)}
                        disabled={answers.length === 1}
                      >
                        <i
                          className={cx("fa-regular fa-trash", "trash-icon")}
                        ></i>
                      </button>
                    </div>
                  </div>
                  <div className={cx("answer-create-editor")}>
                    <ReactQuill
                      className={cx("answer-editor-input")}
                      theme="snow"
                      value={answer.text}
                      onChange={(value) => handleAnswerChange(answer.id, value)}
                      placeholder={`Answer...`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className={cx("explain-answer-create-content")}>
              <div className={cx("explain-create-title")}>Explain answer</div>
              <div className={cx("explain-create-editor")}>
                <ReactQuill
                  className={cx("editor-input")}
                  value={questionData.explain}
                  theme="snow"
                  placeholder={"Write explain answer..."}
                  onChange={(value) => handleExplainAnswerChange(value)}
                />
              </div>
            </div>
            <div
              className={cx("create-answer-action")}
              onClick={handleAddAnswer}
            >
              <div className={cx("create-icon")}>
                <i className={cx("fa-regular fa-circle-plus", "icon")}></i>
              </div>
              <div className={cx("create-text")}>Add answer</div>
            </div>
          </div>
          <div className={cx("question-create-modal-footer")}>
            <button
              className={cx("cancel-btn")}
              onClick={() => setIsShowCreateQuestionModal(false)}
            >
              Cancel
            </button>
            <button
              className={cx("preview-btn", {
                "disabled-btn": !isPreviewButtonEnabled(),
              })}
              onClick={handlePreviewQuestion}
              disabled={!isPreviewButtonEnabled()}
            >
              <i className={cx("fa-regular fa-eye", "preview-icon")}></i>
              <span>Preview</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

QuestionQuizzCreateModal.propTypes = {
  fetchQuestions: PropTypes.func,
  setIsShowCreateQuestionModal: PropTypes.func,
};

export default QuestionQuizzCreateModal;