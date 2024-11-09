import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import LearningMaterialCreateHeader from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateHeader";
import MultiStepProgressBar from "~/components/Staff/LearningMaterialCreate/MultiStepProgressBar";
import { steps } from "~/data/Staff/StepProgressBar";
import PageLayout from "~/layouts/Staff/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./LearningMaterialCreateDetails.module.scss";

const cx = classNames.bind(styles);
function LearningMaterialCreateDetails() {
  const fileInputImageRef = useRef();
  const navigate = useNavigate();
  const currentStep = 0;

  const [levels, setLevels] = useState([]);
  const [sections, setSections] = useState([]);
  const [domains, setDomains] = useState([]);
  const [countTitleInput, setCountTitleInput] = useState(0);

  const [unit, setUnit] = useState({
    title: "",
    description: "",
    sectionId: "",
    levelId: "",
    domainId: "",
  });

  const isFormValid = () => {
    return (
      unit.title.trim() !== "" &&
      unit.description.trim() !== "" &&
      unit.sectionId.trim() !== "" &&
      unit.levelId.trim() !== "" &&
      unit.domainId.trim() !== ""
    );
  };

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

  const handleClickUploadImage = () => {
    fileInputImageRef.current.click();
  };

  const handleChangeTitleInput = (e) => {
    setCountTitleInput(e.target.value.length);
    setUnit((prevUnit) => ({
      ...prevUnit,
      title: e.target.value,
    }));
  };

  const handleSectionChange = async (e) => {
    const selectedSectionId = e.target.value;
    setUnit((prevUnit) => ({
      ...prevUnit,
      sectionId: selectedSectionId,
    }));
    if (selectedSectionId) {
      try {
        const response = await apiClient.get(
          `/domains/section/${selectedSectionId}`
        );
        setDomains(response.data);
      } catch (error) {
        console.error("Error fetching domains:", error);
      }
    } else {
      setDomains([]);
    }
  };

  const handleDomainChange = (e) => {
    setUnit((prevUnit) => ({
      ...prevUnit,
      domainId: e.target.value,
    }));
  };

  const handleLevelChange = (e) => {
    setUnit((prevUnit) => ({
      ...prevUnit,
      levelId: e.target.value,
    }));
  };

  const handleChangeAboutUnitInput = (e) => {
    setUnit((prevUnit) => ({
      ...prevUnit,
      description: e.target.value,
    }));
  };

  const handleCancel = () => {
    setUnit({
      title: "",
      description: "",
      sectionId: "",
      levelId: "",
      domainId: "",
    });
    setCountTitleInput(0);
  };

  const handleNext = async () => {
    if (isFormValid()) {
      try {
        const response = await apiClient.post("/units", unit);
        const newUnit = response.data.data;
        setUnit({
          title: "",
          description: "",
          sectionId: "",
          levelId: "",
          domainId: "",
        });
        setCountTitleInput(0);
        navigate(`${steps[currentStep + 1].path}/${newUnit.id}`);
      } catch (error) {
        console.error("Error creating unit:", error);
      }
    }
  };

  return (
    <PageLayout>
      <div className={cx("learning-material-create-details-container")}>
        <LearningMaterialCreateHeader title="Unit Detail" />
        <MultiStepProgressBar steps={steps} currentStep={currentStep} />
        <div className={cx("create-details-container")}>
          <div className={cx("create-details-top")}>
            <div className={cx("create-details-title")}>Unit Details</div>
          </div>
          <div className={cx("create-details-content")}>
            <div className={cx("create-details-thumbnail")}>
              <div className={cx("thumbnail-title")}>
                Thumbnail Image{" "}
                <span className={cx("required")}>(Required)</span>
              </div>
              <div
                className={cx("thumbnail-upload")}
                onClick={handleClickUploadImage}
              >
                <div className={cx("upload-main")}>
                  <i
                    className={cx("fa-sharp fa-light fa-image", "picture-icon")}
                  ></i>
                  <div className={cx("upload-option")}>
                    Drag or <span className={cx("hightlight")}>Browse</span>
                  </div>
                  <div className={cx("upload-required")}>
                    PNG, JPEG (max 5mb size)
                  </div>
                </div>
                <input
                  ref={fileInputImageRef}
                  type="file"
                  accept="image/*"
                  name="img"
                  className={cx("image-input")}
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <div className={cx("create-details-information")}>
              <div className={cx("unit-title-config")}>
                <div className={cx("unit-title-details")}>
                  <div className={cx("unit-title")}>
                    Title <span className={cx("required")}>(Required)</span>
                  </div>
                  <div className={cx("unit-title-input")}>
                    <input
                      type="text"
                      value={unit.title}
                      className={cx("title-input")}
                      placeholder="Name of unit"
                      autoFocus={true}
                      maxLength={100}
                      onChange={handleChangeTitleInput}
                    />
                    <div className={cx("count-input")}>
                      {countTitleInput}/100
                    </div>
                  </div>
                </div>
                <div className={cx("unit-section-details")}>
                  <div className={cx("unit-section")}>
                    Section <span className={cx("required")}>(Required)</span>
                  </div>
                  <select
                    id="unit-section"
                    value={unit.sectionId}
                    className={cx("section-select")}
                    onChange={handleSectionChange}
                  >
                    <option value="">Select section</option>
                    {sections.map((section) => (
                      <option value={section.id} key={section.id}>
                        {section.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={cx("unit-config-details")}>
                <div className={cx("unit-section-details")}>
                  <div className={cx("unit-section")}>
                    Domain <span className={cx("required")}>(Required)</span>
                  </div>
                  <select
                    id="unit-section"
                    value={unit.domainId}
                    className={cx("section-select")}
                    onChange={handleDomainChange}
                    disabled={domains?.length === 0}
                  >
                    <option value="">Select domain</option>
                    {domains.map((domain) => (
                      <option value={domain.id} key={domain.id}>
                        {domain.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={cx("unit-level-details")}>
                  <div className={cx("unit-level")}>
                    Unit Level{" "}
                    <span className={cx("required")}>(Required)</span>
                  </div>
                  <select
                    id="unit-level"
                    value={unit.levelId}
                    className={cx("level-select")}
                    onChange={handleLevelChange}
                  >
                    <option value="">Select level</option>
                    {levels.map((level) => (
                      <option value={level.id} key={level.id}>
                        {level.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={cx("unit-about-details")}>
                <div className={cx("unit-about")}>
                  About Unit <span className={cx("required")}>(Required)</span>
                </div>
                <div className={cx("unit-about-input")}>
                  <textarea
                    value={unit.description}
                    className={cx("about-input")}
                    placeholder="About information of unit"
                    onChange={handleChangeAboutUnitInput}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("create-details-bottom")}>
            <button className={cx("cancel-btn")} onClick={handleCancel}>
              Cancel
            </button>
            <button
              className={cx("continue-btn", {
                "disabled-btn": !isFormValid(),
              })}
              disabled={!isFormValid()}
              onClick={handleNext}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>
  );
}

export default LearningMaterialCreateDetails;
