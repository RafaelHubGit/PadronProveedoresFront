import { TableProps } from "antd";


export interface FieldValidation { //TODO agregar a una generica
    required: boolean;
    type: "string" | "number" | "boolean" | "date"; // Por ejemplo, los tipos de datos esperados
    label?: string;
}
  
export interface ColumnValidation { //TODO agregar a una generica
    [key: string]: FieldValidation;
}
  
export interface EditableTableProps<T> {
    columns: TableProps<T>["columns"];
    dataSource: T[];
    onSave: (data: T[]) => void;
    validationRules: ColumnValidation; //Se pasan las reglas de validacion
    loading?: boolean;
}