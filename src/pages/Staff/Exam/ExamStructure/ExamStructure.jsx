import classNames from "classnames/bind";
import { useState } from "react";
import ExamStructureCreateView from "~/components/Staff/ExamStructureCreate/ExamStructureCreateView";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./ExamStructure.module.scss";
const cx = classNames.bind(styles);
function ExamStructure() {
  const [isShowExamStructureCreateView, setIsShowExamStructureCreateView] =
    useState(false);
  return (
    <>
      {isShowExamStructureCreateView && (
        <ExamStructureCreateView
          setIsShowExamStructureCreateView={setIsShowExamStructureCreateView}
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
                <span className={cx("publish-text")}>New Structure</span>
              </button>
            </div>
          </div>
        </div>
        <LearningMaterialCreateFooter />
      </PageLayout>
    </>
  );
}

export default ExamStructure;
