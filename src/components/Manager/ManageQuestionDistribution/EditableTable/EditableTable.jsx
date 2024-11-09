import { CloseOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Form, Input, Table } from "antd";
import { useState } from "react";
import "./EditableTable.css";

const EditableTable = ({ dataSource, setDataSource }) => {
  const [editingId, setEditingId] = useState("");
  const [form] = Form.useForm();

  // Check if the row is in editing mode
  const isEditing = (record) => record.id === editingId;

  // Editable cell component to handle cell editing
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    children,
    ...restProps
  }) => {
    const inputNode =
      inputType === "number" ? <Input type="number" /> : <Input />;
    return (
      <td {...restProps} className={editing ? "editable-input" : ""}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[{ required: true, message: `Please Input ${title}!` }]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  // Enable edit mode for a row
  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingId(record.id);
  };

  // Save the edited row and update the data sources
  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...dataSource];
      const index = newData.findIndex((item) => id === item.id);

      if (index > -1) {
        const item = newData[index];
        const updatedRow = {
          ...item,
          ...row,
          percentage: parseFloat(row.percentage),
          minQuestion: parseInt(row.minQuestion, 10),
          maxQuestion: parseInt(row.maxQuestion, 10),
        };
        console.log("Updated Row:", updatedRow);
        
        newData.splice(index, 1, updatedRow);  // Cập nhật hàng đã chỉnh sửa
        setDataSource(newData);                // Cập nhật lại dữ liệu
        setEditingId("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  // Cancel editing mode
  const cancel = () => setEditingId("");

  // Table columns configuration
  const columns = [
    { title: "Section", dataIndex: "section", width: 200 },
    { title: "Domain", dataIndex: "domain", width: 300 },
    {
      title: "Percentage",
      dataIndex: "percentage",
      editable: true,
      width: 150,
    },
    {
      title: "Min Question",
      dataIndex: "minQuestion",
      editable: true,
      width: 150,
    },
    {
      title: "Max Question",
      dataIndex: "maxQuestion",
      editable: true,
      width: 150,
    },
    {
      title: "Action",
      dataIndex: "action",
      width: 150,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              onClick={() => save(record.id)}
              type="primary"
              shape="circle"
              icon={<SaveOutlined />}
              style={{ marginRight: 8 }}
            />
            <Button
              onClick={cancel}
              type="default"
              shape="circle"
              icon={<CloseOutlined />}
            />
          </span>
        ) : (
          <Button
            disabled={editingId !== ""}
            onClick={() => edit(record)}
            type="default"
            shape="circle"
            icon={<EditOutlined />}
          />
        );
      },
    },
  ];

  // Merge columns to apply editable cell configurations
  const mergedColumns = columns.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === "percentage" || col.dataIndex === "minQuestion" || col.dataIndex === "maxQuestion"
            ? "number"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div className="table-container-distribution">
      <Form form={form} component={false}>
        <Table
          components={{
            body: { cell: EditableCell },
          }}
          bordered
          dataSource={dataSource.map((item) => ({ ...item, key: item.id }))}
          columns={mergedColumns}
          rowClassName="editable-row"
          scroll={{ y: 500 }}
        />
      </Form>
    </div>
  );
};

export default EditableTable;
