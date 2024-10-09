import React from "react";
import classNames from "classnames/bind";
import styles from "./CollegeList.module.scss";
import { scoreSAT } from "~/data/News/ScoreSAT/ScoreSAT";

const cx = classNames.bind(styles);

function CollegeList() {
  const displayedColleges = scoreSAT.slice(0, 10);

  return (
    <div className={cx("college-list-container")}>
      <div className={cx("college-list-title")}>Top 10 schools with the highest SAT scores in America</div>
      <table className={cx("college-table")}>
        <thead>
          <tr>
            <th>School Name</th>
            <th>Math</th>
            <th>Reading & Writing</th>
            <th>Combined</th>
          </tr>
        </thead>
        <tbody>
          {displayedColleges.map((college, index) => (
            <tr key={index}>
              <td className={cx("college-table-school-name")}>{college.schoolName}</td>
              <td>{college.math}</td>
              <td>{college.readingAndWriting}</td>
              <td>{college.combined}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CollegeList;
