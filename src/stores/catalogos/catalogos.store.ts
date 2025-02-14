import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";
import { CatalogosAPI } from "../../services/catalogosAPI.service";
import { IGiroComercial } from "../../interfaces/Catalogos.interface";
import { giroComercialInit } from "./initialState";




interface CatalogosState {

    giroComercial: IGiroComercial[];
    getAllGirosComerciales: () => Promise<void>;
    
}


const storeCatalogos: StateCreator<CatalogosState> = ( set ) => ({

  giroComercial: giroComercialInit,

  getAllGirosComerciales: async () => {
    try {
      const result: IGiroComercial[] | null = await CatalogosAPI.getGirosComercialesApi() as IGiroComercial[] | null;

      if (Array.isArray(result) && result.length > 0) {
        set({ giroComercial: result });
      } else {
        console.warn("No se encontraron giros comerciales, usando estado inicial.");
        set({ giroComercial: giroComercialInit });
      }
    } catch ( error ) {
      console.error("Error al obtener el proveedor: ", error);
      set({ giroComercial: giroComercialInit });
    }
  },
    
});

export const useCatalogosStore = create<CatalogosState>()(
    devtools(
      storeCatalogos
    )
)