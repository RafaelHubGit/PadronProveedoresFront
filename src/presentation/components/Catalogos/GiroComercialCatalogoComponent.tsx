import { useEffect, useState } from "react";
import { DatePicker, Tag } from 'antd';
import { EditableTable } from "../generalComponents/EditableTable/EditableTable";
import { ColumnValidation } from "../../../interfaces/EditableTable.interface";
import { useCatalogosStore } from "../../../stores/catalogos/catalogos.store";
import { IGiroComercial } from "../../../interfaces/Catalogos.interface";


// interface CatGiroComercial {
//     IdGiroComercial: number;
//     GiroComercial: string;
//     IdUsuarioAlta: number;
//     FechaAlta: Date;
//     IdUsuarioModificacion: number | null;
//     FechaModificacion: Date | null;
//     Activo: boolean;
// }


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
            console.error("girosComerciales no es un array:", girosComerciales);
        }
    }, [girosComerciales]);
    

    
    
    
    const titleColumns = [
        { title: "Id Giro Comercial", dataIndex: "idGiroComercial", key: "idGiroComercial", hidden: true },
        { title: "Giro Comercial", dataIndex: "giroComercial", key: "giroComercial" },
        { title: "Id Usuario Alta", dataIndex: "idUsuarioAlta", key: "idUsuarioAlta", hidden: true },
        { title: "Fecha Alta", dataIndex: "fechaAlta", key: "fechaAlta", inputType: "date", hidden: true  },
        { title: "Id Usuario Modificación", dataIndex: "idUsuarioModificacion", key: "idUsuarioModificacion", hidden: true },
        { title: "Fecha Modificación", dataIndex: "fechaModificacion", key: "fechaModificacion", hidden: true },
        { 
            title: "Activo", 
            dataIndex: "activo", 
            key: "activo", 
            render: (activo: boolean) => (
              <Tag color={activo ? 'green' : 'red'}>
                {activo ? 'Activo' : 'Inactivo'}
              </Tag>
            ) ,
            editable: false
        },
    ];
      
    const validationRules: ColumnValidation = {
        idGiroComercial: { required: false, type: "number", label: "Id Giro Comercial" },
        giroComercial: { required: true, type: "string", label: "Giro Comercial" },
        idUsuarioAlta: { required: false, type: "number", label: "Id Usuario Alta" },
        fechaAlta: { required: false, type: "date", label: "Fecha Alta" },
        idUsuarioModificacion: { required: false, type: "number", label: "Id Usuario Modificación" },
        fechaModificacion: { required: false, type: "date", label: "Fecha Modificación" },
        activo: { required: false, type: "boolean", label: "Activo" },
    };

  return (
    <div>
        <EditableTable 
            dataSource={(data || []).map(item => ({
                ...item,
                key: item?.IdGiroComercial ? item.IdGiroComercial.toString() : Math.random().toString(), 
              }))}
            columns={titleColumns} 
            onSave={setData} 
            validationRules={validationRules}
        />
    </div>
  )
}
