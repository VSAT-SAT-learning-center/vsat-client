import { Pagination } from "antd";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import LearningItem from "~/components/Student/Learning/LearningItem/LearningItem";
import NoQuestionData from "~/components/Staff/QuestionExamCreate/NoQuestionData";
import LearningLayout from "~/layouts/Student/LearningLayout/LearningPageLayout";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import styles from "./Learning.module.scss";
import apiClient from "~/services/apiService";
const cx = classNames.bind(styles);
const itemsPerPage = 6;

function Learning() {
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
    <LearningLayout>
    <div className={cx("learning-wrapper")}>
      <div className={cx("learning-container")}>
        <div className={cx("learning-wrapper")}>
          <div className={cx("learning-header")}>
            Study profile
          </div>
          <div className={cx("learning-container")}>
            {learningMaterials?.length > 0 ? (
              <div
                className={cx(
                  "learning-content",
                  "learning-item-container"
                )}
              >
                {learningMaterials?.map((item) => (
                  <LearningItem key={item.id} item={item} />
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
      </div>
    </div>
    <LearningMaterialCreateFooter />
    </LearningLayout>
  );
}

export default Learning;
