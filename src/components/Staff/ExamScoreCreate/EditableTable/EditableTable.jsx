import { CloseOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Form, Input, Table } from "antd";
import { useState } from "react";
import "./EditableTable.css";

const EditableTable = ({ dataSource, setDataSource }) => {
  const [editingId, setEditingId] = useState("");
  const [form] = Form.useForm();

  const isEditing = (record) => record.id === editingId;

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

  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingId(record.id);
  };

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
          lowerscore: parseFloat(row.lowerscore),
          upperscore: parseFloat(row.upperscore),
        };

        newData.splice(index, 1, updatedRow);
        setDataSource(newData);
        setEditingId("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => setEditingId("");

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

  const mergedColumns = columns.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === "lowerScore" || col.dataIndex === "upperScore"
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

export default EditableTable;