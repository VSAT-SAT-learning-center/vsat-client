import { Pagination } from "antd";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import DomainDropdown from "~/components/Staff/QuestionExam/DomainDropdown";
import LevelDropdown from "~/components/Staff/QuestionExam/LevelDropdown";
import SectionDropdown from "~/components/Staff/QuestionExam/SectionDropdown";
import SkillDropdown from "~/components/Staff/QuestionExam/SkillDropdown";
import NoQuestionData from "~/components/Staff/QuestionExamCreate/NoQuestionData";
import QuestionExamItem from "~/components/Staff/QuestionExamCreate/QuestionExamItem";
import QuestionItemPreview from "~/components/Staff/QuestionExamCreate/QuestionItemPreview";
import PageLayout from "~/layouts/Staff/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./QuestionExam.module.scss";
const cx = classNames.bind(styles);
const itemsPerPage = 10;

function QuestionExam() {
  const [bankType, setBankType] = useState("Approved");
  const [questionList, setQuestionList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isShowQuestionItemPreview, setIsShowQuestionItemPreview] =
    useState(false);
  const [questionPreview, setQuestionPreview] = useState({});
  const [sections, setSections] = useState([]);
  const [levels, setLevels] = useState([]);
  const [domains, setDomains] = useState([]);
  const [skills, setSkills] = useState([]);
  const [sectionId, setSectionId] = useState(null);
  const [section, setSection] = useState("Select Section");
  const [showSection, setShowSection] = useState(false);
  const [levelId, setLevelId] = useState(null);
  const [level, setLevel] = useState("Select Level");
  const [showLevel, setShowLevel] = useState(false);
  const [domainId, setDomainId] = useState(null);
  const [domain, setDomain] = useState("Select Domain");
  const [showDomain, setShowDomain] = useState(false);
  const [skillId, setSkillId] = useState(null);
  const [skill, setSkill] = useState("Select Skill");
  const [showSkill, setShowSkill] = useState(false);

  const fetchQuestions = async () => {
    try {
      const response = await apiClient.get(
        `/questions/searchQuestionsByStatus/${bankType}`,
        {
          params: {
            page: currentPage,
            pageSize: itemsPerPage,
            skillId,
            domainId,
            levelId,
            sectionId,
          },
        }
      );
      setQuestionList(response.data.data.data);
      setTotalItems(response.data.data.totalItems);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, skillId, domainId, levelId, sectionId, bankType]);

  useEffect(() => {
    const fetchLevelsAndSections = async () => {
      try {
        const [levelsResponse, sectionsResponse] = await Promise.all([
          apiClient.get("/level"),
          apiClient.get("/section"),
        ]);
        setLevels(levelsResponse.data.data);
        setSections(sectionsResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchLevelsAndSections();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSelectSection = () => {
    setShowSection(!showSection);
  };

  const handleSelectLevel = () => {
    setShowLevel(!showLevel);
  };

  const handleSelectDomain = () => {
    setShowDomain(!showDomain);
  };

  const handleSelectSkill = () => {
    setShowSkill(!showSkill);
  };

  const handleDeleteLevelSelect = () => {
    setLevel("Select Level");
    setLevelId(null);
    setShowLevel(false);
  };

  const handleDeleteSectionSelect = () => {
    setSection("Select Section");
    setDomain("Select Domain");
    setSkill("Select Skill");
    setSectionId(null);
    setShowSection(false);
    setDomains([]);
    setSkills([]);
  };

  const handleDeleteDomainSelect = () => {
    setDomain("Select Domain");
    setDomainId(null);
    setShowDomain(false);
    setSkills([]);
  };

  const handleDeleteSkillSelect = () => {
    setSkill("Select Skill");
    setSkillId(null);
    setShowSkill(false);
  };

  return (
    <>
      {isShowQuestionItemPreview && (
        <QuestionItemPreview
          questionPreviewData={questionPreview}
          setIsShowQuestionItemPreview={setIsShowQuestionItemPreview}
        />
      )}
      <PageLayout>
        <div className={cx("question-exam-wrapper")}>
          <div className={cx("question-exam-container")}>
            <div className={cx("question-exam-header")}>
              <div className={cx("question-search-container")}>
                {/* Level */}
                <div className={cx("search-item")}>
                  <div
                    className={cx("selected-text")}
                    onClick={handleSelectLevel}
                  >
                    {level}
                  </div>
                  {level === "Select Level" ? (
                    <i
                      className={cx(
                        showLevel
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
                {/* Section */}
                <div className={cx("search-item")}>
                  <div
                    className={cx("selected-text")}
                    onClick={handleSelectSection}
                  >
                    {section}
                  </div>
                  {section === "Select Section" ? (
                    <i
                      className={cx(
                        showSection
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
                        handleDeleteSectionSelect();
                      }}
                    ></i>
                  )}
                </div>
                {/* Domain */}
                <div
                  className={cx("search-item", {
                    disabled: !domains || domains.length === 0,
                  })}
                >
                  <div
                    className={cx("selected-text")}
                    onClick={handleSelectDomain}
                  >
                    {domain}
                  </div>
                  {domain === "Select Domain" ? (
                    <i
                      className={cx(
                        showDomain
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
                        handleDeleteDomainSelect();
                      }}
                    ></i>
                  )}
                </div>
                {/* Skill */}
                <div
                  className={cx("search-item", {
                    disabled: !skills || skills.length === 0,
                  })}
                >
                  <div
                    className={cx("selected-text")}
                    onClick={handleSelectSkill}
                  >
                    {skill}
                  </div>
                  {skill === "Select Skill" ? (
                    <i
                      className={cx(
                        showSkill
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
                {showLevel && (
                  <LevelDropdown
                    levels={levels}
                    levelId={levelId}
                    setLevel={setLevel}
                    setShowLevel={setShowLevel}
                    setLevelId={setLevelId}
                  />
                )}
                {showSection && (
                  <SectionDropdown
                    sections={sections}
                    sectionId={sectionId}
                    setSection={setSection}
                    setShowSection={setShowSection}
                    setSectionId={setSectionId}
                    setDomains={setDomains}
                    setDomain={setDomain}
                    setSkill={setSkill}
                    setSkills={setSkills}
                  />
                )}
                {showDomain && (
                  <DomainDropdown
                    domains={domains}
                    domainId={domainId}
                    setDomain={setDomain}
                    setShowDomain={setShowDomain}
                    setDomainId={setDomainId}
                    setSkills={setSkills}
                  />
                )}
                {showSkill && (
                  <SkillDropdown
                    skills={skills}
                    skillId={skillId}
                    setSkill={setSkill}
                    setShowSkill={setShowSkill}
                    setSkillId={setSkillId}
                  />
                )}
              </div>
              <div className={cx("question-options")}>
                {["Approved", "Pending"].map((status) => (
                  <button
                    key={status}
                    className={cx(`${status.toLowerCase()}-btn`, {
                      [`active-${status.toLowerCase()}`]: bankType === status,
                    })}
                    onClick={() => setBankType(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>

            </div>
            <div className={cx("question-exam-content")}>
              {questionList?.length > 0 ? (
                <div className={cx("question-exam-list")}>
                  {questionList.map((question, index) => (
                    <QuestionExamItem
                      key={index}
                      index={index + (currentPage - 1) * itemsPerPage}
                      question={question}
                      setQuestionPreview={setQuestionPreview}
                      setIsShowQuestionItemPreview={
                        setIsShowQuestionItemPreview
                      }
                    />
                  ))}
                </div>
              ) : (
                <NoQuestionData />
              )}
              {questionList?.length > 0 && (
                <div className={cx("pagination-controls")}>
                  <Pagination
                    align="center"
                    current={currentPage}
                    pageSize={itemsPerPage}
                    total={totalItems}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    showLessItems={true}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <LearningMaterialCreateFooter />
      </PageLayout>
    </>
  );
}

export default QuestionExam;
