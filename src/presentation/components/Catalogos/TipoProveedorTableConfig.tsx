import { Tag } from "antd";
import { ITableConfig } from "../generalComponents/EditableTable/ColumnsAndValidationRules";


export const TipoProveedorTableConfig: ITableConfig = {
    idTipoProveedor: {
      title: "Id Tipo Proveedor",
      dataIndex: "idTipoProveedor",
      key: "idTipoProveedor",
      hidden: false,
      validation: {
        required: false,
        type: "number",
        label: "Id Tipo Proveedor"
      }
    },
    tipoProveedor: {
      title: "Tipo Proveedor",
      dataIndex: "tipoProveedor",
      key: "tipoProveedor",
      inputType: "string",
      hidden: false,
      editable: true,
      sortable: true,
      validation: {
        required: true,
        type: "string",
        label: "Tipo Proveedor"
      }
    },
    fechaAlta: {
      title: "Fecha Alta",
      dataIndex: "fechaAlta",
      key: "fechaAlta",
      inputType: "date",
      hidden: true,
      editable: true,
      validation: {
        required: false,
        type: "date",
        label: "Fecha Alta"
      }
    },
    idUsuarioAlta: {
      title: "Id Usuario Alta",
      dataIndex: "idUsuarioAlta",
      key: "idUsuarioAlta",
      hidden: true,
      validation: {
        required: false,
        type: "number",
        label: "Id Usuario Alta"
      }
    },
    idUsuarioModificacion: {
      title: "Id Usuario Modificación",
      dataIndex: "idUsuarioModificacion",
      key: "idUsuarioModificacion",
      hidden: true,
      validation: {
        required: false,
        type: "number",
        label: "Id Usuario Modificación"
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
  