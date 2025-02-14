import { useEffect, useState } from "react";
import { EditableTable } from "../generalComponents/EditableTable/EditableTable";
import { useCatalogosStore } from "../../../stores/catalogos/catalogos.store";
import { IGiroComercial } from "../../../interfaces/Catalogos.interface";
import { getColumnsAndValidationRules } from "../generalComponents/EditableTable/ColumnsAndValidationRules";
import { GiroComercialTableConfig } from "./GiroComercialTableConfig";
import { CatalogosAPI } from "../../../services/catalogosAPI.service";
import { alert, toast } from "../../../helpers/uiHelpers";
import { handleTableChangeHelper } from "../../../helpers/catalogosHelpers";


export const GiroComercialCatalogoComponent = () => {

    const [loading, setLoading] = useState( true );
    const getGirosComerciales = useCatalogosStore( state => state.getAllGirosComerciales );
    const girosComerciales = useCatalogosStore(( state ) => state.giroComercial );
    const [data, setData] = useState<IGiroComercial[]>([]);

    useEffect(() => {
        getGirosComerciales();
        setLoading( false );
    }, []);

    useEffect(() => {
        setLoading( true );
        if (Array.isArray(girosComerciales)) {
            setData(girosComerciales); // Aquí lo asignamos correctamente
        } else {
            setData([]);
        }
        setLoading( false );
    }, [girosComerciales]);

    const handleTableChange = async (newData: IGiroComercial[]) => {
        setLoading( true );
        await handleTableChangeHelper({
            originalData: data,
            newData,
            apiService: new CatalogosAPI<IGiroComercial>("CatGiroComercial"),
            setData,
            keyField: "idGiroComercial",
            onChange: async (action, item, apiService) => {
                try {
                    if (action === "update") {
                        const updated = await apiService.update(item.idGiroComercial, item);
                        if (updated) toast({ titulo: "", mensaje: "Información actualizada correctamente" });
                    }
                    if (action === "create") {
                        const created = await apiService.create(item);
                        if (created) toast({ titulo: "", mensaje: "Información agregada correctamente" });
                    }
                    if (action === "delete") {
                        return await apiService.delete(item.idGiroComercial);
                    }
                } catch (error) {
                    console.log(error);
                    alert({
                        titulo: "Error",
                        icono: "error",
                        mensaje: "Se produjo un error al procesar la información."
                    })
                }
            }
        });
        setLoading( false );
    };

    const tableConfig = GiroComercialTableConfig;
    const { columns, validationRules } = getColumnsAndValidationRules(tableConfig);

  return (
    <div>
        <EditableTable 
            dataSource={(data || []).map(item => ({
                ...item,
                key: item?.idGiroComercial ? item.idGiroComercial.toString() : Math.random().toString(), 
              }))}
            columns={columns} 
            // onSave={setData} 
            onSave={handleTableChange}
            validationRules={validationRules}
            loading={ loading }
        />
    </div>
  )
}
