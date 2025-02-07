import { DatePicker, Input, Form } from "antd";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  children: React.ReactNode;
  inputType?: "text" | "number" | "date";
}

export const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  children,
  inputType,
  ...restProps
}) => {

  const inputNode =
    inputType === "number" ? (
      <Input type="number" />
    ) : inputType === "date" ? (
      <DatePicker format="YYYY-MM-DD" />
    ) : (
      <Input />
    );

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item name={dataIndex} style={{ margin: 0 }}>
          {/* <Input /> */}
          { inputNode }
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
