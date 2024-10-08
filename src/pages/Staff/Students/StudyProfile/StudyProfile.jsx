import classNames from "classnames/bind";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./StudyProfile.module.scss";
const cx = classNames.bind(styles);
function StudyProfile() {
  return (
    <PageLayout>
      <div className={cx("study-profile-title")}>StudyProfile</div>
    </PageLayout>
  );
}

export default StudyProfile;
