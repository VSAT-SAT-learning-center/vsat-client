import { Table } from "antd";
import "./TableViewDistribution.css";

const TableViewDistribution = ({ dataSource }) => {
  const columns = [
    { title: "Section", dataIndex: "section", width: 200 },
    { title: "Domain", dataIndex: "domain", width: 200 },
    {
      title: "Percentage",
      dataIndex: "percentage",
      width: 150,
      render: (percentage) => `${percentage}%`,
    },
    { title: "Min Question", dataIndex: "minQuestion", width: 150 },
    { title: "Max Question", dataIndex: "maxQuestion", width: 150 },
  ];

  const transformedDataSource = (
    dataSource?.domainDistributionConfig || []
  ).map((item) => ({
    key: item.domain,
    section: item.section?.name || "N/A",
    domain: item.domain,
    percentage: item.percentage,
    minQuestion: item.minQuestion,
    maxQuestion: item.maxQuestion,
  }));

  return (
    <div className="table-container">
      <Table
        bordered
        dataSource={transformedDataSource}
        columns={columns}
        rowClassName="editable-row"
        pagination={
          transformedDataSource.length > 10 ? { pageSize: 10 } : false
        }
      />
    </div>
  );
};

export default TableViewDistribution;
