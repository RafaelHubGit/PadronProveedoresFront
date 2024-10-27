import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";


interface ProveedorState {

    numPage: number;
    
}


const storeProveedor: StateCreator<ProveedorState> = () => ({

    numPage : 1,
});

export const useProveedorStore = create<ProveedorState>()(
    devtools(
        storeProveedor
    )
)