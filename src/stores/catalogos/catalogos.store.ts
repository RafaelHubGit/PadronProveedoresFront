import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";
import { CatalogosAPI } from "../../services/catalogosAPI.service";
import { IGiroComercial, ICatEstatusProveedorBloqueado, ICatEstratificacion, ICatGenero, ICatTipoContacto, ICatTipoEntidad, ICatTipoProveedor, ICatMatrizArticulosFracciones, ICatTipoDocumento } from "../../interfaces/Catalogos.interface";
import { giroComercialInit, estratificacionInit, estatusProveedorBloqueadoInit, catGeneroInit, catTipoContactoInit, catTipoEntidadInit, catTipoProveedorInit, catMatrizArticulosFraccionesInit, catTipoDocumentoInit } from "./initialState";


interface CatalogosState {

    girosComerciales: IGiroComercial[];
    estatusProveedorBloqueado: ICatEstatusProveedorBloqueado[];
    estratificacion: ICatEstratificacion[];
    genero: ICatGenero[];
    tipoContacto: ICatTipoContacto[];
    tipoEntidad: ICatTipoEntidad[];
    tipoProveedor: ICatTipoProveedor[];
    matrizArticulosFracciones: ICatMatrizArticulosFracciones[];
    tipoDocumento: ICatTipoDocumento[];


    
    getAllGirosComerciales: () => Promise<void>;
    getAllEstatusProveedorBloqueado: () => Promise<void>;
    getEstratificacion: () => Promise<void>;
    getGenero: () => Promise<void>;
    getTipoContacto: () => Promise<void>;
    getTipoEntidad: () => Promise<void>;
    getTipoProveedor: () => Promise<void>;
    getMatrizArticulosFracciones: () => Promise<void>;
    getTipoDocumento: () => Promise<void>;


    



    loading: {
      global?: boolean;
      girosComerciales?: boolean;
      estatusProveedorBloqueado?: boolean;
      estratificacion?: boolean;
      genero?: boolean;
      tipoContacto?: boolean;
      tipoEntidad?: boolean;
      tipoProveedor?: boolean;
      matrizArticulosFracciones?: boolean;
      tipoDocumento?: boolean;

    };


    obtenerCatalogo: <T>(catalogo: string, propiedad: keyof CatalogosState) => Promise<void>;
    
}


const storeCatalogos: StateCreator<CatalogosState> = ( set, get ) => ({

  estatusProveedorBloqueado: estatusProveedorBloqueadoInit,
  girosComerciales: giroComercialInit,
  estratificacion: estratificacionInit,
  genero: catGeneroInit,
  tipoContacto: catTipoContactoInit,
  tipoEntidad: catTipoEntidadInit,
  tipoProveedor: catTipoProveedorInit,
  matrizArticulosFracciones: catMatrizArticulosFraccionesInit,
  tipoDocumento: catTipoDocumentoInit,





  loading: {
    global: false,
    girosComerciales: false,
    estatusProveedorBloqueado: false,
    genero: false,
    tipoContacto: false,
    tipoEntidad: false,
    loadingTipoProveedor: false,
    matrizArticulosFracciones: false,
    tipoDocumento: false,

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
  
  getEstratificacion: async () => {
    await get().obtenerCatalogo<ICatEstratificacion>("CatEstratificacion", "estratificacion");
  },

  getGenero: async () => {
    await get().obtenerCatalogo<ICatGenero>("CatGenero", "genero");
  },

  getTipoContacto: async () => {
    await get().obtenerCatalogo<ICatTipoContacto>("CatTipoContacto", "tipoContacto");
  },

  getTipoEntidad: async () => {
    await get().obtenerCatalogo<ICatTipoEntidad>("CatTipoEntidad", "tipoEntidad");
  },

  getTipoProveedor: async () => {
    await get().obtenerCatalogo<ICatTipoProveedor>("CatTipoProveedor", "tipoProveedor");
  },

  getMatrizArticulosFracciones: async () => {
    await get().obtenerCatalogo<ICatMatrizArticulosFracciones>("CatMatrizArticulosFracciones", "matrizArticulosFracciones");
  },

  getTipoDocumento: async () => {
    await get().obtenerCatalogo<ICatTipoDocumento>("CatTipoDocumento", "tipoDocumento");
  },

});

export const useCatalogosStore = create<CatalogosState>()(
    devtools(
      storeCatalogos
    )
)