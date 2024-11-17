import classNames from "classnames/bind";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./StudyProfile.module.scss";
const cx = classNames.bind(styles);
function StudyProfile() {
  return (
    <PageLayout>
      <div className={cx("manage-study-profile-wrapper")}>
        <div className={cx("manage-study-profile-container")}>
          <div className={cx("manage-study-profile-header")}>
            <div className={cx("manage-study-profile-text")}>
              Assign Study Profiles
            </div>
          </div>
          <div className={cx("manage-study-profile-content")}></div>
        </div>
      </div>
      <LearningMaterialCreateFooter />
    </PageLayout>
  );
}

export default StudyProfile;
