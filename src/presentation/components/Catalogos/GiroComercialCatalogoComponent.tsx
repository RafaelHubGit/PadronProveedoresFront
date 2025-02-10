import { useEffect, useState } from "react";
import { EditableTable } from "../generalComponents/EditableTable/EditableTable";
import { useCatalogosStore } from "../../../stores/catalogos/catalogos.store";
import { IGiroComercial } from "../../../interfaces/Catalogos.interface";
import { getColumnsAndValidationRules } from "../generalComponents/EditableTable/ColumnsAndValidationRules";
import { GiroComercialTableConfig } from "./GiroComercialTableConfig";


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
            setData([]);
        }
    }, [girosComerciales]);
    

    const tableConfig = GiroComercialTableConfig;
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
