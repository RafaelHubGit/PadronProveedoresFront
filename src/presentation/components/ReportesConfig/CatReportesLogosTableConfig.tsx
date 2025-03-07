import { Tag, Image } from "antd";
import { ITableConfig } from "../generalComponents/EditableTable/ColumnsAndValidationRules";

const backUrl = `${import.meta.env.VITE_BACK_API_URL}/CatReportesLogos/imagen/`;
// const backUrl = `${process.env.BACK_API_URL}`;

export const CatReportesLogosTableConfig: ITableConfig = {
    idReportesLogos: {
      title: "ID Reportes Logos",
      dataIndex: "idReportesLogos",
      key: "idReportesLogos",
      hidden: true,
      validation: {
        required: false,
        type: "number",
        label: "ID Reportes Logos"
      }
    },
    imagen: {
      title: "Imágen",
      dataIndex: "imagen",
      key: "imagen",
      render: (text, record) => (
        <div style={{ textAlign: "center" }}>
          <Image 
            width={80}
            src={`${backUrl}${record?.nombre}`}
          />
        </div>
      ),
      hidden: false,
      editable: false,
      sortable: false,
      validation: {
        required: false,
        type: "boolean",
        label: "imagen"
      }
    },
    nombre: {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      inputType: "string",
      hidden: true,
      editable: true,
      sortable: true,
      validation: {
        required: true,
        type: "string",
        label: "Nombre"
      }
    },
    descripcion: {
      title: "Descripción",
      dataIndex: "descripcion",
      key: "descripcion",
      inputType: "string",
      hidden: false,
      editable: true,
      sortable: true,
      validation: {
        required: false,
        type: "string",
        label: "Descripción"
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
  