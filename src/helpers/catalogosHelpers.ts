import Swal from "sweetalert2";
import { alert, toast } from "./uiHelpers";


interface HandleTableChangeParams<T> {
    originalData: T[];
    newData: T[];
    apiService: any;
    setData: (data: T[]) => void;
    keyField: keyof T;
    onChange: (action: 'update' | 'delete' | 'create', item: T, apiService: any) => Promise<APIResponse>;
}

interface APIResponse {
    success: boolean;
    code?: number; // Puede ser 409 o cualquier otro código
}
  
  export const handleTableChangeHelper = async <T extends object>({
    originalData,
    newData,
    apiService,
    setData,
    keyField,
    onChange,
  }: HandleTableChangeParams<T>) => {

    // 1️⃣ Identificar eliminaciones
    const deletedItem = originalData.find((item) => !newData.some((d) => d[keyField] === item[keyField]));

    // 2️⃣ Identificar nuevos registros
    const newItem = newData.find((item) => item[keyField] === 0);

    // 3️⃣ Identificar modificaciones
    const hasChanges = <T extends object>(original: T, updated: T) => {
        return Object.keys(original).some((key) => original[key as keyof T] !== updated[key as keyof T]);
    };

    const updatedItem = newData.find((item) => {
        const original = originalData.find((orig) => orig[keyField] === item[keyField]);
        return original && hasChanges(original, item);
    });

    // Manejar cambios
    if (deletedItem) {
        try {
          const response = await onChange("delete", deletedItem, apiService);
    
          if (response?.code === 409) {
            Swal.fire({
              title: "No se puede eliminar el registro",
              text: "El registro está asociado con información. ¿Desea cambiarle el estatus a inactivo?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Aceptar",
              cancelButtonText: "Cancelar",
            }).then(async (result) => {
              if (result.isConfirmed) {
                const softDeleteResp = await apiService.softDelete(
                    keyField,
                    deletedItem[keyField],
                    "idUsuario",
                    0
                );
    
                if (!softDeleteResp.success) {
                  alert({
                    titulo: "Error",
                    icono: "error",
                    mensaje:
                      "Se produjo un error al cambiar el estatus de la información, intente nuevamente. Si el error persiste, contacte al equipo de desarrollo.",
                  });
                } else {
                  // Restaurar datos y cambiar estatus a inactivo
                  const updatedData = [...originalData];
                  const itemToUpdate = updatedData.find((el) => el[keyField] === deletedItem[keyField]) as T & { activo?: boolean };
                  if (itemToUpdate) {
                    itemToUpdate.activo = false;
                  }
    
                  toast({
                    titulo: "",
                    mensaje: "Estatus actualizado correctamente",
                  });
    
                  setData(updatedData);
                }
              } else {
                setData( [...originalData] ); //Si se cancela, se regresa la informacion como estaba
              }
            });
          }
        } catch (error) {
          console.error("Error eliminando item:", error);
        }
    }

    if (newItem) {
      const response = await onChange('create', newItem, apiService);
      if ( !response ){
        alert({
          titulo: "Error",
          mensaje: "Error al crear el elemento",
          icono: "error"
        });
        return;
      }
      const updatedData = newData.map((item) => // Busca el elemento y setea la informacion que regresa de la api en la tabla
        item[keyField] === newItem[keyField] ? { ...item, ...response } : item
      );
      setData( updatedData );
      return response;
    }

    if (updatedItem) {
        const response = await onChange('update', updatedItem, apiService);
        if ( !response ){
          alert({
            titulo: "Error",
            mensaje: "No se pudo realizar la actualización.",
            icono: "error"
          });
          return;
        }
        setData(newData);
        return response;
    }
  };
