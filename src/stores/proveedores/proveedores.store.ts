import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";
import { Proveedor as ProveedorInterface } from "../../interfaces/Proveedor.interface";
import { ProveedoresAPI } from "../../services/proveedoresAPI.service";
// import { Proveedor } from "../../presentation/pages/proveedores/Proveedor";




interface ProveedorState {

    proveedor: ProveedorInterface;

    getProveedorByNumeroProveedor: ( numeroProveedor: string ) => Promise<void>;
    
}


const storeProveedor: StateCreator<ProveedorState> = ( set ) => ({

    proveedor: {
        IdProveedor: 0,
        Rfc: '',
        RazonSocial: '',
        FechaAlta: new Date(),
        Activo: false,
        NumeroProveedor: '',
        DatosProveedores: []
      },

      getProveedorByNumeroProveedor: async (numeroProveedor: string) => {
        try {
            const result: ProveedorInterface | null = await ProveedoresAPI.getProveedorByNumeroProveedor(numeroProveedor) as ProveedorInterface | null;
          if (result) {
            set({ proveedor: result });
          } else {
            console.error("No se encontró el proveedor");
            set({ proveedor: { IdProveedor: 0, FechaAlta: new Date(), Activo: false, NumeroProveedor: '', DatosProveedores: [] } });
          }
        } catch (error) {
          console.error("Error al obtener el proveedor: ", error);
          set({ proveedor: { IdProveedor: 0, FechaAlta: new Date(), Activo: false, NumeroProveedor: '', DatosProveedores: [] } });
        }
      }
    
});

export const useProveedorStore = create<ProveedorState>()(
    devtools(
        storeProveedor
    )
)