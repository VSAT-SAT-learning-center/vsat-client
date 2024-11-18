import classNames from "classnames/bind";
import { useState } from "react";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import StudyProfileItem from "~/components/Teacher/ManageMaterial/StudyProfileItem";
import ViewStudyProfile from "~/components/Teacher/ManageMaterial/ViewStudyProfile";
import PageLayout from "~/layouts/Teacher/PageLayout";
import styles from "./ManageMaterial.module.scss";
const cx = classNames.bind(styles);
function ManageMaterial() {
  const [isShowViewStudyProfile, setIsShowViewStudyProfile] = useState(false);
  return (
    <>
      {isShowViewStudyProfile && (
        <ViewStudyProfile
          setIsShowViewStudyProfile={setIsShowViewStudyProfile}
        />
      )}
      <PageLayout>
        <div className={cx("teacher-manage-material-wrapper")}>
          <div className={cx("teacher-manage-material-container")}>
            <div className={cx("teacher-manage-material-header")}>
              <div className={cx("teacher-manage-material-text")}>
                Manage Material
              </div>
            </div>
            <div className={cx("teacher-manage-material-content")}>
              <div className={cx("study-profiles-list")}>
                <StudyProfileItem
                  setIsShowViewStudyProfile={setIsShowViewStudyProfile}
                />
              </div>
            </div>
          </div>
        </div>
        <LearningMaterialCreateFooter />
      </PageLayout>
    </>
  );
}

export default ManageMaterial;
