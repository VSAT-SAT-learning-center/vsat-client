import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
import styles from "./ModuleQuestionView.module.scss";
const cx = classNames.bind(styles);

function ModuleQuestionView({
  examQuestion,
  exam,
  fetchExamList,
  setIsShowDomainQuestionView,
  setOriginalData,
  setDomainData,
  setModuleData,
  setIsLoading,
  setShowModuleFeedback
}) {
  const [sortedDomains, setSortedDomains] = useState([]);

  useEffect(() => {
    if (examQuestion?.domains) {
      const sorted = [...examQuestion.domains].sort((a, b) =>
        a.domain.localeCompare(b.domain)
      );
      setSortedDomains(sorted);
    }
  }, [examQuestion?.domains]);

  const fetchUpdatedExamQuestion = useCallback(async () => {
    try {
      setIsLoading(true)
      const updatedExamList = await fetchExamList();
      const updatedExam = updatedExamList.find((examItem) => examItem.id === exam.id);
      const updatedQuestion = updatedExam.examQuestions.find(
        (question) => question.id === examQuestion.id
      );
      return updatedQuestion;
    } catch (error) {
      console.error("Error fetching updated exam question:", error);
    } finally {
      setIsLoading(false)
    }
  }, [exam.id, examQuestion.id, fetchExamList, setIsLoading]);

  const handleClickViewDomainQuestion = async (domainData) => {
    if (exam?.status === "Rejected") {
      const updatedExamQuestion = await fetchUpdatedExamQuestion();

      if (updatedExamQuestion) {
        const updatedDomain = updatedExamQuestion.domains.find(
          (domain) => domain.domain === domainData.domain
        );
        const domainToSet = updatedDomain || domainData;
        setModuleData(updatedExamQuestion);
        setIsShowDomainQuestionView(true);
        setOriginalData(domainToSet);
        setDomainData(domainToSet);
      }
    } else {
      setIsShowDomainQuestionView(true);
      setOriginalData(domainData);
      setDomainData(domainData);
      setModuleData(examQuestion);
    }
  };

  const getAttemptedQuestionsCount = (questions, domain) => {
    return questions?.filter((question) => question.skill.domain.content === domain.domain)?.length || 0;
  };

  const handleViewFeedback = () => {
    setShowModuleFeedback(true)
    setModuleData(examQuestion);
  }

  return (
    <div className={cx("module-question-container")}>
      <div className={cx("module-question-header")}>
        <div className={cx("module-content")}>
          <div className={cx("module-question-title")}>
            <div className={cx("module-icon")}>
              <i className="fa-light fa-file-pen"></i>
            </div>
            <div className={cx("module-title")}>
              {examQuestion?.name}{" "}
              {examQuestion?.level ? `(${examQuestion?.level})` : ""}
            </div>
          </div>
          <div className={cx("module-section")}>{examQuestion?.section}</div>
        </div>
        {exam?.status === "Rejected" && (
          <div className={cx("module-feedback")}>
            <button className={cx("feedback-list-btn")} onClick={handleViewFeedback}>
              <i className={cx("fa-regular fa-clipboard-list")}></i>
            </button>
          </div>
        )}
      </div>
      <div className={cx("module-question-content")}>
        {sortedDomains?.map((domain, index) => (
          <div className={cx("domain-question-container")} key={index}>
            <div className={cx("domain-icon")}>
              <i className={cx("fa-regular fa-pen-to-square")}></i>
            </div>
            <div className={cx("domain-infor")}>
              <div className={cx("domain-title")}>{domain?.domain}</div>
              <div className={cx("domain-action")}>
                <div className={cx("count-noq")}>{getAttemptedQuestionsCount(domain?.questions, domain)}/{domain?.numberofquestion}</div>
                <div className={cx("create-action")}>
                  <button
                    className={cx("create-btn")}
                    onClick={() => handleClickViewDomainQuestion(domain)}
                  >
                    <i
                      className={cx(
                        "fa-regular fa-arrow-up-right-from-square",
                        "create-icon"
                      )}
                    ></i>
                    <span className={cx("create-text")}>
                      {exam?.status === "Rejected" ? "Edit" : "View"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ModuleQuestionView;
