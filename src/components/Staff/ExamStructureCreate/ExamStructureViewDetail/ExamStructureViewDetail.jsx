import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
import apiClient from "~/services/apiService";
import TableViewScore from "../../ExamScoreCreate/TableViewScore";
import TableViewDistribution from "../ExamStructureCreateView/StructureConfig/ViewTableDistribution/TableViewDistribution";
import styles from "./ExamStructureViewDetail.module.scss";

const cx = classNames.bind(styles);

function ExamStructureViewDetail({
  viewStructureDetailData,
  setIsShowExamStructureViewDetail,
}) {
  const [dataSource, setDataSource] = useState([]);
  const [rwData, setRwData] = useState([]);
  const [mathData, setMathData] = useState([]);
  const [section, setSection] = useState("Reading & Writing");
  const [questionDistribution, setQuestionDistribution] = useState({});
  const [groupedModules, setGroupedModules] = useState([]);

  const fetchExamQuestionDistributions = useCallback(async (examSemesterId) => {
    try {
      const response = await apiClient.get(
        `/exam-semester/${examSemesterId}/details`
      );
      setQuestionDistribution(response.data.data || {});
    } catch (error) {
      console.error("Error while fetching exam question distributions:", error);
    }
  }, []);

  const fetchExamScores = useCallback(
    async (examScoreId) => {
      try {
        const response = await apiClient.get(`/exam-scores/${examScoreId}`);
        const examScores = response.data.data.examScoreDetails || [];

        const { rwScores, mathScores } = examScores.reduce(
          (acc, score) => {
            const formattedScore = {
              id: score.id,
              section: score.section.name,
              rawscore: score.rawscore,
              lowerscore: score.lowerscore,
              upperscore: score.upperscore,
            };

            if (score.section.name === "Reading & Writing") {
              acc.rwScores.push(formattedScore);
            } else if (score.section.name === "Math") {
              acc.mathScores.push(formattedScore);
            }

            return acc;
          },
          { rwScores: [], mathScores: [] }
        );

        setRwData(rwScores);
        setMathData(mathScores);
        setDataSource(section === "Reading & Writing" ? rwScores : mathScores);
      } catch (error) {
        console.error("Error while fetching exam scores:", error);
      }
    },
    [section]
  );

  useEffect(() => {
    if (viewStructureDetailData?.examSemester?.id) {
      fetchExamQuestionDistributions(viewStructureDetailData.examSemester.id);
    }
    if (viewStructureDetailData?.examScore?.id) {
      fetchExamScores(viewStructureDetailData.examScore.id);
    }
  }, [
    viewStructureDetailData?.examScore?.id,
    viewStructureDetailData?.examSemester?.id,
    fetchExamScores,
    fetchExamQuestionDistributions,
  ]);

  useEffect(() => {
    if (viewStructureDetailData?.moduletype) {
      const grouped = viewStructureDetailData.moduletype.reduce(
        (acc, module) => {
          const sectionIndex = acc.findIndex(
            (item) => item.section === module.section
          );

          if (sectionIndex === -1) {
            acc.push({
              section: module.section,
              modules: [module],
            });
          } else {
            acc[sectionIndex].modules.push(module);
          }

          return acc;
        },
        []
      );
      grouped.sort((a) => (a.section === "Reading & Writing" ? -1 : 1));

      grouped.forEach((section) => {
        section.modules.sort((a, b) => {
          if (a.name !== b.name) {
            return a.name === "Module 1" ? -1 : 1;
          }
          if (a.level && b.level) {
            if (a.level === "Easy" && b.level === "Hard") return -1;
            if (a.level === "Hard" && b.level === "Easy") return 1;
          }
          return 0;
        });
      });
      setGroupedModules(grouped);
    }
  }, [viewStructureDetailData]);

  const loadDataBySection = (selectedSection) => {
    setSection(selectedSection);
    setDataSource(selectedSection === "Reading & Writing" ? rwData : mathData);
  };

  return (
    <div className={cx("exam-structure-view-detail-wrapper")}>
      <div className={cx("exam-structure-view-detail-container")}>
        <div className={cx("exam-structure-view-detail-header")}>
          <div
            className={cx("structure-close")}
            onClick={() => setIsShowExamStructureViewDetail(false)}
          >
            <i className={cx("fa-regular fa-arrow-left")}></i>
          </div>
          <div className={cx("structure-title")}>View Exam Structure</div>
          <div className={cx("structure-empty")}></div>
        </div>
        <div className={cx("exam-structure-view-detail-content")}>
          <div className={cx("config-information")}>
            <div className={cx("config-infor-item")}>
              <div className={cx("config-title")}>Exam Structure Name</div>
              <div className={cx("config-input")}>
                <div className={cx("title-input")}>
                  {viewStructureDetailData?.structurename}
                </div>
              </div>
            </div>
            <div className={cx("config-infor-item")}>
              <div className={cx("config-title")}>
                Exam Structure Description
              </div>
              <div className={cx("config-input")}>
                <div className={cx("title-input")}>
                  {viewStructureDetailData?.description}
                </div>
              </div>
            </div>
            <div className={cx("config-infor-item")}>
              <div className={cx("config-title")}>Exam Structure Type</div>
              <div className={cx("config-input")}>
                <div className={cx("title-input")}>
                  {viewStructureDetailData?.examStructureType?.name}
                </div>
              </div>
            </div>
          </div>
          {viewStructureDetailData?.examStructureType?.name === "Adaptive" && (
            <div className={cx("config-with-mechanism")}>
              <div className={cx("mechanism-item")}>
                <div className={cx("mechanism-title")}>
                  Required correct question in Module 1{" "}
                  <span className={cx("required")}>(Reading & Writing)</span>
                </div>
                <div className={cx("mechanism-input")}>
                  <div className={cx("title-input")}>
                    {viewStructureDetailData?.requiredCorrectInModule1RW}
                  </div>
                </div>
              </div>
              <div className={cx("mechanism-item")}>
                <div className={cx("mechanism-title")}>
                  Required correct question in Module 1{" "}
                  <span className={cx("required")}>(Math)</span>
                </div>
                <div className={cx("mechanism-input")}>
                  <div className={cx("title-input")}>
                    {viewStructureDetailData?.requiredCorrectInModule1M}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className={cx("view-module-config")}>
            <div className={cx("view-module-config-title")}>
              Exam Module Config
            </div>
            <div className={cx("section-view-module-wrapper")}>
              {groupedModules?.length > 0 &&
                groupedModules.map((section, index) => (
                  <div
                    className={cx("section-view-module-container")}
                    key={index}
                  >
                    <div className={cx("section-view-module-header")}>
                      <div className={cx("section-icon")}>
                        <i className={cx("fa-regular fa-book", "icon")}></i>
                      </div>
                      <div className={cx("section-infor")}>
                        <div className={cx("section-title")}>
                          {section.section}
                        </div>
                        <div className={cx("section-number")}>
                          {section.section === "Math" ? 44 : 54}
                        </div>
                      </div>
                    </div>
                    <div className={cx("section-view-module-content")}>
                      {section.modules.map((module, idx) => (
                        <div className={cx("module-item-container")} key={idx}>
                          <div className={cx("module-item-header")}>
                            <div className={cx("module-icon")}>
                              <i
                                className={cx("fa-regular fa-file-pen", "icon")}
                              ></i>
                            </div>
                            <div className={cx("module-infor")}>
                              <div className={cx("module-title")}>
                                {module.name}{" "}
                                {module?.level ? `(${module?.level})` : ""}
                              </div>
                              <div className={cx("module-number")}>
                                {module.numberOfQuestion}
                              </div>
                            </div>
                          </div>
                          <div className={cx("module-item-content")}>
                            {module.domaindistribution?.map((domain, indx) => (
                              <div className={cx("domain-item")} key={indx}>
                                <div className={cx("domain-infor")}>
                                  <div className={cx("domain-icon")}>
                                    <i
                                      className={cx(
                                        "fa-regular fa-pen-to-square",
                                        "icon"
                                      )}
                                    ></i>
                                  </div>
                                  <div className={cx("domain-title")}>
                                    {domain.domain}
                                  </div>
                                </div>
                                <div className={cx("domain-number")}>
                                  {domain.numberofquestion}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className={cx("view-exam-question-distribution")}>
            <div className={cx("view-exam-question-distribution-title")}>
              Exam Question Distribution
            </div>
            <TableViewDistribution dataSource={questionDistribution} />
          </div>
          <div className={cx("view-exam-score")}>
            <div className={cx("view-exam-score-title")}>
              Exam Structure Score
            </div>
            <div className={cx("exam-score-options")}>
              <button
                className={cx("option-btn", {
                  "active-btn": section === "Reading & Writing",
                })}
                onClick={() => loadDataBySection("Reading & Writing")}
              >
                Reading & Writing
              </button>
              <button
                className={cx("option-btn", {
                  "active-btn": section === "Math",
                })}
                onClick={() => loadDataBySection("Math")}
              >
                Math
              </button>
            </div>
            <TableViewScore dataSource={dataSource} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamStructureViewDetail;
