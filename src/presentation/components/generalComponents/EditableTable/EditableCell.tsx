import dayjs from "dayjs";
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

  // let dateValue = null;

  // // Verifica si children es un arreglo y toma el segundo valor si es el caso
  // if (inputType === "date" && Array.isArray(children)) {
  //   const dateStr = children[1]; // Toma el segundo valor del arreglo
  //   dateValue = dayjs(dateStr).isValid() ? dayjs(dateStr) : null;
  // } else if (inputType === "date") {
  //   // Si children no es un arreglo, asumimos que es un valor directo
  //   dateValue = dayjs(children).isValid() ? dayjs(children) : null;
  // }

  const inputNode =
    inputType === "number" ? (
      <Input type="number" />
    ) : inputType === "date" ? (
      <DatePicker format="DD-MM-YYYY" style={{ width: "100%" }} />
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
        <Form.Item 
          name={dataIndex} 
          style={{ margin: 0 }}
          {...(inputType === "date"  // Esta parte del codigo es necesaria para el manejo de fechas
            ? {
                getValueProps: (value) => ({
                  value: value ? dayjs(value) : null,
                }),
              }
            : {})}
        >
          {/* <Input /> */}
          { inputNode }
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
