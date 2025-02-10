
/**
 * Configuración de una columna en la tabla.
 * Contiene información sobre cómo se debe mostrar y manejar cada columna.
 */
export interface IColumnConfig {
    /**
     * Título de la columna que se mostrará en el encabezado de la tabla.
     * Es el texto visible para los usuarios.
     */
    title: string;

    /**
     * El campo de los datos que se mostrará en esta columna.
     * Es el identificador de la propiedad en los objetos de los datos que alimentan la tabla.
     */
    dataIndex: string;

    /**
     * Clave única para identificar la columna. Generalmente no es necesario
     * si el `dataIndex` es único, pero puede ser útil en tablas complejas.
     */
    key?: string;

    /**
     * Tipo de entrada que espera la columna para mostrar o editar los valores.
     * - "number": Un valor numérico.
     * - "string": Un valor de texto.
     * - "date": Un valor de fecha.
     * - "boolean": Un valor booleano (true o false).
     */
    inputType?: "number" | "string" | "date" | "boolean";

    /**
     * Si es `true`, la columna será oculta en la vista de la tabla.
     * Útil cuando no deseas mostrar una columna, pero aún deseas mantenerla en los datos.
     */
    hidden?: boolean;

    /**
     * Función para personalizar cómo se renderiza el valor de cada celda en la columna.
     * Puedes usar esto para formatear los valores, agregar etiquetas u otros componentes.
     */
    render?: (value: any) => JSX.Element;

    /**
     * Define si la columna es editable por el usuario.
     * Si es `true`, el valor de la celda será editable, de lo contrario no será editable.
     */
    editable?: boolean;

    /**
     * Agregar el ancho de la columna13
     */
    width?: string;

    /**
     * Para ordenar por el campo seleccionado
     * Si es true, se mostrará el icono de ordenamiento en el encabezado
     */
    sortable?: boolean;
}
  
/**
 * Configuración de validación para los campos de la tabla.
 * Define las reglas de validación para los valores que se ingresan en cada columna.
 */
export interface IValidationConfig {
    /**
     * Indica si el campo es obligatorio en la validación.
     * Si es `true`, el campo debe tener un valor válido.
     */
    required: boolean;

    /**
     * El tipo de dato que debe tener el campo para pasar la validación.
     * - "number": El campo debe ser un número.
     * - "string": El campo debe ser una cadena de texto.
     * - "date": El campo debe ser una fecha válida.
     * - "boolean": El campo debe ser un valor booleano (true o false).
     */
    type: "number" | "string" | "date" | "boolean";

    /**
     * Etiqueta que describe el campo y que puede usarse para mostrar mensajes de error
     * o para identificación de la columna en la interfaz.
     */
    label: string;
}


export interface ITableConfig {
    [key: string]: IColumnConfig & { validation: IValidationConfig };
}

/**
 * Función que obtiene las columnas y las reglas de validación.
 * @param config Configuración de la tabla con columnas y reglas de validación.
 * @returns Un objeto que contiene las columnas configuradas y sus reglas de validación.
 */
export const getColumnsAndValidationRules = (config: ITableConfig) => {
  const columns = Object.keys(config).map((key) => {
    const column = config[key];
    return {
      title: column.title,
      dataIndex: column.dataIndex,
      key: column.key !== undefined ? column.key : column.dataIndex, // Si es undefined pone el dato de dataIndex 
      inputType: column.inputType !== undefined ? column.inputType : 'string',
      hidden: column.hidden !== undefined ? column.hidden : true,
      render: column.render,
      editable: column.editable !== undefined ? column.editable : false, // Valor por defecto false
      width: column.width,
      sortable: column.sortable,
    };
  });

  const validationRules = Object.keys(config).reduce((acc, key) => {
    const column = config[key];
    acc[key] = {
      required: column.validation.required, 
      type: column.validation.type ,
      label: column.validation.label,
    };
    return acc;
  }, {} as { [key: string]: IValidationConfig });

  return { columns, validationRules };
};
