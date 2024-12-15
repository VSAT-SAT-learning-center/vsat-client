import { Table } from "antd";
import classNames from "classnames/bind";
import styles from "./ExamTableChart.module.scss";

const cx = classNames.bind(styles);

function ExamTableChart({ examData }) {
  const columns = [
    {
      title: "Student",
      dataIndex: "student",
      key: "student",
    },
    {
      title: "Exam",
      dataIndex: "exam",
      key: "exam",
    },
    {
      title: "R&W",
      dataIndex: "readingWritingScore",
      key: "readingWritingScore",
      align: "right",
    },
    {
      title: "Math",
      dataIndex: "mathScore",
      key: "mathScore",
      align: "right",
    },
    {
      title: "Total",
      dataIndex: "totalScore",
      key: "totalScore",
      align: "right",
    },
  ];
  return (
    <div className={cx("exam-table-container")}>
      <div className={cx("table-title")}>Exam Distribution</div>
      <Table
        columns={columns}
        dataSource={examData}
        pagination={{
          pageSize: 6,
        }}
        bordered
      />
    </div>
  );
}

export default ExamTableChart;
