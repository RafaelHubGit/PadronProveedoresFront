import React, { useEffect, useState } from "react";
import { Table, Popconfirm, Form, Button, Input } from "antd";
import { EditableCell } from "./EditableCell";
import { EditableTableProps } from "../../../../interfaces/EditableTable.interface";
import { removeAccents } from "../../../../helpers";
import dayjs from "dayjs";


export const EditableTable = <T extends { key: React.Key }>({
  columns,
  dataSource,
  onSave,
  validationRules,
}: EditableTableProps<T>) => {
  const [form] = Form.useForm();
  const [data, setData] = useState<T[]>(dataSource ?? []);
  const [editingKey, setEditingKey] = useState<React.Key | "">("");
  const [searchText, setSearchText] = useState("");


  useEffect(() => {
    console.log("DATA SOURCE : ", dataSource);
    setData(dataSource ?? []);
  }, [dataSource])
  


  const isEditing = (record: T) => record.key === editingKey;

  const edit = (record: T) => {
    form.setFieldsValue(record);
    setEditingKey(record.key);
  };

  // const cancel = () => setEditingKey("");
  const cancel = () => {
    // Si la fila no tiene datos (es vacía), la eliminamos
    const newData = data.filter(item => item.key !== editingKey);
    setData(newData); // Actualizamos el estado para reflejar la eliminación
    setEditingKey(""); // Reseteamos la fila en edición
  };
  

  const save = async (key: React.Key) => {
    try {

      const formValues = form.getFieldsValue(); // Obtén los valores reales del formulario
      const errors = validateData(formValues); // Valida esos valores

      if (errors.length > 0) {
        alert(errors.join(", "));
      } else {

         // Convertir fechas a formato string
        Object.keys(validationRules).forEach((field) => {
          if (validationRules[field].type === "date" && row[field]) {
            row[field] = dayjs(row[field]).format("YYYY-MM-DD");
          }
        });

        const newData = data.map((item) =>
          item.key === key ? { ...item, ...formValues } : item
        );
        setData(newData);
        setEditingKey("");
        onSave(newData);
      }
    } catch (err) {
      console.log("Error al guardar:", err);
    }
  };

  const handleAdd = () => {
    form.resetFields(); // Limpia los dalos del formulario

    const newData = Object.keys(validationRules).reduce((acc, key) => {
      const fieldValidation = validationRules[key];
  
      // Asignar valores predeterminados según el tipo
      if (fieldValidation.type === "number") {
        acc[key as keyof T] = 0; // Inicializar como 0 en vez de ""
      } else if (fieldValidation.type === "boolean") {
        acc[key as keyof T] = false; // Booleano por defecto en false
      } else {
        acc[key as keyof T] = ""; // Para strings, mantenemos ""
      }
  
      return acc;
    }, {} as T);
  
    newData.key = Date.now(); // Asigna un key único
  
    setData([newData, ...data]); // Agrega la nueva fila al inicio de la tabla
    setEditingKey(newData.key); // Establece esta fila como la fila editable
  };
  


  const mergedColumns = columns?.map((col) => ({
    ...col,
    onCell: (record: T): React.TdHTMLAttributes<HTMLElement> => ({
      record,
      dataIndex: col.dataIndex,
      editing: isEditing(record),
      editable: col.editable !== false,
    }),
  })) as ColumnType<T>[]
  

  // Validación personalizada
  const validateData = (dataValues: T) => {
  
    const errors: string[] = [];
  
    for (const key in validationRules) {
      const fieldValidation = validationRules[key];
      const value = dataValues[key as keyof T]; // Obtiene el valor de los campos del formulario

      const fieldName = fieldValidation.label || key;
  
      // Validación de campos obligatorios
      if (fieldValidation.required && !value) {
        errors.push(`${fieldName} es obligatorio.`);
      }
  
      // Validación de tipo numérico
      if (fieldValidation.type === "number" && isNaN(Number(value))) {
        errors.push(`${fieldName} debe ser un número.`);
      }
      
      //Valida fecha
      if (fieldValidation.type === "date") {
        if (
          !value || 
          (typeof value !== "string" && typeof value !== "number" && !(value instanceof Date)) ||
          isNaN(new Date(value as string | number).getTime())
        ) {
          errors.push(`${fieldName} debe ser una fecha válida.`);
        }
      }
    }
  
    return errors;
  };

  const handleDelete = (key: React.Key) => {
    const newData = data.filter(item => item.key !== key);
    setData(newData);
    onSave(newData);
  };

  const filteredData = data.filter(item => 
    Object.values(item).some(value =>
      removeAccents(String(value).toLowerCase()).includes(removeAccents(searchText.toLowerCase()))
    )
  );
  

  return (
    <div>
      <div className="d-flex justify-content-between">
        <Button
          onClick={handleAdd}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          Nuevo
        </Button>

        <Input
          placeholder="Buscar..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: 16, width: "300px" }}
        />
      </div>

      <Form form={form} component={false}>
        <Table
          components={{ body: { cell: EditableCell } }}
          bordered
          dataSource={filteredData}
          columns={[
            ...(mergedColumns || []),
            {
              title: "Acciones",
              key: "actions",
              align: "center",
              width: 150,
              render: (_: any, record: T) => {
                const editable = isEditing(record);
                return editable ? (
                  <>
                    <Button onClick={() => {
                        
                          save(record.key)
                        
                      }} type="link">
                      Guardar
                    </Button>
                    <Popconfirm title="¿Cancelar cambios?" onConfirm={cancel}>
                      <Button type="link">Cancelar</Button>
                    </Popconfirm>
                  </>
                ) : (
                  <>
                    <Button
                      disabled={editingKey !== ""}
                      onClick={() => edit(record)}
                      type="link"
                    >
                      <span className="material-symbols-outlined">
                        edit_square
                      </span>
                    </Button>
                    <Popconfirm
                      title="¿Seguro que quieres eliminar esta fila?"
                      onConfirm={() => handleDelete(record.key)}
                    >
                      <Button type="link" danger>
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </Button>
                    </Popconfirm>
                  </>
                );
              },
            },
          ]}
          rowClassName="editable-row"
          pagination={{ 
            pageSize: 5,
            showTotal: (total, range) => `Mostrando ${range[0]}-${range[1]} de ${total}`,
          }}
        />
      </Form>
    </div>

  );
};
