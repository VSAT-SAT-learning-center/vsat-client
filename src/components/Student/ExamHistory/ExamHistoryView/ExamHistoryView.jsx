import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "~/contexts/AuthContext";
import apiClient from "~/services/apiService";
import { formatDate } from "~/utils/formatDate";
import styles from "./ExamHistoryView.module.scss";
import ExamLineChart from "./ExamLineChart";
import ExamReportView from "./ExamReportView";
import UpdateExamFinal from "./UpdateExamFinal";
const cx = classNames.bind(styles);

function ExamHistoryView({ profile, setShowExamHistoryView }) {
  const { user } = useContext(AuthContext);
  const [showExamReport, setShowExamReport] = useState(false)
  const [exams, setExams] = useState([])
  const [examData, setExamData] = useState([])
  const [examSelected, setExamSelected] = useState(null)
  const [showUpdateExamFinal, setShowUpdateExamFinal] = useState(false)

  const fetchExams = async () => {
    try {
      const response = await apiClient.get(
        `/exam-attempts/getAllExamAttemptByStudyProfile/${profile?.id}`
      );
      const apiExams = response.data.data;
      const mappedData = apiExams
        .map((exam) => ({
          testDate: new Date(exam.attemptdatetime).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          score: exam.scoreTotal,
        }))
        .sort((a, b) => new Date(a.testDate) - new Date(b.testDate));
      setExams(apiExams);
      setExamData(mappedData);
    } catch (error) {
      console.error("Error while fetching exams:", error);
    }
  };

  useEffect(() => {
    if (profile?.id) {
      fetchExams();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.id]);

  const handleViewExamReport = (exam) => {
    setExamSelected(exam)
    setShowExamReport(true)
  }
  return (
    <>
      {showExamReport && <ExamReportView exam={examSelected} setShowExamReport={setShowExamReport} />}
      {showUpdateExamFinal && <UpdateExamFinal profile={profile} setShowUpdateExamFinal={setShowUpdateExamFinal} fetchExams={fetchExams} />}
      <div className={cx("exam-history-view-wrapper")}>
        <div className={cx("exam-history-view-container")}>
          <div className={cx("exam-history-view-header")}>
            <div
              className={cx("profile-close")}
              onClick={() => setShowExamHistoryView(false)}
            >
              <i className={cx("fa-regular fa-arrow-left")}></i>
            </div>
            <div className={cx("profile-title")} style={{ marginLeft: user?.role === "Teacher" ? "140px" : "0" }}>Exam History</div>
            {user?.role === "Teacher" ? (
              <button className={cx("profile-aciton")} onClick={() => setShowUpdateExamFinal(true)}>
                Update Exam
              </button>
            ) : (
              <div className={cx("profile-empty")}>
              </div>
            )}

          </div>
          <div className={cx("exam-history-view-content")}>
            <div className={cx("view-title")}>
              <div className={cx("title")}>Follow your progress, track your prep</div>
            </div>
            <ExamLineChart examData={examData} goal={profile?.targetscoreRW + profile?.targetscoreMath} />
            <div className={cx("view-title")}>
              <div className={cx("title")}>Exams</div>
            </div>
            <div className={cx("tests-list-container")}>
              <div className={cx("tests-list-content")}>
                <div className={cx("test-item-intro")}>
                  <div className={cx("intro")}>Exam</div>
                  <div className={cx("intro")}>Date Completed</div>
                  <div className={cx("intro")}>Score</div>
                  <div className={cx("intro")}>Improvement</div>
                  <div className={cx("intro")}>Action</div>
                </div>
                {exams?.map((item) => (
                  <div className={cx("test-item-container")} key={item?.id}>
                    <div className={cx("item")}>{item?.exam?.title || "Certificate Exam"}</div>
                    <div className={cx("item")}>{formatDate(item?.attemptdatetime)}</div>
                    <div className={cx("item")}>{item?.scoreTotal}</div>
                    <div
                      className={cx("item", {
                        down: item?.improvement < 0,
                        up: item?.improvement > 0,
                      })}
                    >
                      {item?.improvement > 0 ? `+${item?.improvement}` : item?.improvement}
                    </div>
                    <div className={cx("test-action", "item")}>
                      {item?.exam !== null && (
                        <button className={cx("view-btn")} onClick={() => handleViewExamReport(item)}>
                          <i className={cx("fa-regular fa-arrow-up-right-from-square")}></i>
                          <span className={cx("view-text")}>View Report</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ExamHistoryView
