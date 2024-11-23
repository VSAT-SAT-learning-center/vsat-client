import classNames from "classnames/bind";
import { useState } from "react";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import TeacherDetailsModal from "~/components/Staff/Teacher/TeacherDetailsModal";
import TeacherTable from "~/components/Staff/Teacher/TeacherTable";
import PageLayout from "~/layouts/Staff/PageLayout";
import styles from "./Teachers.module.scss";
const cx = classNames.bind(styles);
function Teachers() {
  const [showPopup, setShowPopup] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  return (
    <>
      {showPopup && <TeacherDetailsModal teacher={selectedTeacher} setShowPopup={setShowPopup} />}
      <PageLayout>
        <div className={cx("manage-teachers-wrapper")}>
          <div className={cx("manage-teachers-container")}>
            <div className={cx("manage-teachers-header")}>
              <div className={cx("manage-teachers-text")}>Teachers</div>
            </div>
            <div className={cx("manage-teachers-content")}>
              <TeacherTable setSelectedTeacher={setSelectedTeacher} setShowPopup={setShowPopup} />
            </div>
          </div>
        </div>
        <LearningMaterialCreateFooter />
      </PageLayout>
    </>
  );
}

export default Teachers;
