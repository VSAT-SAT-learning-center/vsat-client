import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import apiClient from "~/services/apiService";
import ViewTableDistribution from "../../ExamStructureCreate/ExamStructureCreateView/StructureConfig/ViewTableDistribution";
import ViewTableScore from "../../ExamStructureCreate/ExamStructureCreateView/StructureConfig/ViewTableScore";
import DomainQuestionCreateModal from "./DomainQuestionCreateModal";
import styles from "./ExamCreateModal.module.scss";
import ModuleConfig from "./ModuleConfig";
import ModuleQuestionCreate from "./ModuleQuestionCreate";
const cx = classNames.bind(styles);
function ExamCreateModal({ setIsShowCreateExamModal }) {
  const [isShowGeneralContent, setIsShowGeneralContent] = useState(true);
  const [isShowAdvancedSetting, setIsShowAdvancedSetting] = useState(false);
  const [examStructures, setExamStructures] = useState([]);
  const [examTypes, setExamTypes] = useState([]);
  const [examStructureSelected, setExamStructureSelected] = useState(null);
  const [examScoreSelected, setExamScoreSelected] = useState([]);
  const [
    examQuestionDistributionSelected,
    setExamQuestionDistributionSelected,
  ] = useState([]);
  const [isShowExamScoreTable, setIsShowExamScoreTable] = useState(false);
  const [
    isShowExamQuestionDistributionTable,
    setIsShowExamQuestionDistributionTable,
  ] = useState(false);
  const [structureModuleConfigs, setStructureModuleConfigs] = useState([]);
  const [structureModuleQuestions, setStructureModuleQuestions] = useState([]);
  const [isShowDomainQuestionCreateModal, setIsShowModalCreateQuestionModal] =
    useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [examStructuresResponse, examTypesResponse] = await Promise.all([
          apiClient.get("/exam-structures", {
            params: {
              page: 1,
              pageSize: 0,
            },
          }),
          apiClient.get("/exam-types", {
            params: {
              page: 1,
              pageSize: 0,
            },
          }),
        ]);

        setExamStructures(examStructuresResponse.data.data.result);
        setExamTypes(examTypesResponse.data.data.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);
  const toggleGeneralContent = () => {
    setIsShowGeneralContent(!isShowGeneralContent);
    if (!isShowGeneralContent) setIsShowAdvancedSetting(false);
  };

  const toggleAdvancedSetting = () => {
    setIsShowAdvancedSetting(!isShowAdvancedSetting);
    if (!isShowAdvancedSetting) setIsShowGeneralContent(false);
  };

  const handleChangeExamStructure = async (e) => {
    const selectedStructureId = e.target.value;
    const selectedStructure = examStructures.find(
      (structure) => structure.id === selectedStructureId
    );

    if (!selectedStructure) return;

    const sectionOrder = { "Reading & Writing": 1, Math: 2 };
    const levelOrder = { Easy: 1, Hard: 2, null: 3 };

    // Sort modules by section, name, and level
    const sortedModules = selectedStructure.moduletype.sort((a, b) => {
      if (sectionOrder[a.section] !== sectionOrder[b.section]) {
        return sectionOrder[a.section] - sectionOrder[b.section];
      }
      if (a.name !== b.name) return a.name.localeCompare(b.name);
      return levelOrder[a.level] - levelOrder[b.level];
    });
    console.log(sortedModules);
    setStructureModuleQuestions(sortedModules);

    // Group modules by section
    const mergedModules = selectedStructure.moduletype.reduce((acc, module) => {
      const section = acc.find((item) => item.section === module.section);
      if (section) {
        section.modules.push(module);
      } else {
        acc.push({ section: module.section, modules: [module] });
      }
      return acc;
    }, []);

    // Sort merged modules by section order, then by module name and level
    mergedModules.sort(
      (a, b) => sectionOrder[a.section] - sectionOrder[b.section]
    );
    mergedModules.forEach((section) => {
      section.modules.sort((a, b) => {
        const moduleNumberA = parseInt(a.name.split(" ")[1], 10);
        const moduleNumberB = parseInt(b.name.split(" ")[1], 10);
        if (moduleNumberA !== moduleNumberB)
          return moduleNumberA - moduleNumberB;
        return levelOrder[a.level] - levelOrder[b.level];
      });
    });

    setStructureModuleConfigs(mergedModules);
    setExamStructureSelected(selectedStructure);

    try {
      const { examScore, examSemester } = selectedStructure;
      const [examScoreResponse, examSemesterResponse] = await Promise.all([
        apiClient.get(`/exam-scores/${examScore.id}`),
        apiClient.get(`/exam-semester/${examSemester.id}/details`),
      ]);

      setExamScoreSelected(examScoreResponse.data.data);
      setExamQuestionDistributionSelected(examSemesterResponse.data.data);
    } catch (error) {
      console.error("Error fetching exam data", error);
    }
  };

  return (
    <>
      {isShowExamScoreTable && (
        <ViewTableScore
          viewScoreDetailData={examScoreSelected}
          setIsShowScoreDetail={setIsShowExamScoreTable}
        />
      )}

      {isShowExamQuestionDistributionTable && (
        <ViewTableDistribution
          distributionDetailData={examQuestionDistributionSelected}
          setIsShowDistributionDetail={setIsShowExamQuestionDistributionTable}
        />
      )}

      {isShowDomainQuestionCreateModal && (
        <DomainQuestionCreateModal
          setIsShowModalCreateQuestionModal={setIsShowModalCreateQuestionModal}
        />
      )}

      <div className={cx("exam-create-modal-wrapper")}>
        <div className={cx("exam-create-modal-container")}>
          <div className={cx("exam-create-modal-header")}>
            <div
              className={cx("exam-close")}
              onClick={() => setIsShowCreateExamModal(false)}
            >
              <i className={cx("fa-regular fa-arrow-left")}></i>
            </div>
            <div className={cx("exam-title")}>Create Exam</div>
            <div className={cx("exam-empty")}></div>
          </div>
          <div className={cx("exam-create-modal-content")}>
            <div className={cx("exam-create-modal-main")}>
              {/* General information */}
              <div className={cx("general-information-container")}>
                <div
                  className={cx("general-information-header")}
                  onClick={toggleGeneralContent}
                >
                  <div className={cx("general-information-title")}>
                    General information
                  </div>
                  <div
                    className={cx(
                      "show-icon",
                      isShowGeneralContent ? "rotate" : ""
                    )}
                  >
                    <i className={cx("fa-solid fa-chevron-up")}></i>
                  </div>
                </div>
                <div
                  className={cx(
                    "general-information-content",
                    isShowGeneralContent ? "show" : ""
                  )}
                >
                  <div className={cx("exam-title-container")}>
                    <div className={cx("exam-title-icon")}>
                      <i className={cx("fa-light fa-pen-to-square")}></i>
                    </div>
                    <div className={cx("exam-title-input")}>
                      <input
                        type="text"
                        className={cx("title-input")}
                        placeholder="Exam Title"
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className={cx("exam-desc-container")}>
                    <div className={cx("exam-desc-icon")}>
                      <i className={cx("fa-light fa-pen-to-square")}></i>
                    </div>
                    <div className={cx("exam-desc-input")}>
                      <textarea
                        className={cx("desc-input")}
                        placeholder="Brief description"
                      ></textarea>
                    </div>
                  </div>
                  <div className={cx("exam-config-container")}>
                    <div className={cx("exam-structure-container")}>
                      <div className={cx("exam-structure-icon")}>
                        <i className={cx("fa-light fa-pen-to-square")}></i>
                      </div>
                      <div className={cx("exam-structure-select")}>
                        <div className={cx("type-structure")}>
                          Exam Structure
                        </div>
                        <select
                          id="type-structure"
                          className={cx("structure-select")}
                          onChange={handleChangeExamStructure}
                        >
                          <option value="">Select structure</option>
                          {examStructures.map((structure) => (
                            <option value={structure.id} key={structure.id}>
                              {structure.structurename}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className={cx("exam-type-container")}>
                      <div className={cx("exam-type-select")}>
                        <div className={cx("type-exam-type")}>Exam Type</div>
                        <select
                          id="type-exam-type"
                          className={cx("type-select")}
                        >
                          <option value="">Select type</option>
                          {examTypes.map((type) => (
                            <option value={type.id} key={type.id}>
                              {type.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  {examStructureSelected !== null && (
                    <div className={cx("show-exam-config-container")}>
                      <div className={cx("exam-config-container")}>
                        <div className={cx("exam-config-icon")}>
                          <i className={cx("fa-light fa-eye")}></i>
                        </div>
                        <div className={cx("exam-config-select")}>
                          <div className={cx("type-config")}>
                            Exam Question Distribution
                          </div>
                          <div className={cx("config-content")}>
                            <div className={cx("name-config")}>
                              <div className={cx("name")}>
                                {examStructureSelected?.examSemester?.title}
                              </div>
                            </div>
                            <button
                              className={cx("view-config")}
                              onClick={() =>
                                setIsShowExamQuestionDistributionTable(true)
                              }
                            >
                              <i
                                className={cx(
                                  "fa-regular fa-arrow-up-right-from-square"
                                )}
                              ></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className={cx("exam-config-container")}>
                        <div className={cx("exam-config-select")}>
                          <div className={cx("type-config")}>
                            Exam Score Distribution
                          </div>
                          <div className={cx("config-content")}>
                            <div className={cx("name-config")}>
                              <div className={cx("name")}>
                                {examStructureSelected?.examScore?.title}
                              </div>
                            </div>
                            <button
                              className={cx("view-config")}
                              onClick={() => setIsShowExamScoreTable(true)}
                            >
                              <i
                                className={cx(
                                  "fa-regular fa-arrow-up-right-from-square"
                                )}
                              ></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* Module config time */}
              <div className={cx("advanced-setting-container")}>
                <div
                  className={cx("advanced-setting-header")}
                  onClick={toggleAdvancedSetting}
                >
                  <div className={cx("advanced-setting-title")}>
                    Advanced settings
                  </div>
                  <div
                    className={cx(
                      "show-icon",
                      isShowAdvancedSetting ? "rotate" : ""
                    )}
                  >
                    <i className={cx("fa-solid fa-chevron-up")}></i>
                  </div>
                </div>
                <div
                  className={cx(
                    "advanced-setting-content",
                    isShowAdvancedSetting ? "show" : ""
                  )}
                >
                  <div className={cx("module-tile-container")}>
                    <div className={cx("module-time-icon")}>
                      <i className={cx("fa-light fa-clock")}></i>
                    </div>
                    <div className={cx("module-time-title")}>Molude time</div>
                  </div>
                  {structureModuleConfigs?.map((structureModule, index) => (
                    <ModuleConfig
                      key={index}
                      structureModule={structureModule}
                    />
                  ))}
                </div>
              </div>
              {/* Module question */}
              {structureModuleQuestions?.map((moduleQuestion) => (
                <ModuleQuestionCreate
                  key={moduleQuestion?.id}
                  moduleQuestion={moduleQuestion}
                  setIsShowModalCreateQuestionModal={
                    setIsShowModalCreateQuestionModal
                  }
                />
              ))}
              <div className={cx("empty-container")}></div>
            </div>
          </div>
          <div className={cx("exam-create-modal-footer")}>
            <button
              className={cx("cancel-btn")}
              onClick={() => setIsShowCreateExamModal(false)}
            >
              Cancel
            </button>
            <button className={cx("preview-btn")}>
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExamCreateModal;
