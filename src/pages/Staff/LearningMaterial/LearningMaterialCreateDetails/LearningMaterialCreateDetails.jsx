import classNames from "classnames/bind";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import LearningMaterialCreateHeader from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateHeader";
import MultiStepProgressBar from "~/components/Staff/LearningMaterialCreate/MultiStepProgressBar";
import { steps } from "~/data/Staff/StepProgressBar";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./LearningMaterialCreateDetails.module.scss";
const cx = classNames.bind(styles);
function LearningMaterialCreateDetails() {
  const fileInputImageRef = useRef();
  const navigate = useNavigate();
  const currentStep = 0;

  const [countTitleInput, setCountTitleInput] = useState(0);

  const handleClickUploadImage = () => {
    fileInputImageRef.current.click();
  };

  const handleChangeTitleInput = (e) => {
    setCountTitleInput(e.target.value.length);
  };

  const handleNext = () => {
    navigate(steps[currentStep + 1].path);
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
              <div className={cx("unit-title-details")}>
                <div className={cx("unit-title")}>
                  Unit Title <span className={cx("required")}>(Required)</span>
                </div>
                <div className={cx("unit-title-input")}>
                  <input
                    type="text"
                    className={cx("title-input")}
                    placeholder="Name of unit"
                    autoFocus={true}
                    maxLength={100}
                    onChange={handleChangeTitleInput}
                  />
                  <div className={cx("count-input")}>{countTitleInput}/100</div>
                </div>
              </div>
              <div className={cx("unit-config-details")}>
                <div className={cx("unit-section-details")}>
                  <div className={cx("unit-section")}>
                    Unit Section{" "}
                    <span className={cx("required")}>(Required)</span>
                  </div>
                  <select id="unit-section" className={cx("section-select")}>
                    <option value="option1">Unit section</option>
                    <option value="option2">Reading & Writing</option>
                    <option value="option3">Math</option>
                  </select>
                </div>
                <div className={cx("unit-level-details")}>
                  <div className={cx("unit-level")}>
                    Unit Level{" "}
                    <span className={cx("required")}>(Required)</span>
                  </div>
                  <select id="unit-level" className={cx("level-select")}>
                    <option value="option1">Unit level</option>
                    <option value="option2">Foundation</option>
                    <option value="option3">Medium</option>
                    <option value="option4">Advance</option>
                  </select>
                </div>
              </div>
              <div className={cx("unit-about-details")}>
                <div className={cx("unit-about")}>
                  About Unit <span className={cx("required")}>(Required)</span>
                </div>
                <div className={cx("unit-about-input")}>
                  <textarea
                    className={cx("about-input")}
                    placeholder="About information of unit"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("create-details-bottom")}>
            <button className={cx("cancel-btn")}>Cancel</button>
            {/* <button
              className={cx("continue-btn", "disabled-btn")}
              disabled={true}
              onClick={handleNext}
            >
              Continue
            </button> */}
            <button className={cx("continue-btn")} onClick={handleNext}>
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
