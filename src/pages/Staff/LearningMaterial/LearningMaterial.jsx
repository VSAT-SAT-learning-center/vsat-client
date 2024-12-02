import { Pagination } from "antd";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import LearningMaterialItem from "~/components/Manager/CensorLearningMaterial/LearningMaterialItem";
import LearningMaterialView from "~/components/Manager/CensorLearningMaterial/LearningMaterialView";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import NoQuestionData from "~/components/Staff/QuestionExamCreate/NoQuestionData";
import PageLayout from "~/layouts/Staff/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./LearningMaterial.module.scss";

const cx = classNames.bind(styles);
const itemsPerPage = 6;

function LearningMaterial() {
  const [learningMaterials, setLearningMaterials] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isShowMaterialView, setIsShowMaterialView] = useState(false);
  const [materialViewUnitId, setMaterialViewUnitId] = useState("");
  useEffect(() => {
    const fetchLearningMaterials = async () => {
      try {
        const response = await apiClient.get(`/units/approve`, {
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
      {isShowMaterialView && (
        <LearningMaterialView
          unitId={materialViewUnitId}
          setIsShowMaterialView={setIsShowMaterialView}
        />
      )}
      <PageLayout>
        <div className={cx("staff-learning-material-wrapper")}>
          <div className={cx("staff-learning-material-container")}>
            <div className={cx("staff-learning-material-header")}>
              <div className={cx("staff-learning-material-text")}>
                Material Overview
              </div>
            </div>
            {learningMaterials?.length > 0 ? (
              <div className={cx("staff-learning-material-content")}>
                {learningMaterials?.map((item) => (
                  <LearningMaterialItem key={item.id} item={item} setIsShowCensorView={setIsShowMaterialView}
                    setCensorViewUnitId={setMaterialViewUnitId} />
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

export default LearningMaterial;
