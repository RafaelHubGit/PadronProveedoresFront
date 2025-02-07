import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";
import { CatalogosAPI } from "../../services/catalogosAPI.service";
import { IGiroComercial } from "../../interfaces/Catalogos.interface";
import { giroComercialInit } from "./initialState";




interface CatalogosState {

    giroComercial: IGiroComercial;
    getAllGirosComerciales: () => Promise<void>;
    
}


const storeCatalogos: StateCreator<CatalogosState> = ( set, get ) => ({

  giroComercial: giroComercialInit,

  getAllGirosComerciales: async () => {
    try {
      const result: IGiroComercial | null = await CatalogosAPI.getGirosComercialesApi() as IGiroComercial | null;

      if (result) {
        set({ giroComercial: result });
      } else {
        console.error("No se encontró el giroComercial");
        set({ giroComercial: { ...giroComercialInit } });
      }
    } catch ( error ) {
      console.error("Error al obtener el proveedor: ", error);
    }
  },
    
});

export const useCatalogosStore = create<CatalogosState>()(
    devtools(
      storeCatalogos
    )
)