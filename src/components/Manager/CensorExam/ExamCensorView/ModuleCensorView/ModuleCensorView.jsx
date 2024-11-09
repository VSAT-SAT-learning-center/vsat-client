import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import QuestionItemPreview from "~/components/Staff/QuestionExamCreate/QuestionItemPreview";
import CensorFeedback from "../CensorFeedback";
import PopupCensorConfirm from "../PopupCensorConfirm";
import styles from "./ModuleCensorView.module.scss";
import QuestionCensorItem from "./QuestionCensorItem";
const cx = classNames.bind(styles);

function ModuleCensorView({
  moduleCensorData,
  setCensorModuleFeedback,
  setIsShowModuleViewCensor,
}) {
  // console.log(moduleCensorData);

  const [groupedByLevel, setGroupedByLevel] = useState([]);
  const [isShowQuestionItemPreview, setIsShowQuestionItemPreview] =
    useState(false);
  const [questionPreviewData, setQuestionPreviewData] = useState(null);
  const [isShowConfirmCensor, setIsShowConfirmCensor] = useState(false);
  const [isShowCensorFeedback, setIsShowCensorFeedback] = useState(false);

  useEffect(() => {
    function combineAndFilterQuestions(data) {
      const allQuestions = data.reduce((acc, domain) => {
        return acc.concat(domain.questions);
      }, []);

      const levelsMap = allQuestions.reduce((acc, question) => {
        const level = question.level;
        if (!acc[level]) {
          acc[level] = {
            level,
            questions: [],
          };
        }
        acc[level].questions.push(question);
        return acc;
      }, {});

      const groupedArray = Object.values(levelsMap);

      const levelOrder = ["Foundation", "Medium", "Advanced"];
      groupedArray.sort((a, b) => {
        return levelOrder.indexOf(a.level) - levelOrder.indexOf(b.level);
      });

      return groupedArray;
    }

    const filteredData = combineAndFilterQuestions(moduleCensorData.domains);
    setGroupedByLevel(filteredData);
  }, [moduleCensorData.domains]);

  return (
    <>
      {isShowQuestionItemPreview && (
        <QuestionItemPreview
          questionPreviewData={questionPreviewData}
          setIsShowQuestionItemPreview={setIsShowQuestionItemPreview}
        />
      )}

      {isShowConfirmCensor && (
        <PopupCensorConfirm
          moduleCensorData={moduleCensorData}
          setCensorModuleFeedback={setCensorModuleFeedback}
          setIsShowConfirmCensor={setIsShowConfirmCensor}
          setIsShowCensorFeedback={setIsShowCensorFeedback}
          setIsShowModuleViewCensor={setIsShowModuleViewCensor}
        />
      )}

      {isShowCensorFeedback && (
        <CensorFeedback
          moduleCensorData={moduleCensorData}
          setCensorModuleFeedback={setCensorModuleFeedback}
          setIsShowConfirmCensor={setIsShowConfirmCensor}
          setIsShowCensorFeedback={setIsShowCensorFeedback}
          setIsShowModuleViewCensor={setIsShowModuleViewCensor}
        />
      )}
      <div className={cx("module-censor-view-wrapper")}>
        <div className={cx("module-censor-view-container")}>
          <div className={cx("module-censor-view-header")}>
            <div
              className={cx("censor-close")}
              onClick={() => setIsShowModuleViewCensor(false)}
            >
              <i className={cx("fa-regular fa-arrow-left")}></i>
            </div>
            <div className={cx("censor-title")}>
              {moduleCensorData?.name}{" "}
              {moduleCensorData?.level ? `(${moduleCensorData?.level})` : ""}
            </div>
            <div className={cx("censor-empty")}></div>
          </div>
          <div className={cx("module-censor-view-content")}>
            {groupedByLevel?.map((levelQuestion, index) => (
              <div
                className={cx("module-level-question-container")}
                key={index}
              >
                <div className={cx("module-level-header")}>
                  <div className={cx("level-icon")}>
                    <i className="fa-sharp fa-regular fa-layer-group"></i>
                  </div>
                  <div className={cx("level-question-infor")}>
                    <div className={cx("level-title")}>
                      {levelQuestion?.level}
                    </div>
                    <div className={cx("level-count")}>
                      {levelQuestion?.questions?.length}
                    </div>
                  </div>
                </div>
                <div className={cx("module-level-content")}>
                  {levelQuestion?.questions?.map((question, idx) => (
                    <QuestionCensorItem
                      key={question.id}
                      index={idx + 1}
                      question={question}
                      setQuestionPreviewData={setQuestionPreviewData}
                      setIsShowQuestionItemPreview={
                        setIsShowQuestionItemPreview
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className={cx("module-censor-view-footer")}>
            <button
              className={cx("cancel-btn")}
              onClick={() => setIsShowModuleViewCensor(false)}
            >
              Cancel
            </button>
            <button
              className={cx("preview-btn")}
              onClick={() => setIsShowConfirmCensor(true)}
            >
              <span>Censor</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModuleCensorView;
