import React, { useEffect, useState } from "react";
import "./styles.css";
import { Table, Popconfirm, Form, Button, Input, ConfigProvider, Tooltip } from "antd";
import esES from "antd/es/locale/es_ES";
import { EditableCell } from "./EditableCell";
import { EditableTableProps } from "../../../../interfaces/EditableTable.interface";
import { removeAccents } from "../../../../helpers";
import dayjs from "dayjs";


export const EditableTable = <T extends { key: React.Key; activo?: boolean }>({
  columns,
  dataSource,
  onSave,
  validationRules,
  loading
}: EditableTableProps<T>) => {
  const [form] = Form.useForm();
  const [data, setData] = useState<T[]>(dataSource ?? []);
  const [editingKey, setEditingKey] = useState<React.Key | "">("");
  const [isNewRow, setIsNewRow] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false)
  const [loadingLocal, setLoadingLocal] = useState(loading)
  const [filteredData, setFilteredData] = useState(data);
  const isEditing = (record: T) => record.key === editingKey;  
  // const [debouncedSearch, setDebouncedSearch] = useState("");

  // const filteredData = data.filter(item => 
  //   Object.values(item).some(value =>
  //     removeAccents(String(value).toLowerCase()).includes(removeAccents(debouncedSearch.toLowerCase()))
  //   )
  // );


  useEffect(() => {
    setData(dataSource ?? []);
  }, [dataSource])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoadingSearch(true);
      setFilteredData(data.filter(item => 
        Object.values(item).some(value =>
          removeAccents(String(value).toLowerCase()).includes(removeAccents(searchText.toLowerCase()))
        )
      ))
      setLoadingSearch(false);
    }, 500);
  
    return () => clearTimeout(timeoutId);
  }, [searchText, data]);

  useEffect(() => {
    setLoadingLocal( loading );
  }, [loading])

  


  const edit = (record: T) => {
    form.setFieldsValue(record);
    setEditingKey(record.key);
  };

  // const cancel = () => setEditingKey("");
  const cancel = () => {
   

    if (isNewRow) {
      setData(prevData => prevData.filter(item => item.key !== editingKey)); // Elimina la fila recién agregada
    }

    // Restablece el estado de edición
    setEditingKey("");
    setIsNewRow(false);
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
          if (validationRules[field].type === "date" && formValues[field]) {
            formValues[field] = dayjs(formValues[field]).format("DD-MM-YYYY");
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

    const newKey = Date.now(); // Genera una clave única antes de usarla

    const newData = Object.keys(validationRules).reduce((acc, key) => {
      const fieldValidation = validationRules[key];
  
      // Asignar valores predeterminados según el tipo
      if (fieldValidation.type === "number") {
        acc[key as keyof T] = 0; // Inicializar como 0 en vez de ""
      } else if (fieldValidation.type === "boolean") {
        acc[key as keyof T] = true; // Booleano por defecto en false
      } else if (fieldValidation.type === "date") {
        acc[key as keyof T] = new Date();
      } else {
        acc[key as keyof T] = ""; // Para strings, mantenemos ""
      }
  
      return acc;
    }, {} as T);
  
    newData.key = newKey; // Asigna el key antes de actualizar el estado
  
    // setData([newData, ...data]); // Agrega la nueva fila al inicio de la tabla
    setData((prevData) => [{ ...newData }, ...prevData]);
    setEditingKey(newKey); // Establece esta fila como la fila editable
    setIsNewRow(true);
  };
  


  const mergedColumns = columns?.map((col) => ({
    ...col,
    width: col.width || undefined,
    sorter: col.sortable ? ((a, b) => String(a[col.dataIndex]).localeCompare(String(b[col.dataIndex]))) : undefined,
    onCell: (record: T): React.TdHTMLAttributes<HTMLElement> => ({
      record,
      dataIndex: col.dataIndex,
      inputType: col.inputType,
      editing: isEditing(record),
      editable: col.editable !== false,
    }),
  })) as ColumnType<T>[]
  

  // Validación personalizada
  const validateData = (dataValues: T) => {
  
    const errors: string[] = [];
  
    for (const key in validationRules) {

      
      const fieldValidation = validationRules[key];

      if ( !fieldValidation.required ) continue;

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

  const handleReactive = (key: React.Key) => {
    const updatedData = data.map((item) =>
      item.key === key ? { ...item, activo: !item.activo } : item
    );
    onSave(updatedData);
  };

  
  

  return (
    <div>
      <div className="d-flex justify-content-between">
        <Button
          onClick={handleAdd}
          type="primary"
          style={{ marginBottom: 16 }}
          disabled = { editingKey ? true : false }
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

      <ConfigProvider locale={esES}>
        <Form form={form} component={false}>
          <Table
            components={{ body: { cell: EditableCell } }}
            bordered
            loading = { loadingLocal || loadingSearch }
            dataSource={filteredData}
            columns={[
              ...(mergedColumns || []),
              {
                title: "Acciones",
                key: "actions",
                align: "center",
                width: "150px",
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
                      <Tooltip title="Editar elemento">
                        <Button
                          disabled={editingKey !== ""}
                          onClick={() => edit(record)}
                          type="link"
                        >
                          <span className="material-symbols-outlined">
                            edit_square
                          </span>
                        </Button>
                      </Tooltip>
                      {record["activo"] ? (
                        <Popconfirm
                          title="¿Seguro que quieres eliminar esta fila?"
                          onConfirm={() => handleDelete(record.key)}
                        >
                          <Tooltip title="Eliminar elemento">
                            <Button type="link" danger>
                              <span className="material-symbols-outlined">
                                delete
                              </span>
                            </Button>
                          </Tooltip>
                        </Popconfirm>
                      ) : (
                        <Popconfirm
                          title="¿Seguro que quieres restaurar este elemento?"
                          onConfirm={() => handleReactive(record.key)}
                        >
                          <Tooltip title="Reactivar elemento">
                            <Button type="link">
                              <span className="material-symbols-outlined">
                                refresh
                              </span>
                            </Button>
                          </Tooltip>
                        </Popconfirm>
                      )}
                    </>
                  );
                },
              },
            ]}
            // rowClassName="editable-row"
            rowClassName={(record) => (isEditing(record) ? "editable-row editing" : "editable-row")}
            pagination={{ 
              pageSize: 20,
              showTotal: (total, range) => `Mostrando ${range[0]}-${range[1]} de ${total}`,
            }}
            scroll={{ y: "40vh" }}
          />
        </Form>
      </ConfigProvider>
    </div>

  );
};
