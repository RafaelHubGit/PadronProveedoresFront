import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";
import { CatalogosAPI } from "../../services/catalogosAPI.service";
import { IGiroComercial, ICatEstatusProveedorBloqueado } from "../../interfaces/Catalogos.interface";
import { giroComercialInit, catEstatusProveedorBloqueadoInit } from "./initialState";


interface CatalogosState {

    girosComerciales: IGiroComercial[];
    getAllGirosComerciales: () => Promise<void>;

    estatusProveedorBloqueado: ICatEstatusProveedorBloqueado[];
    getAllEstatusProveedorBloqueado: () => Promise<void>;

    loading: {
      global?: boolean;
      girosComerciales?: boolean;
      estatusProveedorBloqueado?: boolean;
    };


    obtenerCatalogo: <T>(catalogo: string, propiedad: keyof CatalogosState) => Promise<void>;
    
}


const storeCatalogos: StateCreator<CatalogosState> = ( set, get ) => ({

  estatusProveedorBloqueado: catEstatusProveedorBloqueadoInit,
  girosComerciales: giroComercialInit,

  loading: {
    global: false,
    girosComerciales: false,
    estatusProveedorBloqueado: false,
  },

  obtenerCatalogo: async <T>(catalogo: string, propiedad: keyof CatalogosState) => {
    set({ loading: { global: true, [propiedad]: true } });
    try {
      const catalogosAPI = new CatalogosAPI(catalogo);
      const result: T[] | null = await catalogosAPI.getAll() as T[] | null;

      if (Array.isArray(result) && result.length > 0) {
        console.log("DEBE DE ENTRAR A PONER LA INFO");
        set({ [propiedad]: result });
      } else {
        console.warn(`No se encontraron ${catalogo}, usando estado inicial.`);
        set({ [propiedad]: [] });
      }
    } catch (error) {
      console.error(`Error al obtener la información de ${catalogo}: `, error);
      set({ [propiedad]: [] });
    } finally {
      set({ loading: { global: false, [propiedad]: false } });
    }
  },

  getAllEstatusProveedorBloqueado: async () => {
    await get().obtenerCatalogo<IGiroComercial>("CatEstatusProveedorBloqueado", "estatusProveedorBloqueado");
  },
  getAllGirosComerciales: async () => {
    await get().obtenerCatalogo<IGiroComercial>("CatGiroComercial", "girosComerciales");
  },
    
});

export const useCatalogosStore = create<CatalogosState>()(
    devtools(
      storeCatalogos
    )
)