import { Pagination } from "antd";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import LearningMaterialItem from "~/components/Manager/LearningMaterialItem";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import PageLayout from "~/layouts/Manager/PageLayout";
import apiClient from "~/services/apiService";
import styles from "./ManagerLearningMaterial.module.scss";
const cx = classNames.bind(styles);
const itemsPerPage = 6;
function ManagerLearningMaterial() {
  const [learningMaterials, setLearningMaterials] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

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
    <PageLayout>
      <div className={cx("manager-learning-material-wrapper")}>
        <div className={cx("manager-learning-material-container")}>
          <div className={cx("manager-learning-material-header")}>Overview Material</div>
          <div className={cx("manager-learning-material-content")}>
            {learningMaterials?.map((item) => (
              <LearningMaterialItem key={item.id} item={item} />
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
  );
}

export default ManagerLearningMaterial;
