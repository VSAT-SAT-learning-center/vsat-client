import { Pagination } from "antd";
import classNames from "classnames/bind";
import { useState } from "react";
import LearningMaterialItem from "~/components/Manager/LearningMaterialItem";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import PageLayout from "~/layouts/Manager/PageLayout";
import styles from "./ManagerLearningMaterial.module.scss";
const cx = classNames.bind(styles);
const itemsPerPage = 6;
function ManagerLearningMaterial() {
  // Larger dataset for pagination
  const learningMaterials = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    content: `Learning Material ${index + 1}`
  }));

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = learningMaterials.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <PageLayout>
      <div className={cx("manager-learning-material-wraaper")}>
        <div className={cx("manager-learning-material-container")}>
          <div className={cx("manager-learning-material-header")}>Overview</div>
          <div className={cx("manager-learning-material-content")}>
            {currentItems.map((item) => (
              <LearningMaterialItem key={item.id} />
            ))}
          </div>
          <div className={cx("pagination-controls")}>
            <Pagination
              align="center"
              current={currentPage}
              pageSize={itemsPerPage}
              total={learningMaterials.length}
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
