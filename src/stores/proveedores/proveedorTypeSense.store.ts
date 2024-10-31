import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { ProveedoresAPI } from "../../services/proveedoresAPI.service";
import { ProveedorTypeSense } from "../../interfaces/proveedorTypeSense.interface";


interface proveedoresTSAPI {
    proveedores: ProveedorTypeSense[];
    total: number,
    mostrados: number
}

interface ProveedorTypeSenseState {

    numPage: number; //Numero de pagina que se debe hacer a la peticion del API 
    sizePage: number;
    maxPage: number; //Pagina maxima que puede haber
    loading: boolean;
    currentPage: number, // Referencia para ubicar el paginador en la página correcta y mantener el estado de navegación
    // error: string | null;
    proveedoresTS: proveedoresTSAPI;

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
        mostrados: 0,
    },

    setNumPage: ( by: number ) => set( { numPage: by }),
    setCurrentPage: ( page: number ) => set({currentPage: page }),

    getProveedorTypeSense: async (searchTerm, lastSearchTerm,  pageNumber = 1, pageSize = 250) => {
        console.log(searchTerm, ' = ', lastSearchTerm);
        if ( searchTerm !== lastSearchTerm ){
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
        }
        try {
            const { results, count, returned } = (await ProveedoresAPI.getTypeSenseData(
                searchTerm,
                pageNumber,
                pageSize
              )) as { results: ProveedorTypeSense[]; count: number; returned: number };

              const proveedores = [...get().proveedoresTS.proveedores, ...results];

            set({
                    proveedoresTS: {
                        // proveedores: [...get().proveedoresTS.proveedores, ...results],
                        proveedores: proveedores,
                        total: count,
                        // mostrados: get().proveedoresTS.proveedores.length
                        mostrados: returned
                    },
                    maxPage: Math.ceil(get().proveedoresTS.proveedores.length / pageSize)
                }
            );
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