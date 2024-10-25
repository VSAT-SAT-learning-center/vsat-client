import classNames from "classnames/bind";
import { useState } from "react";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import QuestionExamCreateModal from "~/components/Staff/QuestionExamCreate/QuestionExamCreateModal";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./QuestionExamCreate.module.scss";
const cx = classNames.bind(styles);
function QuestionExamCreate() {
  const [isShowCreateQuestionModal, setIsShowCreatQuestionModal] = useState(false)
  return (
    <>
      {isShowCreateQuestionModal && <QuestionExamCreateModal setIsShowCreatQuestionModal={setIsShowCreatQuestionModal}/>}
      <PageLayout>
        <div className={cx("question-exam-create-wrapper")}>
          <div className={cx("question-exam-create-container")}>
            <div className={cx("question-exam-create-header")}>
              <div className={cx("question-exam-create-title")}>Create Question</div>
              <div className={cx("question-exam-create-config")}>
                <button className={cx("question-import")}>
                  <i className={cx("fa-regular fa-cloud-arrow-up", "import-icon")}></i>
                  <span className={cx("import-text")}>Import</span>
                </button>
                <button className={cx("question-publish")}>
                  <i className={cx("fa-regular fa-arrow-up-from-bracket", "publish-icon")}></i>
                  <span className={cx("publish-text")}>Publish</span>
                </button>
              </div>
            </div>
            <div className={cx("question-exam-create-content")}>
              <div className={cx("question-exam-create-list")}></div>
              <div
                className={cx("create-question-action")}
                onClick={() => setIsShowCreatQuestionModal(true)}
              >
                <div className={cx("create-icon")}>
                  <i className={cx("fa-regular fa-circle-plus", "icon")}></i>
                </div>
                <div className={cx("create-text")}>New question</div>
              </div>
            </div>
          </div>
        </div>
        <LearningMaterialCreateFooter />
      </PageLayout>
    </>
  );
}

export default QuestionExamCreate;
