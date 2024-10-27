import { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./RecentCourses.module.scss";

const cx = classNames.bind(styles);

function RecentCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourseData() {
      try {
        const response = await axios.get(
          "http://localhost:5000/units/approve?page=1&pageSize=10"
        );
        const courseData = response.data.data.data; // Lấy toàn bộ mảng dữ liệu
        setCourses(courseData); // Lưu vào state
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    }

    fetchCourseData();
  }, []);

  return (
    <div className={cx("recent-courses-section")}>
      <h2>Recent Enrolled Courses</h2>
      <div className={cx("courses-container")}>
        {courses.map((course) => (
          <div className={cx("course-card")} key={course.id}>
            <div className={cx("course-info")}>
              <h3>{course.title}</h3>
              <p>{course.description}</p> 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentCourses;
