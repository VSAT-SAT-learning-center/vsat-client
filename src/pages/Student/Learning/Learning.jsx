import { Pagination } from "antd";
import classNames from "classnames/bind";
import HeaderAuthen from "~/layouts/Landing/HeaderAuthen";
import { useEffect, useState } from "react";
import LearningItem from "~/components/Student/Learning/LearningItem/LearningItem.jsx";
import LearningSidebar from "~/components/Student/Learning";
import NoQuestionData from "~/components/Staff/QuestionExamCreate/NoQuestionData";
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
    <div className={cx("learning-wrapper")}>
      <HeaderAuthen />
      <div className={cx("learning-container")}>
        <LearningSidebar />
        <div className={cx("manager-learning-material-wrapper")}>
          <div className={cx("manager-learning-material-header")}>
            Study profile
          </div>
          <div className={cx("manager-learning-material-container")}>
            {learningMaterials?.length > 0 ? (
              <div
                className={cx(
                  "manager-learning-material-content",
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
  );
}

export default Learning;
