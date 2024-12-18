import { Table } from "antd";
import "./TableViewScore.css";

const TableViewScore = ({ dataSource }) => {
  const columns = [
    { title: "Section", dataIndex: "section", width: 255 },
    { title: "Raw Score", dataIndex: "rawscore", width: 200 },
    {
      title: "Lower Score",
      dataIndex: "lowerscore",
      width: 200,
    },
    {
      title: "Upper Score",
      dataIndex: "upperscore",
      width: 200,
    },
  ];

  return (
    <div className="table-container">
      <Table
        bordered
        dataSource={dataSource.map((item) => ({ ...item, key: item.id }))}
        columns={columns}
        rowClassName="editable-row"
        scroll={{ y: 470 }}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default TableViewScore;
