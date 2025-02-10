import { useEffect, useState } from "react";
import { Tag } from 'antd';
import { EditableTable } from "../generalComponents/EditableTable/EditableTable";
import { useCatalogosStore } from "../../../stores/catalogos/catalogos.store";
import { IGiroComercial } from "../../../interfaces/Catalogos.interface";
import { getColumnsAndValidationRules, ITableConfig } from "../generalComponents/EditableTable/ColumnsAndValidationRules";


export const GiroComercialCatalogoComponent = () => {

    const getGirosComerciales = useCatalogosStore( state => state.getAllGirosComerciales );
    const girosComerciales = useCatalogosStore(( state ) => state.giroComercial );
    const [data, setData] = useState<IGiroComercial[]>([]);


    useEffect(() => {
        getGirosComerciales();
    }, []);

    useEffect(() => {
        if (Array.isArray(girosComerciales)) {
            setData(girosComerciales); // Aquí lo asignamos correctamente
        } else {
            // console.error("girosComerciales no es un array:", girosComerciales);
            setData([]);
        }
    }, [girosComerciales]);
    

    
    
    
    // const titleColumns = [
    //     { title: "Id Giro Comercial", dataIndex: "idGiroComercial", key: "idGiroComercial", hidden: true },
    //     { title: "Giro Comercial", dataIndex: "giroComercial", key: "giroComercial" },
    //     { title: "Id Usuario Alta", dataIndex: "idUsuarioAlta", key: "idUsuarioAlta", hidden: true },
    //     { title: "Fecha Alta", dataIndex: "fechaAlta", key: "fechaAlta", inputType: "date", hidden: true  },
    //     { title: "Id Usuario Modificación", dataIndex: "idUsuarioModificacion", key: "idUsuarioModificacion", hidden: true },
    //     { title: "Fecha Modificación", dataIndex: "fechaModificacion", key: "fechaModificacion", hidden: true },
    //     { 
    //         title: "Activo", 
    //         dataIndex: "activo", 
    //         key: "activo", 
    //         render: (activo: boolean) => (
    //           <Tag color={activo ? 'green' : 'red'}>
    //             {activo ? 'Activo' : 'Inactivo'}
    //           </Tag>
    //         ) ,
    //         editable: false
    //     },
    // ];
      
    // const validationRules: ColumnValidation = {
    //     idGiroComercial: { required: false, type: "number", label: "Id Giro Comercial" },
    //     giroComercial: { required: true, type: "string", label: "Giro Comercial" },
    //     idUsuarioAlta: { required: false, type: "number", label: "Id Usuario Alta" },
    //     fechaAlta: { required: false, type: "date", label: "Fecha Alta" },
    //     idUsuarioModificacion: { required: false, type: "number", label: "Id Usuario Modificación" },
    //     fechaModificacion: { required: false, type: "date", label: "Fecha Modificación" },
    //     activo: { required: false, type: "boolean", label: "Activo" },
    // };

    const tableConfig: ITableConfig = {
        idGiroComercial: {
          title: "Id Giro Comercial",
          dataIndex: "idGiroComercial",
          key: "idGiroComercial",
          hidden: true,
          validation: {
            required: false,
            type: "number",
            label: "Id Giro Comercial"
          }
        },
        giroComercial: {
          title: "Giro Comercial",
          dataIndex: "giroComercial",
          key: "giroComercial",
          inputType: "string",
          hidden: false,
          editable: true,
          validation: {
            required: true,
            type: "string",
            label: "Giro Comercial"
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
          validation: {
            required: false,
            type: "boolean",
            label: "Activo"
          }
        }
    };
      
      

    const { columns, validationRules } = getColumnsAndValidationRules(tableConfig);


  return (
    <div>
        <EditableTable 
            dataSource={(data || []).map(item => ({
                ...item,
                key: item?.IdGiroComercial ? item.IdGiroComercial.toString() : Math.random().toString(), 
              }))}
            columns={columns} 
            onSave={setData} 
            validationRules={validationRules}
        />
    </div>
  )
}
