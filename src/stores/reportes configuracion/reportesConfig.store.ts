import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";
import { CatalogosAPI } from "../../services/catalogosAPI.service";
import { ICatReportesFirmantes, ICatReportesLeyendas, ICatReportesLogos } from "../../interfaces/ReportesConfig.interfaces";
import { catReportesFirmantesInit, catReportesLeyendasInit, catReportesLogosInit } from "./initialState";


interface ReportesConfigState {

  reportesFirmantes: ICatReportesFirmantes[];
  reportesLeyendas: ICatReportesLeyendas[]; 
  reportesLogos: ICatReportesLogos[]; 



  getReportesFirmantes: () => Promise<void>;
  getReportesLeyendas: () => Promise<void>;
  getReportesLogos: () => Promise<void>;



  loading: {
    global?: boolean;
    reportesFirmantes?: boolean;
    reportesLeyendas?: boolean;
    reportesLogos?: boolean;

  };


    obtenerCatalogo: <T>(catalogo: string, propiedad: keyof ReportesConfigState) => Promise<void>;
    
}


const storeCatalogos: StateCreator<ReportesConfigState> = ( set, get ) => ({

  reportesFirmantes: catReportesFirmantesInit,
  reportesLeyendas: catReportesLeyendasInit,
  reportesLogos: catReportesLogosInit,





  loading: {
    global: false,
    reportesFirmantes: false,
    reportesLeyendas: false,
    reportesLogos: false,

  },

  obtenerCatalogo: async <T>(catalogo: string, propiedad: keyof ReportesConfigState) => {
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

  getReportesFirmantes: async () => {
    await get().obtenerCatalogo<ICatReportesFirmantes>("CatReportesFirmantes", "reportesFirmantes");
  },
  getReportesLeyendas: async () => {
    await get().obtenerCatalogo<ICatReportesLeyendas>("CatReportesLeyendas", "reportesLeyendas");
  },
  getReportesLogos: async () => {
    await get().obtenerCatalogo<ICatReportesLogos>("CatReportesLogos", "reportesLogos");
  },
  

});

export const useReporteConfigStore = create<ReportesConfigState>()(
    devtools(
      storeCatalogos
    )
)