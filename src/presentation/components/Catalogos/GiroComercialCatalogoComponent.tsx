import { useEffect, useState } from "react";
import { EditableTable } from "../generalComponents/EditableTable/EditableTable";
import { useCatalogosStore } from "../../../stores/catalogos/catalogos.store";
import { IGiroComercial } from "../../../interfaces/Catalogos.interface";
import { getColumnsAndValidationRules } from "../generalComponents/EditableTable/ColumnsAndValidationRules";
import { GiroComercialTableConfig } from "./GiroComercialTableConfig";
import { CatalogosAPI } from "../../../services/catalogosAPI.service";
import { alert, toast } from "../../../helpers/uiHelpers";
import Swal from "sweetalert2";


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

        // 1️⃣ Identificar eliminaciones
        const deletedItems = data.find(item => 
            !newData.some(d => d.idGiroComercial === item.idGiroComercial)
        );
    
        // 2️⃣ Identificar nuevos registros
        const newItem = newData.find(item => item.idGiroComercial === 0);

        // console.log("newItems : ", newItems);
        // console.log("DATA : ", data);
    
        // 3️⃣ Identificar modificaciones
        const hasChanges = (original: IGiroComercial, updated: IGiroComercial) => {
            return Object.keys(original).some(key => 
                original[key as keyof IGiroComercial] !== updated[key as keyof IGiroComercial]
            );
        };
    
        const updatedItem = newData.find(item => {
            const original = data.find(orig => orig.idGiroComercial === item.idGiroComercial);
            return original && hasChanges(original, item);
        });
    
        // 🟡 Registros modificados
        if (updatedItem) {
            console.log("🟡 Registros modificados:", updatedItem);

            // Se hace la llamada a la api
            const giro = await CatalogosAPI.actualizarApi( updatedItem );

            if ( !giro ){
                console.log("No se pudo Actualizar el pedul");
                setLoading( false );
                alert({
                    titulo: "Error",
                    icono: "error",
                    mensaje:"Se produjo un error al actualizar la información, intente nuevamente, si el error persiste contacte al equipo de desarrollo"
                });
                return;
            }

            const index = newData.findIndex(item => item.idGiroComercial === giro.idGiroComercial);
            if (index !== -1) {
            newData[index] = { ...giro };
            }
            toast({
                titulo: "",
                mensaje:"Información actualizada correctamente"
            });
        }
    
        // 🟢 Procesar registros agregados
        if (newItem) {
            console.log("🟢 Registros agregados:", newItem);

            // Se hace la llamada a la api
            const giro = await CatalogosAPI.crearApi( newItem );

            if ( !giro ){
                console.log("No se pudo crear el pedul");
                alert({
                    titulo: "Error",
                    icono: "error",
                    mensaje:"Se produjo un error al agregar la información, intente nuevamente, si el error persiste contacte al equipo de desarrollo"
                });
                return;
            }

            const index = newData.findIndex(item => item.idGiroComercial === giro.idGiroComercial);
            if (index !== -1) {
            newData[index] = { ...giro };
            }

            toast({
                titulo: "",
                mensaje:"Información agregada correctamente"
            });
            
        }
    
        // 🔴 Procesar registros eliminados
        if (deletedItems) {
            console.log("🔴 Registros eliminados:", deletedItems);

            const resp = await CatalogosAPI.eliminarFisicoApi( deletedItems.idGiroComercial );

            if ( resp?.code === 409 ){
                Swal.fire({
                    title: 'No se puede eliminar el registro',
                    text: 'El registro está asociado con información. ¿Desea cambiarle el estatus a inactivo?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Aceptar',
                    cancelButtonText: 'Cancelar',
                }).then( async (result) => {
                if (result.isConfirmed) {
                    // Llama a la función que cambie el estatus a inactivo
                    const resp = await CatalogosAPI.eliminarLogicoApi( deletedItems.idGiroComercial, 0 );

                    console.log('El usuario aceptó cambiar el estatus a inactivo : ', resp);

                    if ( !resp.success ){
                        alert({
                            titulo: "Error",
                            icono: "error",
                            mensaje:"Se produjo un error al cambiar el estatus de la información, intente nuevamente, si el error persiste contacte al equipo de desarrollo"
                        });
                    }

                    newData = [...data]; // Se regresa toda la data tal cual estaba para regresar el elemento donde se encontro
                    const itemToUpdate = newData.find((el) => el.idGiroComercial === deletedItems.idGiroComercial);
                    if (itemToUpdate) {
                        console.log("SI LO PINCHES ACTUALIZA");
                        itemToUpdate.activo = false;
                    }

                    toast({
                        titulo: "",
                        mensaje:"Estatus actualizado correctamente"
                    });
                    setLoading( false );
                    setData(newData);

                } else {
                    console.log('El usuario canceló la acción');
                }
                });

                
                return;
            }

            if ( !resp.success ){
                alert({
                    titulo: "Error",
                    icono: "error",
                    mensaje:"Se produjo un error al eliminar la información, intente nuevamente, si el error persiste contacte al equipo de desarrollo"
                });
                return;
            }

            toast({
                titulo: "",
                mensaje:"Información eliminada correctamente"
            });
        }
    
        // // 4️⃣ Actualizar el estado solo una vez
        // const updatedData = [
        //     ...newData.filter(item => !deletedItems.some(deleted => deleted.idGiroComercial === item.idGiroComercial)),
        //     ...newItems
        // ];
    
        // Llamar a setData una sola vez con todos los cambios
        setData(newData);
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
