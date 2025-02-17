import { useEffect, useState } from "react";
import { EditableTable } from "../generalComponents/EditableTable/EditableTable";
import { useCatalogosStore } from "../../../stores/catalogos/catalogos.store";
import { ICatEstatusProveedorBloqueado } from "../../../interfaces/Catalogos.interface";
import { getColumnsAndValidationRules } from "../generalComponents/EditableTable/ColumnsAndValidationRules";

import { CatalogosAPI } from "../../../services/catalogosAPI.service";
import { alert, toast } from "../../../helpers/uiHelpers";
import { handleTableChangeHelper } from "../../../helpers/catalogosHelpers";
import { catEstatusProveedorBloqueadoTableConfig } from "./EstatusProveedorBloqueadoTableConfig";

export const EstatusProveedorBloqueadoComponent = () => {

    const [loading, setLoading] = useState( true );
    const getEPB = useCatalogosStore( state => state.getAllEstatusProveedorBloqueado );
    const epb = useCatalogosStore(( state ) => state.estatusProveedorBloqueado );
    const [data, setData] = useState<ICatEstatusProveedorBloqueado[]>([]);

    useEffect(() => {
        getEPB(); // Esperar a que termine la carga
        setLoading( false );
    }, []);

    useEffect(() => {
        if (Array.isArray(epb)) {
            setData(epb); // Aquí lo asignamos correctamente
        } else {
            setData([]);
        }
        
        

    }, [epb]);

    const handleTableChange = async (newData: ICatEstatusProveedorBloqueado[]) => {
        setLoading( true );
        await handleTableChangeHelper({
            originalData: data,
            newData,
            apiService: new CatalogosAPI<ICatEstatusProveedorBloqueado>("CatEstatusProveedorBloqueado"),
            setData,
            keyField: "idEstatusProveedorBloqueado",
            onChange: async (action, item, apiService) => {
                try {
                    if (action === "update") {
                        const updated = await apiService.update(item.idEstatusProveedorBloqueado, item);
                        if (updated) toast({ titulo: "", mensaje: "Información actualizada correctamente" });
                        return updated;
                    }
                    if (action === "create") {
                        const created = await apiService.create(item);
                        if (created) toast({ titulo: "", mensaje: "Información agregada correctamente" });
                        created.key = created.idEstatusProveedorBloqueado;
                        return created;
                    }
                    if (action === "delete") {
                        return await apiService.delete(item.idEstatusProveedorBloqueado);
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

    const tableConfig = catEstatusProveedorBloqueadoTableConfig;
    const { columns, validationRules } = getColumnsAndValidationRules(tableConfig);

  return (
    <div>
        <EditableTable 
            dataSource={(data || []).map(item => ({
                ...item,
                key: item?.idEstatusProveedorBloqueado ? item.idEstatusProveedorBloqueado.toString() : Math.random().toString(), 
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
