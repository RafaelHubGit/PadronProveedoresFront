import { useState } from "react";
import { EditableTable } from "../generalComponents/EditableTable/EditableTable";
import { ColumnValidation } from "../../../interfaces/EditableTable.interface";


interface CatGiroComercial {
    key: number;
    IdGiroComercial: number;
    GiroComercial: string;
    IdUsuarioAlta: number;
    FechaAlta: Date;
    IdUsuarioModificacion: number | null;
    FechaModificacion: Date | null;
    Activo: boolean;
}


export const GiroComercialCatalogoComponent = () => {

    const [data, setData] = useState<CatGiroComercial[]>([]);
    
    const titleColumns = [
        { title: "Id Giro Comercial", dataIndex: "IdGiroComercial", key: "IdGiroComercial", hidden: true },
        { title: "Giro Comercial", dataIndex: "GiroComercial", key: "GiroComercial" },
        { title: "Id Usuario Alta", dataIndex: "IdUsuarioAlta", key: "IdUsuarioAlta", hidden: true },
        { title: "Fecha Alta", dataIndex: "FechaAlta", key: "FechaAlta", hidden: true },
        { title: "Id Usuario Modificación", dataIndex: "IdUsuarioModificacion", key: "IdUsuarioModificacion", hidden: true },
        { title: "Fecha Modificación", dataIndex: "FechaModificacion", key: "FechaModificacion", hidden: true },
        { title: "Activo", dataIndex: "Activo", key: "Activo" },
      ];
      
    const validationRules: ColumnValidation = {
        IdGiroComercial: { required: true, type: "number", label: "Id Giro Comercial" },
        GiroComercial: { required: true, type: "string", label: "Giro Comercial" },
        IdUsuarioAlta: { required: true, type: "number", label: "Id Usuario Alta" },
        FechaAlta: { required: true, type: "date", label: "Fecha Alta" },
        IdUsuarioModificacion: { required: false, type: "number", label: "Id Usuario Modificación" },
        FechaModificacion: { required: false, type: "date", label: "Fecha Modificación" },
        Activo: { required: true, type: "boolean", label: "Activo" },
    };

  return (
    <div>
        <EditableTable 
            dataSource={data}
            columns={titleColumns} 
            onSave={setData} 
            validationRules={validationRules}
        />
    </div>
  )
}
