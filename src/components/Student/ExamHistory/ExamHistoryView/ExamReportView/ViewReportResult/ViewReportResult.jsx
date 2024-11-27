import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import apiClient from "~/services/apiService";
import ModuleQuestionTable from "./ModuleQuestionTable";
import styles from "./ViewReportResult.module.scss";
const cx = classNames.bind(styles);

function ViewReportResult({ exam, setQuestionView, setShowQuestionView }) {
  const [isWaiting, setIsWaiting] = useState(false)
  const [results, setResults] = useState([])

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setIsWaiting(true)
        const response = await apiClient.get(`/exam-attempts/getReport/${exam?.id}`)
        setResults(response.data.data.modules)
      } catch (error) {
        console.error("Error while fetching results:", error);
      } finally {
        setIsWaiting(false)
      }
    }

    fetchResults()
  }, [exam?.id])
  return (
    <>
      {isWaiting ? (
        <div className={cx("view-result-no-content")}>
          <div className={cx("loader")}></div>
        </div>
      ) : (
        <div className={cx("view-result-container")}>
          {results?.map((result) => (
            <div className={cx("view-result-item")} key={result?.moduleId}>
              <div className={cx("module-name")}>{result?.moduleName} {`(${result?.section})`}</div>
              <ModuleQuestionTable questions={result?.questions} setQuestionView={setQuestionView} setShowQuestionView={setShowQuestionView} />
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default ViewReportResult
