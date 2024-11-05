import classNames from "classnames/bind";
import { useState } from "react";
// import { renderMathAndText } from "~/utils/renderMathAndText";
import styles from "./DomainQuestionCreateModal.module.scss";
const cx = classNames.bind(styles);

function DomainQuestionCreateModal({ setIsShowModalCreateQuestionModal }) {
  // const question = `<p>In T.S. Eliot's modernist poem "The Love Song of J. Alfred Prufrock," \\[x^2\\] the speaker expresses feelings of isolation and anxiety in the face of an uncertain, fragmented modern world. Referring to "the chambers of the sea," Eliot writes about Prufrock's meditations, implying that he feels detached and lonely. </p><p>Which quotation from the poem most effectively illustrates the claim?</p>`;
  const [isShowSkillSelect, setIsShowSkillSelect] = useState(false);
  return (
    <div
      className={cx("domain-create-question-modal-wrapper")}
      onClick={() => setIsShowModalCreateQuestionModal(false)}
    >
      <div
        className={cx("domain-create-question-modal-container")}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cx("domain-create-question-modal-search")}>
          <div className={cx("search-question-container")}>
            <div className={cx("search-content")}>
              <div className={cx("search-icon")}>
                <i className={cx("fa-regular fa-magnifying-glass", "icon")}></i>
              </div>
              <input
                type="text"
                placeholder="Search question..."
                className={cx("search-input")}
              />
            </div>
            <div className={cx("search-select")}>
              <div
                className={cx("select-skill")}
                onClick={() => setIsShowSkillSelect(!isShowSkillSelect)}
              >
                <div className={cx("selected-text")}>Select skill</div>
                <i
                  className={cx(
                    isShowSkillSelect
                      ? "fa-regular fa-chevron-down"
                      : "fa-regular fa-chevron-up",
                    "icon-select"
                  )}
                ></i>
              </div>
            </div>
            {/* <div className={cx("select-question-dropdown-container")}>
              <div className={cx("question-search-container")}>
                <i
                  className={cx(
                    "fa-sharp fa-regular fa-circle-question",
                    "question-icon"
                  )}
                ></i>
                <div
                  className={cx("question-content")}
                  dangerouslySetInnerHTML={{
                    __html: renderMathAndText(question),
                  }}
                />
              </div>
              <div className={cx("question-search-container")}>
                <i
                  className={cx(
                    "fa-sharp fa-regular fa-circle-question",
                    "question-icon"
                  )}
                ></i>
                <div
                  className={cx("question-content")}
                  dangerouslySetInnerHTML={{
                    __html: renderMathAndText(question),
                  }}
                />
              </div>
            </div> */}
            {isShowSkillSelect && (
              <div className={cx("select-skill-dropdown-container")}>
                <div className={cx("skill-select-container")}>
                  <i className={cx("fa-light fa-layer-group", "skil-icon")}></i>
                  <div className={cx("skill-text")}>
                    Problem-Solving and Data Analysis
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={cx("domain-create-question-modal-content")}>
          <div className={cx("domain-create-question-modal")}></div>
        </div>
      </div>
    </div>
  );
}

export default DomainQuestionCreateModal;
