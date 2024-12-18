import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import QuestionItemPreview from "~/components/Staff/QuestionExamCreate/QuestionItemPreview";
import useDebounce from "~/hooks/useDebounce";
import apiClient from "~/services/apiService";
import styles from "./DomainQuestionView.module.scss";
import LevelDropdown from "./LevelDropdown";
import QuestionDropdown from "./QuestionDropdown";
import QuestionViewItem from "./QuestionViewItem";
import SkillDropdown from "./SkillDropdown";
const cx = classNames.bind(styles);

function DomainQuestionView({
  exam,
  fetchExamList,
  originalData,
  moduleData,
  domainData,
  setDomainData,
  setIsShowDomainQuestionView,
  setIsLoading
}) {
  const [isShowQuestionItemPreview, setIsShowQuestionItemPreview] =
    useState(false);
  const [questionPreviewData, setQuestionPreviewData] = useState(null);
  const [isShowSkillSelect, setIsShowSkillSelect] = useState(false);
  const [isShowLevelSelect, setIsShowLevelSelect] = useState(false);
  const [skillSelect, setSkillSelect] = useState("Select skill");
  const [levelSelect, setLevelSelect] = useState("Select level");
  const [skillIdSearch, setSkillIdSearch] = useState("");
  const [levelSearch, setLevelSearch] = useState("");
  const [skills, setSkills] = useState([]);
  const [levels, setLevels] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchQuestionResult, setSearchQuestionResult] = useState([]);
  const [isQuestionDropdownVisible, setIsQuestionDropdownVisible] =
    useState(false);
  const [originalQuestionIds, setOriginalQuestionIds] = useState([]);
  const [updateDeleteExamQuestion, setUpdateDeleteExamQuestion] = useState([]);
  const [updateQuestion, setUpdateQuestion] = useState([]);

  const debouncedValue = useDebounce(searchValue, 300);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillsResponse, levelsResponse] = await Promise.all([
          apiClient.get(`/skills/domain/${domainData.domain}`),
          apiClient.get("/level"),
        ]);

        setSkills(skillsResponse.data);
        setLevels(levelsResponse.data.data);
        const originalIds = originalData?.questions.map((q) => q.id);
        setOriginalQuestionIds(originalIds);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [domainData.domain, originalData?.questions]);

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchQuestionResult([]);
      setIsQuestionDropdownVisible(false);
      return;
    }

    const fetchSearchQuestions = async () => {
      try {
        const response = await apiClient(
          `/questions/searchQuestions/${debouncedValue}`,
          {
            params: {
              page: 1,
              pageSize: 0,
              skillId: skillIdSearch,
              domain: domainData.domain,
              level: levelSearch,
            },
          }
        );
        setSearchQuestionResult(response.data.data.data);
        setIsQuestionDropdownVisible(true);
        setIsShowSkillSelect(false);
        setIsShowLevelSelect(false);
      } catch (error) {
        console.error("Error search question!", error);
      }
    };
    fetchSearchQuestions();
  }, [debouncedValue, domainData.domain, levelSearch, skillIdSearch]);

  const handleChangeSearchInput = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };

  const handleClickSelectDropdownSkill = (skill) => {
    setSkillIdSearch(skill?.id);
    setIsShowSkillSelect(false);
    setSkillSelect(skill?.content);
  };

  const handleClickSelectDropdownLevel = (level) => {
    setLevelSearch(level?.name);
    setIsShowLevelSelect(false);
    setLevelSelect(level?.name);
  };

  const handleDeleteSkillSelect = () => {
    setSkillSelect("Select skill");
    setSkillIdSearch("");
    setIsShowSkillSelect(false);
  };

  const handleDeleteLevelSelect = () => {
    setLevelSelect("Select level");
    setIsShowLevelSelect(false);
  };

  const filteredSearchQuestionResult = searchQuestionResult.filter(
    (question) =>
      !domainData.questions.some((selected) => selected.id === question.id)
  );

  const handleClickUpdateQuestionModule = async () => {
    if (updateDeleteExamQuestion.length === 0 && updateQuestion.length === 0) {
      setIsShowDomainQuestionView(false);
      return;
    }
    try {
      setIsLoading(true)
      const payload = {
        updateDeleteExamQuestion: updateDeleteExamQuestion,
        updateQuestion: updateQuestion,
      };
      console.log(payload);

      const res = await apiClient.patch("/exam-questions", payload);
      console.log(res.data);

      const updatedExams = await fetchExamList();
      const updatedExam = updatedExams.find((examItem) => examItem.id === exam.id);
      const updateExamQuestions = updatedExam?.examQuestions.find((module) => module.id === moduleData.id)
      const updatedDomain = updateExamQuestions?.domains?.find(
        (domain) => domain.domain === domainData?.domain
      );

      if (updatedDomain) {
        setDomainData(updatedDomain);
        toast.success("Update question successfully!", {
          autoClose: 1500
        })
        setIsShowDomainQuestionView(false);
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Error while update exam:", error);
      toast.error("Update question failed!", {
        autoClose: 1500
      })
    } finally {
      setIsLoading(false)
    }
  };
  return (
    <>
      {isShowQuestionItemPreview && (
        <QuestionItemPreview
          questionPreviewData={questionPreviewData}
          setIsShowQuestionItemPreview={setIsShowQuestionItemPreview}
        />
      )}
      <div className={cx("domain-create-question-modal-wrapper")}>
        <div className={cx("domain-create-question-modal-container")}>
          <div className={cx("domain-create-question-modal-header")}>
            <div className={cx("domain-name")}>{domainData?.domain}</div>
          </div>
          {exam?.status === "Rejected" && (
            <div className={cx("domain-create-question-modal-search")}>
              <div className={cx("search-question-container")}>
                <div className={cx("search-content")}>
                  <div className={cx("search-icon")}>
                    <i
                      className={cx("fa-regular fa-magnifying-glass", "icon")}
                    ></i>
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
                {isQuestionDropdownVisible && (
                  <QuestionDropdown
                    setSearchValue={setSearchValue}
                    searchQuestionResult={filteredSearchQuestionResult}
                    domainQuestions={domainData}
                    setDomainQuestions={setDomainData}
                    setIsQuestionDropdownVisible={setIsQuestionDropdownVisible}
                    setUpdateQuestion={setUpdateQuestion}
                    examId={exam?.id}
                    moduleTypeId={moduleData?.id}
                  />
                )}
                {isShowSkillSelect && (
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
                )}
              </div>
            </div>
          )}
          <div className={cx("domain-create-question-modal-content")}>
            <div className={cx("domain-create-question-modal")}>
              {domainData?.questions?.map((question, index) => (
                <QuestionViewItem
                  key={question.id}
                  index={index + 1}
                  status={exam?.status}
                  question={question}
                  setQuestionPreviewData={setQuestionPreviewData}
                  setIsShowQuestionItemPreview={setIsShowQuestionItemPreview}
                  setDomainQuestions={setDomainData}
                  setUpdateDeleteExamQuestion={setUpdateDeleteExamQuestion}
                  setUpdateQuestion={setUpdateQuestion}
                  originalQuestionIds={originalQuestionIds}
                />
              ))}
            </div>
          </div>
          <div className={cx("domain-create-question-modal-footer")}>
            <button
              className={cx("cancel-btn")}
              onClick={() => setIsShowDomainQuestionView(false)}
            >
              Cancel
            </button>
            {exam?.status === "Rejected" && (
              <button
                className={cx("preview-btn", {
                  "disabled-btn":
                    domainData?.questions.length < domainData.numberofquestion ||
                    domainData?.questions.length > domainData.numberofquestion,
                })}
                onClick={handleClickUpdateQuestionModule}
                disabled={
                  domainData?.questions.length < domainData.numberofquestion ||
                  domainData?.questions.length > domainData.numberofquestion
                }
              >
                <i className={cx("fa-regular fa-floppy-disk", "preview-icon")}></i>
                <span>Save</span>
              </button>

            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default DomainQuestionView;
