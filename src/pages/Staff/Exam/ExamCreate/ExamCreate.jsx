import classNames from "classnames/bind";
import { useState } from "react";
import ExamCreateModal from "~/components/Staff/ExamCreate/ExamCreateModal";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./ExamCreate.module.scss";
const cx = classNames.bind(styles);
function ExamCreate() {
  const [isShowCreateExamModal, setIsShowCreateExamModal] = useState(false);
  return (
    <>
      {isShowCreateExamModal && (
        <ExamCreateModal setIsShowCreateExamModal={setIsShowCreateExamModal} />
      )}
      <PageLayout>
        <div className={cx("create-exam-wrapper")}>
          <div className={cx("create-exam-container")}>
            <div className={cx("create-exam-header")}>
              <div className={cx("create-exam-text")}>Create Exam</div>
              <button
                className={cx("create-exam-action")}
                onClick={() => setIsShowCreateExamModal(true)}
              >
                <i className={cx("fa-regular fa-plus-circle", "exam-icon")}></i>
                <span className={cx("exam-text")}>New Exam</span>
              </button>
            </div>
          </div>
        </div>
        <LearningMaterialCreateFooter />
      </PageLayout>
    </>
  );
}

export default ExamCreate;
