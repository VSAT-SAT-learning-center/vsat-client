import { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./CourseOverview.module.scss";

const cx = classNames.bind(styles);

function CourseOverview() {
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalApprove, setTotalApprove] = useState(0);
  const [totalReject, setTotalReject] = useState(0);
  const [totalPending, setTotalPending] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fire all requests simultaneously
        const [coursesResponse, approveResponse, pendingResponse, rejectResponse] = await Promise.all([
          axios.get("http://localhost:5000/units?page=1&pageSize=10"),
          axios.get("http://localhost:5000/units/approve?page=1&pageSize=1"),
          axios.get("http://localhost:5000/units/pending?page=1&pageSize=1"),
          axios.get("http://localhost:5000/units/reject?page=1&pageSize=1"),
        ]);

        // Extract and set state for each result
        setTotalCourses(coursesResponse.data.paging.totalItems);
        setTotalApprove(approveResponse.data.data.totalItems);
        setTotalPending(pendingResponse.data.data.totalItems);
        setTotalReject(rejectResponse.data.data.totalItems);

        console.log("Data fetched successfully");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={cx("cards-container")}>
      <div className={cx("overview-card", "card-green")}>
        <div className={cx("card-content")}>
          <h3>{totalCourses}</h3>
          <p>Total Unit</p>
        </div>
      </div>
      <div className={cx("overview-card", "card-purple")}>
        <div className={cx("card-content")}>
          <h3>{totalApprove}</h3>
          <p>Total Approve</p>
          <a href="#">See Details</a>
        </div>
      </div>
      <div className={cx("overview-card", "card-orange")}>
        <div className={cx("card-content")}>
          <h3>{totalPending}</h3>
          <p>Total Unit Pending</p>
          <a href="#">See Details</a>
        </div>
      </div>
      <div className={cx("overview-card", "card-blue")}>
        <div className={cx("card-content")}>
          <h3>{totalReject}</h3>
          <p>Total Unit Reject</p>
          <a href="#">See Details</a>
        </div>
      </div>
    </div>
  );
}

export default CourseOverview;
