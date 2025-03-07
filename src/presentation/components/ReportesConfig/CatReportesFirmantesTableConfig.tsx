import { Tag } from "antd";
import { ITableConfig } from "../generalComponents/EditableTable/ColumnsAndValidationRules";

export const catReportesFirmantesTableConfig: ITableConfig = {
    idReportesFirmantes: {
      title: "ID Reportes Firmantes",
      dataIndex: "idReportesFirmantes",
      key: "idReportesFirmantes",
      hidden: false,
      validation: {
        required: false,
        type: "number",
        label: "ID Reportes Firmantes"
      }
    },
    nombre: {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      inputType: "string",
      hidden: false,
      editable: true,
      sortable: true,
      validation: {
        required: true,
        type: "string",
        label: "Nombre"
      }
    },
    cargo: {
      title: "Cargo",
      dataIndex: "cargo",
      key: "cargo",
      inputType: "string",
      hidden: false,
      editable: true,
      sortable: true,
      validation: {
        required: true,
        type: "string",
        label: "Cargo"
      }
    },
    prefijo: {
      title: "Prefijo",
      dataIndex: "prefijo",
      key: "prefijo",
      inputType: "string",
      hidden: false,
      editable: true,
      sortable: true,
      validation: {
        required: false,
        type: "string",
        label: "Prefijo"
      }
    },
    fechaAlta: {
      title: "Fecha Alta",
      dataIndex: "fechaAlta",
      key: "fechaAlta",
      inputType: "date",
      hidden: true,
      editable: false,
      validation: {
        required: false,
        type: "date",
        label: "Fecha Alta"
      }
    },
    idUsuarioAlta: {
      title: "ID Usuario Alta",
      dataIndex: "idUsuarioAlta",
      key: "idUsuarioAlta",
      hidden: true,
      validation: {
        required: false,
        type: "number",
        label: "ID Usuario Alta"
      }
    },
    idUsuarioModificacion: {
      title: "ID Usuario Modificación",
      dataIndex: "idUsuarioModificacion",
      key: "idUsuarioModificacion",
      hidden: true,
      validation: {
        required: false,
        type: "number",
        label: "ID Usuario Modificación"
      }
    },
    fechaModificacion: {
      title: "Fecha Modificación",
      dataIndex: "fechaModificacion",
      key: "fechaModificacion",
      inputType: "date",
      hidden: true,
      validation: {
        required: false,
        type: "date",
        label: "Fecha Modificación"
      }
    },
    activo: {
      title: "Activo",
      dataIndex: "activo",
      key: "activo",
      render: (activo: boolean) => (
        <Tag color={activo ? 'green' : 'red'}>
          {activo ? 'Activo' : 'Inactivo'}
        </Tag>
      ),
      editable: false,
      hidden: false,
      width: "100px",
      validation: {
        required: false,
        type: "boolean",
        label: "Activo"
      }
    }
  };
  