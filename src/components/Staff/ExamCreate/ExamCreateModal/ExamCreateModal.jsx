import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import Loader from "~/components/General/Loader";
import apiClient from "~/services/apiService";
import { generateExcelTemplate } from "~/utils/generateExcelTemplate";
import ViewTableDistribution from "../../ExamStructureCreate/ExamStructureCreateView/StructureConfig/ViewTableDistribution";
import ViewTableScore from "../../ExamStructureCreate/ExamStructureCreateView/StructureConfig/ViewTableScore";
import DomainQuestionCreateModal from "./DomainQuestionCreateModal";
import styles from "./ExamCreateModal.module.scss";
import ModuleQuestionCreate from "./ModuleQuestionCreate";
const cx = classNames.bind(styles);
function ExamCreateModal({ setIsShowCreateExamModal, fetchExamList }) {
  const [loading, setLoading] = useState(false);
  const [isShowGeneralContent, setIsShowGeneralContent] = useState(true);
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
  const [structureModuleQuestions, setStructureModuleQuestions] = useState([]);
  const [isShowDomainQuestionCreateModal, setIsShowModalCreateQuestionModal] =
    useState(false);
  const [domainData, setDomainData] = useState(null);
  const [examData, setExamData] = useState({
    title: "",
    description: "",
    examStructureId: "",
    examTypeId: "",
    examQuestions: [
      {
        moduleId: "",
        domains: [
          {
            domain: "",
            questions: [],
          },
        ],
      },
    ],
  });
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

    setStructureModuleQuestions(sortedModules);
    setExamStructureSelected(selectedStructure);

    const newExamQuestions = sortedModules.map((module) => ({
      moduleId: module.id,
      domains: module.domaindistribution.map((domain) => ({
        domain: domain.domain,
        questions: [],
      })),
    }));

    setExamData((prevExamData) => ({
      ...prevExamData,
      examQuestions: newExamQuestions,
    }));

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

  const handleInputChange = (field) => (e) => {
    setExamData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Transform modules with a focus on detailed mapping
        const transformedModules = structureModuleQuestions.map((module) => ({
          moduleId: module.id,
          moduleName: module.name, // Module name
          moduleLevel: module.level, // Module level
          section: module.section, // Section
          domains: module.domaindistribution.map((domain) => ({
            domain: domain.domain,
            questions: [],
            numberOfQuestion: domain.numberofquestion,
          })),
        }));

        let questionContents = [];

        // Process each sheet in the workbook
        workbook.SheetNames.forEach((sheetName) => {
          const worksheet = workbook.Sheets[sheetName];
          const jsonSheetData = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
          });

          // Extract details from the sheet name
          const moduleMatch = sheetName.match(/Module (\d+)/);
          const levelMatch = sheetName.match(/Easy|Hard/);
          const sectionMatch = sheetName.match(/\(.*?\)/);

          const moduleName = moduleMatch ? `Module ${moduleMatch[1]}` : null;
          const moduleLevel = levelMatch ? levelMatch[0] : null;
          let section = sectionMatch
            ? sectionMatch[0].replace(/[()]/g, "").trim()
            : null;

          // Map shorthand section names to full names
          if (section === "RW") {
            section = "Reading & Writing";
          } else if (section === "Math") {
            section = "Math";
          }

          // Find the module using the extracted details
          const module = transformedModules.find(
            (m) =>
              m.moduleName === moduleName &&
              (m.moduleLevel === moduleLevel || !moduleLevel) &&
              m.section === section
          );

          if (module) {
            jsonSheetData.slice(1).forEach((row) => {
              const [domainName, content] = row;

              // Clean up content by removing extra spaces between words and trimming leading/trailing spaces
              const cleanedContent = content
                ? content.replace(/\s+/g, " ").trim()
                : "";

              // Only add non-empty cleaned content to questionContents
              if (cleanedContent) {
                questionContents.push(cleanedContent);
              }

              // Find the matching domain within the current module
              const domain = module.domains.find(
                (d) => d.domain === domainName
              );

              // Only add questions up to the specified number for each domain
              if (
                domain &&
                domain.questions.length < domain.numberOfQuestion &&
                cleanedContent
              ) {
                domain.questions.push({
                  content: cleanedContent,
                });
              }
            });
          }
        });

        questionContents = Array.from(
          new Set(questionContents.filter(Boolean))
        );

        // Fetch questions from the database
        fetchQuestionsFromDatabase(
          questionContents,
          transformedModules
        ).finally(() => setLoading(false));
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const fetchQuestionsFromDatabase = async (
    questionContents,
    transformedModules
  ) => {
    try {
      setLoading(true);
      const response = await apiClient.post("/questions/fetchByContent", {
        contents: questionContents,
      });
      const questionsFromDB = response.data;

      const final = transformedModules.map((module) => ({
        moduleId: module.moduleId,
        domains: module.domains.map((domain) => ({
          domain: domain.domain,
          questions: domain.questions
            .map((question) => {
              const dbQuestion = questionsFromDB.find(
                (q) => q.plainContent === question.content
              );
              return dbQuestion ? { ...dbQuestion } : null;
            })
            .filter(Boolean),
        })),
      }));

      setExamData((prevExamData) => ({
        ...prevExamData,
        examQuestions: final,
      }));

      toast.success("File uploaded successfully!", {
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error fetching questions from database:", error);
      toast.error("Failed to upload file. Please try again!", {
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateExam = async () => {
    try {
      setLoading(true);
      const simplifiedExamQuestions = examData.examQuestions.map((module) => ({
        moduleId: module.moduleId,
        domains: module.domains.map((domain) => ({
          domain: domain.domain,
          questions: domain.questions.map((q) => ({
            id: q.id,
          })),
        })),
      }));

      const payload = {
        ...examData,
        examQuestions: simplifiedExamQuestions,
      };
      console.log(payload);

      await apiClient.post("/exams", payload);
      setIsShowCreateExamModal(false);
      fetchExamList()
      toast.success("Exam created successfully!", {
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error while creating exam:", error);
      toast.error("Failed to create an exam. Please try again!", {
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
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
          domainData={domainData}
          examData={examData}
          setExamData={setExamData}
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
                        value={examData.title}
                        className={cx("title-input")}
                        placeholder="Exam Title"
                        autoFocus
                        onChange={handleInputChange("title")}
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
                        value={examData.description}
                        placeholder="Brief description"
                        onChange={handleInputChange("description")}
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
                          value={examData.examStructureId}
                          className={cx("structure-select")}
                          onChange={(e) => {
                            handleInputChange("examStructureId")(e);
                            handleChangeExamStructure(e);
                          }}
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
                          value={examData.examTypeId}
                          className={cx("type-select")}
                          onChange={handleInputChange("examTypeId")}
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
                  {examStructureSelected?.examStructureType.name ===
                    "Adaptive" && (
                      <div className={cx("show-exam-config-container")}>
                        <div className={cx("exam-config-container")}>
                          <div className={cx("exam-config-icon")}>
                            <i className={cx("fa-light fa-eye")}></i>
                          </div>
                          <div className={cx("exam-config-select")}>
                            <div className={cx("type-config")}>
                              Correct question in Module 1{" "}
                              <span className={cx("required")}>
                                (Reading & Writing)
                              </span>
                            </div>
                            <div className={cx("config-content")}>
                              <div className={cx("name-config")}>
                                <div className={cx("name")}>
                                  {
                                    examStructureSelected?.requiredCorrectInModule1RW
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={cx("exam-config-container")}>
                          <div className={cx("exam-config-select")}>
                            <div className={cx("type-config")}>
                              Correct question in Module 1{" "}
                              <span className={cx("required")}>
                                (Reading & Writing)
                              </span>
                            </div>
                            <div className={cx("config-content")}>
                              <div className={cx("name-config")}>
                                <div className={cx("name")}>
                                  {
                                    examStructureSelected?.requiredCorrectInModule1M
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              </div>
              {/* Download template */}
              <div className={cx("download-template-container")}>
                <div className={cx("download-template-header")}>
                  <div className={cx("download-template-title")}>
                    Download template
                  </div>
                  <div className={cx("download-action")}>
                    <button
                      className={cx("download-btn", {
                        "disabled-btn": structureModuleQuestions?.length <= 0,
                      })}
                      disabled={structureModuleQuestions?.length <= 0}
                      onClick={() =>
                        generateExcelTemplate(
                          structureModuleQuestions,
                          examStructureSelected
                        )
                      }
                    >
                      <i
                        className={cx("fa-light fa-arrow-down-to-bracket")}
                      ></i>
                      <span>Download</span>
                    </button>
                    <label
                      className={cx("action-btn", {
                        "disabled-btn": structureModuleQuestions?.length <= 0,
                      })}
                      style={{
                        pointerEvents:
                          structureModuleQuestions?.length <= 0
                            ? "none"
                            : "auto",
                      }}
                    >
                      <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleFileUpload}
                        style={{ display: "none" }}
                      />
                      <i
                        className={cx(
                          "fa-light fa-arrow-up-from-bracket",
                          "action-icon"
                        )}
                      ></i>
                      <span className={cx("action-text")}>Upload file</span>
                    </label>
                  </div>
                </div>
              </div>
              {/* Module question */}
              {structureModuleQuestions?.map((moduleQuestion) => (
                <ModuleQuestionCreate
                  key={moduleQuestion?.id}
                  examData={examData}
                  moduleQuestion={moduleQuestion}
                  setIsShowModalCreateQuestionModal={
                    setIsShowModalCreateQuestionModal
                  }
                  setDomainData={setDomainData}
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
            <button className={cx("preview-btn")} onClick={handleCreateExam}>
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExamCreateModal;
