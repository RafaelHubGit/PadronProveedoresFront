import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { ProveedoresAPI } from "../../services/proveedoresAPI.service";
import { IHighlights, IProveedoresTS, IProveedoresTypeSense, IProveedoresTypeSenseApi } from "../../interfaces/proveedorTypeSense.interface";




interface ProveedorTypeSenseState {

    numPage: number; //Numero de pagina que se debe hacer a la peticion del API 
    sizePage: number;
    maxPage: number; //Pagina maxima que puede haber
    loading: boolean;
    currentPage: number, // Referencia para ubicar el paginador en la página correcta y mantener el estado de navegación
    // error: string | null;
    proveedoresTS: IProveedoresTS;

    setNumPage: ( by: number ) => void;
    setCurrentPage: ( page: number ) => void;
    getProveedorTypeSense: (searchTerm: string, lastSearchTerm: string, pageNumber: number, pageSize: number) => Promise<void>;

}

const storeProveedorTypeSense: StateCreator<ProveedorTypeSenseState> = ( set, get ) => ({

    searchTerm: '*',
    numPage: 1,
    sizePage: 250,
    maxPage: 0,
    loading: false,
    currentPage: 1,
    
    proveedoresTS: {
        proveedores: [],
        total: 0,
        mostrados: 0
    },

    setNumPage: ( by: number ) => set( { numPage: by }),
    setCurrentPage: ( page: number ) => set({currentPage: page }),

    getProveedorTypeSense: async (searchTerm, lastSearchTerm,  pageNumber = 1, pageSize = 250) => {
        set({ loading: true });
        // if ( searchTerm !== lastSearchTerm ){
            console.log("SI LIMPIA EL PEDULLLLLLLLL ");
        // if ( clean ){
            set({
                    proveedoresTS: {
                        proveedores: [],
                        total: 0,
                        mostrados: 0
                    }
                }
            );
        // }
        try {
            // const { results, count, returned } = (await ProveedoresAPI.getTypeSenseData(
            //     searchTerm,
            //     pageNumber,
            //     pageSize
            //   )) as { results: ProveedorTypeSense[]; count: number; returned: number };

            const result = await ProveedoresAPI.getTypeSenseData(
                searchTerm,
                pageNumber,
                pageSize
              ) as { results: IProveedoresTypeSenseApi[], count: number, returned: number }; 

              const proveedores: IProveedoresTypeSense[] = [
                ...get().proveedoresTS.proveedores,
                ...result.results.map((res: IProveedoresTypeSenseApi): IProveedoresTypeSense => ({
                    proveedor: {
                        ...res.Document, // Asegura que coincida con `IProveedorTypeSense`
                    },
                    highlights: (res.Highlights || []).map(highlight => ({
                        ...highlight,
                        snippets: Array.isArray(highlight.snippets) ? highlight.snippets : [highlight.snippet] 
                    })) as IHighlights[] // Asegura que `highlights` sea del tipo correcto
                }))
            ];

            console.log("PROVEEEEEEDOR : ", proveedores);

            set({
                proveedoresTS: {
                  proveedores: proveedores,
                  total: result.count,  // Aseguramos que 'count' es la cantidad total de proveedores
                  mostrados: result.returned,  // Aseguramos que 'returned' es la cantidad mostrada en esta página
                },
                maxPage: Math.ceil(result.count / pageSize),  // Calculamos el total de páginas
              });
        } catch ( e ) {
            console.log(`ERROR ${ e }`);
        } finally {
            set({ loading: false });
        }
    },

});

export const useProveedorTypeSenseStore = create<ProveedorTypeSenseState>()(
    devtools(
        storeProveedorTypeSense
    )
)