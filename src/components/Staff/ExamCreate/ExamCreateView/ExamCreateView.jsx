import classNames from "classnames/bind";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "~/components/General/Loader";
import apiClient from "~/services/apiService";
import DomainQuestionView from "./DomainQuestionView";
import styles from "./ExamCreateView.module.scss";
import FeedbackModuleView from "./FeedbackModuleView";
import ModuleQuestionView from "./ModuleQuestionView";
const cx = classNames.bind(styles);

function ExamCreateView({ exam, fetchExamList, setIsShowCreateExamView }) {
  const navigate = useNavigate()
  const [isShowDomainQuestionView, setIsShowDomainQuestionView] =
    useState(false);
  const [originalData, setOriginalData] = useState(null);
  const [domainData, setDomainData] = useState(null);
  const [moduleData, setModuleData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModuleFeedback, setShowModuleFeedback] = useState(false)

  const sectionOrder = ["Reading & Writing", "Math"];
  const moduleOrder = ["Module 1", "Module 2 (Easy)", "Module 2 (Hard)"];

  const sortedQuestions = exam?.examQuestions.sort((a, b) => {
    const sectionComparison =
      sectionOrder.indexOf(a.section) - sectionOrder.indexOf(b.section);
    if (sectionComparison !== 0) {
      return sectionComparison;
    }

    const aModule = a.name + (a.level ? ` (${a.level})` : "");
    const bModule = b.name + (b.level ? ` (${b.level})` : "");

    if (!moduleOrder.includes(aModule)) {
      moduleOrder.push(aModule);
    }
    if (!moduleOrder.includes(bModule)) {
      moduleOrder.push(bModule);
    }

    return moduleOrder.indexOf(aModule) - moduleOrder.indexOf(bModule);
  });

  const handleUpdateExam = async () => {
    try {
      setIsLoading(true)
      await apiClient.patch(`/exams/updateStatus/${exam.id}/Pending`)
      toast.success("Update exam successfully!", {
        autoClose: 1000
      })
      navigate("/staff/exams/create")
    } catch (error) {
      console.error("Error while update exam:", error)
      toast.success("Update exam failed!", {
        autoClose: 1000
      })
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {isShowDomainQuestionView && (
        <DomainQuestionView
          exam={exam}
          fetchExamList={fetchExamList}
          originalData={originalData}
          moduleData={moduleData}
          domainData={domainData}
          setDomainData={setDomainData}
          setIsShowDomainQuestionView={setIsShowDomainQuestionView}
          setIsLoading={setIsLoading}
        />
      )}
      {showModuleFeedback && <FeedbackModuleView moduleData={moduleData} setShowModuleFeedback={setShowModuleFeedback} />}
      <div className={cx("exam-create-view-detail-wrapper")}>
        <div className={cx("exam-create-view-detail-container")}>
          <div className={cx("exam-create-view-detail-header")}>
            <div
              className={cx("create-close")}
              onClick={() => setIsShowCreateExamView(false)}
            >
              <i className={cx("fa-regular fa-arrow-left")}></i>
            </div>
            <div className={cx("create-title")}>
              {exam?.status === "Rejected" ? "Update Exam" : "View Exam"}
            </div>
            <div className={cx("create-empty")}></div>
          </div>
          <div className={cx("exam-create-veiew-detail-content")}>
            <div className={cx("exam-information-container")}>
              <div className={cx("exam-title-container")}>
                <div className={cx("title")}>Exam title</div>
                {/* <div className={cx("title-input-container")}>
                  <input type="text" className={cx("title-input")} />
                </div> */}
                <div className={cx("title-input-container")}>
                  <div className={cx("title-text")}>{exam?.title}</div>
                </div>
              </div>
              <div className={cx("exam-structure-container")}>
                <div className={cx("title")}>Exam structure</div>
                <div className={cx("structure-name")}>
                  {exam?.examStructure?.structurename}
                </div>
              </div>
              <div className={cx("exam-type-container")}>
                <div className={cx("title")}>Exam type</div>
                <div className={cx("type-name")}>{exam?.examType?.name}</div>
              </div>
            </div>
            <div className={cx("exam-desc-container")}>
              <div className={cx("exam-desc-title")}>Exam description</div>
              {/* <div className={cx("exam-desc-input")}>
                <textarea className={cx("desc-input")}></textarea>
              </div> */}
              <div className={cx("exam-desc")}>
                <div className={cx("desc-text")}>{exam?.description}</div>
              </div>
            </div>
            <div className={cx("exam-question-container")}>
              <div className={cx("exam-question-title")}>Exam question</div>
              {sortedQuestions.map((examQuestion) => (
                <ModuleQuestionView
                  key={examQuestion.id}
                  exam={exam}
                  examQuestion={examQuestion}
                  fetchExamList={fetchExamList}
                  setIsShowDomainQuestionView={setIsShowDomainQuestionView}
                  setOriginalData={setOriginalData}
                  setDomainData={setDomainData}
                  setModuleData={setModuleData}
                  setIsLoading={setIsLoading}
                  setShowModuleFeedback={setShowModuleFeedback}
                />
              ))}
            </div>
          </div>
          <div className={cx("exam-create-veiew-detail-footer")}>
            <button
              className={cx("cancel-btn")}
              onClick={() => setIsShowCreateExamView(false)}
            >
              Cancel
            </button>
            {exam?.status === "Rejected" && (
              <button className={cx("preview-btn")} onClick={handleUpdateExam}>
                <span>Save</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ExamCreateView;
