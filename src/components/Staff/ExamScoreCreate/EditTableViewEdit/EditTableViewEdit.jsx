import { CloseOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Form, Input, Table } from "antd";
import { useState } from "react";
import "./EditTableViewEdit.css";

const EditTableViewEdit = ({
  dataSource,
  setDataSource,
  handleUpdateRow,
  setUpdatedRows,
}) => {
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
      const updatedRow = {
        ...dataSource.find((item) => item.id === id),
        ...row,
        lowerscore: parseFloat(row.lowerscore),
        upperscore: parseFloat(row.upperscore),
      };

      const newData = dataSource.map((item) =>
        item.id === id ? updatedRow : item
      );
      setDataSource(newData); // Directly update the current view

      handleUpdateRow(updatedRow); // Update in main view component immediately
      setEditingId("");

      setUpdatedRows((prevRows) => {
        const existingIndex = prevRows.findIndex((item) => item.id === id);
        if (existingIndex > -1) {
          prevRows.splice(existingIndex, 1, updatedRow); // Replace existing edited row
          return [...prevRows];
        } else {
          return [...prevRows, updatedRow];
        }
      });
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  // Cancel editing mode
  const cancel = () => setEditingId("");

  // Table columns configuration
  const columns = [
    { title: "Section", dataIndex: "section", width: 255 },
    { title: "Raw Score", dataIndex: "rawscore" },
    {
      title: "Lower Score",
      dataIndex: "lowerscore",
      editable: true,
      width: 200,
    },
    {
      title: "Upper Score",
      dataIndex: "upperscore",
      editable: true,
      width: 200,
    },
    {
      title: "Action",
      dataIndex: "action",
      width: 175,
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
          col.dataIndex === "lowerscore" || col.dataIndex === "upperscore"
            ? "number"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div className="table-container">
      <Form form={form} component={false}>
        <Table
          components={{
            body: { cell: EditableCell },
          }}
          bordered
          dataSource={dataSource.map((item) => ({ ...item, key: item.id }))}
          columns={mergedColumns}
          rowClassName="editable-row"
          scroll={{ y: 400 }}
          pagination={{ pageSize: 10 }}
        />
      </Form>
    </div>
  );
};

export default EditTableViewEdit;
