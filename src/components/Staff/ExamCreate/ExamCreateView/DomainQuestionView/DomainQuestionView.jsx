import classNames from "classnames/bind";
import { useState } from "react";
// import LevelDropdown from "../../ExamCreateModal/DomainQuestionCreateModal/LevelDropdown";
// import SkillDropdown from "../../ExamCreateModal/DomainQuestionCreateModal/SkillDropdown";
import styles from "./DomainQuestionView.module.scss";
const cx = classNames.bind(styles);

function DomainQuestionView({ setIsShowDomainQuestionView }) {
  const [isShowSkillSelect, setIsShowSkillSelect] = useState(false);
  const [isShowLevelSelect, setIsShowLevelSelect] = useState(false);
  const [skillSelect, setSkillSelect] = useState("Select skill");
  const [levelSelect, setLevelSelect] = useState("Select level");
  // const [skillIdSearch, setSkillIdSearch] = useState("");
  // const [levelSearch, setLevelSearch] = useState("");
  // const [skills, setSkills] = useState([]);
  // const [levels, setLevels] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleChangeSearchInput = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };

  // const handleClickSelectDropdownSkill = (skill) => {
  //   setSkillIdSearch(skill?.id);
  //   setIsShowSkillSelect(false);
  //   setSkillSelect(skill?.content);
  // };

  // const handleClickSelectDropdownLevel = (level) => {
  //   setLevelSearch(level?.name);
  //   setIsShowLevelSelect(false);
  //   setLevelSelect(level?.name);
  // };

  const handleDeleteSkillSelect = () => {
    setSkillSelect("Select skill");
    // setSkillIdSearch("");
    setIsShowSkillSelect(false);
  };

  const handleDeleteLevelSelect = () => {
    setLevelSelect("Select level");
    setIsShowLevelSelect(false);
  };
  return (
    <div className={cx("domain-create-question-modal-wrapper")}>
      <div className={cx("domain-create-question-modal-container")}>
        <div className={cx("domain-create-question-modal-header")}>
          <div className={cx("domain-name")}>Inforamations and Ideas</div>
        </div>
        <div className={cx("domain-create-question-modal-search")}>
          <div className={cx("search-question-container")}>
            <div className={cx("search-content")}>
              <div className={cx("search-icon")}>
                <i className={cx("fa-regular fa-magnifying-glass", "icon")}></i>
              </div>
              <input
                type="text"
                value={searchValue}
                placeholder="Search question..."
                className={cx("search-input")}
                autoFocus
                onChange={handleChangeSearchInput}
              />
            </div>
            <div className={cx("search-select")}>
              <div
                className={cx("select-skill")}
                onClick={() => setIsShowSkillSelect(!isShowSkillSelect)}
              >
                <div className={cx("selected-text")}>{skillSelect}</div>
                {skillSelect === "Select skill" ? (
                  <i
                    className={cx(
                      isShowSkillSelect
                        ? "fa-regular fa-chevron-down"
                        : "fa-regular fa-chevron-up",
                      "icon-select"
                    )}
                  ></i>
                ) : (
                  <i
                    className={cx("fa-sharp fa-solid fa-xmark")}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSkillSelect();
                    }}
                  ></i>
                )}
              </div>
            </div>
            <div className={cx("search-select-level")}>
              <div
                className={cx("select-level")}
                onClick={() => setIsShowLevelSelect(!isShowLevelSelect)}
              >
                <div className={cx("selected-text")}>{levelSelect}</div>
                {levelSelect === "Select level" ? (
                  <i
                    className={cx(
                      isShowLevelSelect
                        ? "fa-regular fa-chevron-down"
                        : "fa-regular fa-chevron-up",
                      "icon-select"
                    )}
                  ></i>
                ) : (
                  <i
                    className={cx("fa-sharp fa-solid fa-xmark")}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteLevelSelect();
                    }}
                  ></i>
                )}
              </div>
            </div>
            {/* {isQuestionDropdownVisible && (
              <QuestionDropdown
                setSearchValue={setSearchValue}
                searchQuestionResult={filteredSearchQuestionResult}
                domainQuestions={domainQuestions}
                setDomainQuestions={setDomainQuestions}
                setIsQuestionDropdownVisible={setIsQuestionDropdownVisible}
                numberOfQuestion={domainData.domain.numberofquestion}
              />
            )} */}
            {/* {isShowSkillSelect && (
              <SkillDropdown
                onClick={handleClickSelectDropdownSkill}
                skills={skills}
              />
            )}
            {isShowLevelSelect && (
              <LevelDropdown
                onClick={handleClickSelectDropdownLevel}
                levels={levels}
              />
            )} */}
          </div>
        </div>
        <div className={cx("domain-create-question-modal-content")}>
          <div className={cx("domain-create-question-modal")}></div>
        </div>
        <div className={cx("domain-create-question-modal-footer")}>
          <button className={cx("preview-btn")}>
            <i className={cx("fa-regular fa-floppy-disk", "preview-icon")}></i>
            <span onClick={() => setIsShowDomainQuestionView(false)}>Save</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DomainQuestionView;
