import { Pagination } from "antd";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import LearningMaterialItem from "~/components/Manager/CensorLearningMaterial/LearningMaterialItem";
import CensorLearningMaterialView from "~/components/Manager/CensorLearningMaterial/CensorLearningMaterialView";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import PageLayout from "~/layouts/Manager/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./LearningMaterialCensor.module.scss";
const cx = classNames.bind(styles);
const itemsPerPage = 6;
function LearningMaterial() {
  const [learningMaterials, setLearningMaterials] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isShowCensorView, setIsShowCensorView] = useState(false);
  const [censorViewUnitId, setCensorViewUnitId] = useState("");

  useEffect(() => {
    const fetchLearningMaterials = async () => {
      try {
        const response = await apiClient.get(`/units/pending`, {
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
      {isShowCensorView && (
        <CensorLearningMaterialView
          unitId={censorViewUnitId}
          setIsShowCensorView={setIsShowCensorView}
        />
      )}
      <PageLayout>
        <div className={cx("censor-learning-material-wraaper")}>
          <div className={cx("censor-learning-material-container")}>
            <div className={cx("censor-learning-material-header")}>
              Censor Material
            </div>
            <div className={cx("censor-learning-material-content")}>
              {learningMaterials?.map((item) => (
                <LearningMaterialItem
                  key={item.id}
                  item={item}
                  setIsShowCensorView={setIsShowCensorView}
                  setCensorViewUnitId={setCensorViewUnitId}
                />
              ))}
            </div>
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
          </div>
        </div>
        <LearningMaterialCreateFooter />
      </PageLayout>
    </>
  );
}

export default LearningMaterial;
