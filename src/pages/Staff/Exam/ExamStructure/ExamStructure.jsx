import { Skeleton } from "@mui/material";
import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
import ExamStructureCreateView from "~/components/Staff/ExamStructureCreate/ExamStructureCreateView";
import ExamStructureItem from "~/components/Staff/ExamStructureCreate/ExamStructureItem";
import ExamStructureViewDetail from "~/components/Staff/ExamStructureCreate/ExamStructureViewDetail";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import PageLayout from "~/layouts/Staff/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./ExamStructure.module.scss";
const cx = classNames.bind(styles);
function ExamStructure() {
  const [examStructureList, setExamStructureList] = useState([]);
  const [isShowExamStructureCreateView, setIsShowExamStructureCreateView] =
    useState(false);
  const [isShowExamStructureViewDetail, setIsShowExamStructureViewDetail] =
    useState(false);
  const [viewStructureDetailData, setViewStructureDeatailData] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const fetchExamStructureList = useCallback(async () => {
    try {
      setIsWaiting(true);
      const response = await apiClient.get("/exam-structures", {
        params: {
          page: 1,
          pageSize: 0,
        },
      });
      setExamStructureList(response.data.data.result);
    } catch (error) {
      console.error("Failed to fetch exam structure list:", error);
    } finally {
      setIsWaiting(false);
    }
  }, []);

  useEffect(() => {
    fetchExamStructureList();
  }, [fetchExamStructureList]);
  return (
    <>
      {isShowExamStructureCreateView && (
        <ExamStructureCreateView
          setIsShowExamStructureCreateView={setIsShowExamStructureCreateView}
          fetchExamStructureList={fetchExamStructureList}
        />
      )}

      {isShowExamStructureViewDetail && (
        <ExamStructureViewDetail
          viewStructureDetailData={viewStructureDetailData}
          setIsShowExamStructureViewDetail={setIsShowExamStructureViewDetail}
        />
      )}
      <PageLayout>
        <div className={cx("create-structure-wrapper")}>
          <div className={cx("create-structure-container")}>
            <div className={cx("create-structure-header")}>
              <div className={cx("create-structure-text")}>Exam Structure</div>
              <button
                className={cx("create-structure-action")}
                onClick={() => setIsShowExamStructureCreateView(true)}
              >
                <i
                  className={cx("fa-regular fa-plus-circle", "structure-icon")}
                ></i>
                <span className={cx("structure-text")}>New Structure</span>
              </button>
            </div>
            <div className={cx("create-structure-content")}>
              {isWaiting ? (
                <>
                  {[...Array(3)].map((_, i) => (
                    <Skeleton
                      key={i}
                      animation="wave"
                      variant="rectangular"
                      width="100%"
                      height={260}
                    />
                  ))}
                </>
              ) : (
                examStructureList.map((structureItem, index) => (
                  <ExamStructureItem
                    key={index}
                    index={index + 1}
                    structureItem={structureItem}
                    setIsShowExamStructureViewDetail={
                      setIsShowExamStructureViewDetail
                    }
                    setViewStructureDeatailData={setViewStructureDeatailData}
                  />
                ))
              )}
            </div>
          </div>
        </div>
        <LearningMaterialCreateFooter />
      </PageLayout>
    </>
  );
}

export default ExamStructure;
