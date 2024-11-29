import { Pagination } from "antd";
import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
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
const itemsPerPage = 5;

function QuestionExam() {
  const [bankType, setBankType] = useState("Pending");
  const [questionList, setQuestionList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isShowQuestionItemPreview, setIsShowQuestionItemPreview] =
    useState(false);
  const [questionPreview, setQuestionPreview] = useState({});
  const [sections, setSections] = useState([]);
  const [levels, setLevels] = useState([]);
  const [section, setSection] = useState("Select Section");
  const [showSection, setShowSection] = useState(false);
  const [level, setLevel] = useState("Select Level");
  const [showLevel, setShowLevel] = useState(false);
  const [domain, setDomain] = useState("Select Domain");
  const [showDomain, setShowDomain] = useState(false);
  const [skill, setSkill] = useState("Select Skill");
  const [showSkill, setShowSkill] = useState(false);

  const fetchQuestions = useCallback(async () => {
    try {
      const response = await apiClient.get(
        `/questions/getAllWithstatusByCreateBy`,
        {
          params: {
            page: currentPage,
            pageSize: itemsPerPage,
            status: bankType,
          },
        }
      );
      setQuestionList(response.data.data.data);
      setTotalItems(response.data.data.totalItems);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }, [currentPage, bankType]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

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
              {/* <div className={cx("question-text")}>Question Bank</div> */}
              <div className={cx("question-search-container")}>
                <div
                  className={cx("search-item")}
                  onClick={handleSelectSection}
                >
                  <div className={cx("selected-text")}>{section}</div>
                  <i
                    className={cx(
                      showSection
                        ? "fa-regular fa-chevron-down"
                        : "fa-regular fa-chevron-up",
                      "icon-select"
                    )}
                  ></i>
                </div>
                <div className={cx("search-item")} onClick={handleSelectLevel}>
                  <div className={cx("selected-text")}>{level}</div>
                  <i
                    className={cx(
                      showLevel
                        ? "fa-regular fa-chevron-down"
                        : "fa-regular fa-chevron-up",
                      "icon-select"
                    )}
                  ></i>
                </div>
                <div
                  className={cx("search-item", "disabled")}
                  onClick={handleSelectDomain}
                >
                  <div className={cx("selected-text")}>{domain}</div>
                  <i
                    className={cx(
                      showDomain
                        ? "fa-regular fa-chevron-down"
                        : "fa-regular fa-chevron-up",
                      "icon-select"
                    )}
                  ></i>
                </div>
                <div
                  className={cx("search-item", "disabled")}
                  onClick={handleSelectSkill}
                >
                  <div className={cx("selected-text")}>{skill}</div>
                  <i
                    className={cx(
                      showSkill
                        ? "fa-regular fa-chevron-down"
                        : "fa-regular fa-chevron-up",
                      "icon-select"
                    )}
                  ></i>
                </div>
                {showSection && (
                  <SectionDropdown
                    sections={sections}
                    setSection={setSection}
                    setShowSection={setShowSection}
                  />
                )}
                {showLevel && (
                  <LevelDropdown
                    levels={levels}
                    setLevel={setLevel}
                    setShowLevel={setShowLevel}
                  />
                )}
                {showDomain && <DomainDropdown setDomain={setDomain} />}
                {showSkill && <SkillDropdown setSkill={setSkill} />}
              </div>
              <div className={cx("question-options")}>
                <button
                  className={cx("approve-btn", {
                    "active-approve": bankType === "Approved",
                  })}
                  onClick={() => setBankType("Approved")}
                >
                  Approved
                </button>
                <button
                  className={cx("pending-btn", {
                    "active-pending": bankType === "Pending",
                  })}
                  onClick={() => setBankType("Pending")}
                >
                  Pending
                </button>
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
