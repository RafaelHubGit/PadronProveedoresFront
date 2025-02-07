import { DatePicker, Input, Form } from "antd";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  editable?: boolean;
  dataIndex: string;
  children: React.ReactNode;
  inputType?: "text" | "number" | "date";
}

export const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  editable = true, 
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

  // Si no está en modo de edición o no es editable, mostramos solo el valor
  if (!editing || !editable) {
    return <td {...restProps}>{children}</td>;
  }

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
