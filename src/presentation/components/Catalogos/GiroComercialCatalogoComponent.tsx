import { useEffect, useState } from "react";
import { EditableTable } from "../generalComponents/EditableTable/EditableTable";
import { useCatalogosStore } from "../../../stores/catalogos/catalogos.store";

import { getColumnsAndValidationRules } from "../generalComponents/EditableTable/ColumnsAndValidationRules";
import { GiroComercialTableConfig } from "./GiroComercialTableConfig";
import { CatalogosAPI } from "../../../services/catalogosAPI.service";
import { alert, toast } from "../../../helpers/uiHelpers";
import { handleTableChangeHelper } from "../../../helpers/catalogosHelpers";
import { IGiroComercial } from "../../../interfaces/Catalogos.interface";


export const GiroComercialCatalogoComponent = () => {

    const getGirosComerciales = useCatalogosStore( state => state.getAllGirosComerciales );
    const girosComerciales = useCatalogosStore(( state ) => state.girosComerciales );
    const loadingCatalogo = useCatalogosStore( state => state.loading.girosComerciales );
    const [loading, setLoading] = useState( false );
    const [data, setData] = useState<IGiroComercial[]>([]);

    useEffect(() => {
        getGirosComerciales(); // Esperar a que termine la carga
    }, []);

    useEffect(() => {
        if (Array.isArray(girosComerciales)) {
            setData(girosComerciales); // Aquí lo asignamos correctamente
        } else {
            setData([]);
        }
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
                        return updated;
                    }
                    if (action === "create") {
                        const created = await apiService.create(item);
                        if (created) toast({ titulo: "", mensaje: "Información agregada correctamente" });
                        created.key = created.idGiroComercial;
                        return created;
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
                } finally {
                    setLoading( false );
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
            loading={ loading || loadingCatalogo }
        />
    </div>
  )
}
