import { Pagination } from "antd";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import LearningMaterialItem from "~/components/Manager/CensorLearningMaterial/LearningMaterialItem";
import EditLearningMaterialView from "~/components/Staff/LearningMaterialCreate/EditLearningMaterialView";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import NoQuestionData from "~/components/Staff/QuestionExamCreate/NoQuestionData";
import PageLayout from "~/layouts/Staff/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./LearningMaterialFeedback.module.scss";
const cx = classNames.bind(styles);
const itemsPerPage = 6;

function LearningMaterialFeedback() {
  const [learningMaterials, setLearningMaterials] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showMaterialEdit, setShowMaterialEdit] = useState(false);
  const [unitEdit, setUnitEdit] = useState(null);

  useEffect(() => {
    const fetchLearningMaterials = async () => {
      try {
        const response = await apiClient.get(`/units/reject`, {
          params: {
            page: currentPage,
            pageSize: itemsPerPage,
          },
        });
        setLearningMaterials(response.data.data.data);
        setTotalItems(response.data.data.totalItems);
      } catch (error) {
        console.error("Error fetching learning materials:", error);
      }
    };

    fetchLearningMaterials();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      {showMaterialEdit && <EditLearningMaterialView unitId={unitEdit} setIsShowMaterialView={setShowMaterialEdit} />}
      <PageLayout>
        <div className={cx("learning-material-ass-wrapper")}>
          <div className={cx("learning-material-ass-container")}>
            <div className={cx("learning-material-ass-header")}>
              <div className={cx("learning-material-ass-text")}>
                Material Feedback
              </div>
            </div>
            {learningMaterials?.length > 0 ? (
              <div className={cx("learning-material-ass-content")}>
                {learningMaterials?.map((item) => (
                  <LearningMaterialItem
                    key={item.id}
                    item={item}
                    setIsShowCensorView={setShowMaterialEdit}
                    setCensorViewUnitId={setUnitEdit}
                  />
                ))}
              </div>
            ) : (
              <NoQuestionData />
            )}
            {learningMaterials?.length > 0 && (
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
        <LearningMaterialCreateFooter />
      </PageLayout>
    </>
  );
}

export default LearningMaterialFeedback;
