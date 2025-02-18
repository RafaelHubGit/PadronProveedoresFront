import { useEffect, useState } from "react";
import { CatalogosAPI } from "../../../services/catalogosAPI.service";
import { EditableTable } from "../generalComponents/EditableTable/EditableTable";
import { handleTableChangeHelper } from "../../../helpers/catalogosHelpers";
import { toast } from "../../../helpers/uiHelpers";
import { getColumnsAndValidationRules } from "../generalComponents/EditableTable/ColumnsAndValidationRules";


interface CatalogoGenericoComponentProps<T> {
    storeHook: () => T[];
    loadingHook: () => boolean;
    fetchData: () => void;
    apiService: CatalogosAPI<T>;
    tableConfig: any;
    keyField: keyof T;
  }

export const CatalogoGenericoComponent = <T extends { [key: string]: any }>({
    storeHook,
    loadingHook,
    fetchData,
    apiService,
    tableConfig,
    keyField
}: CatalogoGenericoComponentProps<T>) => {

    const catalogData = storeHook();
    const loadingCatalogo = loadingHook();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<T[]>([]);

    useEffect(() => {
      fetchData(); // Llamar a la función para obtener los datos
    }, []);

    useEffect(() => {
        if (Array.isArray(catalogData)) {
          setData(catalogData);
        } else {
          setData([]);
        }
      }, [catalogData]);
    
      const handleTableChange = async (newData: T[]) => {
        setLoading(true);
        await handleTableChangeHelper({
          originalData: data,
          newData,
          apiService,
          setData,
          keyField: keyField as string,
          onChange: async (action, item, apiService) => {
            try {
              if (action === "update") {
                const updated = await apiService.update(item[keyField], item);
                if (updated) toast({ titulo: "", mensaje: "Información actualizada correctamente" });
                return updated;
              }
              if (action === "create") {
                const created = await apiService.create(item);
                if (created) toast({ titulo: "", mensaje: "Información agregada correctamente" });
                created.key = created[keyField];
                return created;
              }
              if (action === "delete") {
                return await apiService.delete(item[keyField]);
              }
            } catch (error) {
              console.log(error);
              alert({
                titulo: "Error",
                icono: "error",
                mensaje: "Se produjo un error al procesar la información."
              });
            } finally {
              setLoading(false);
            }
          }
        });
        setLoading(false);
      };
    
      const { columns, validationRules } = getColumnsAndValidationRules(tableConfig);

  return (
    <div>
        <EditableTable
            dataSource={(data || []).map(item => ({
                ...item,
                key: item?.[keyField] ? item[keyField].toString() : Math.random().toString(),
            }))}
            columns={columns}
            onSave={handleTableChange}
            validationRules={validationRules}
            loading={loading || loadingCatalogo}
        />
    </div>
  )
}
