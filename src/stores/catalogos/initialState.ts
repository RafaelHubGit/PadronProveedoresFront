

// export const giroComercialInit = {
//     IdGiroComercial: 0,
//     GiroComercial: '',
//     IdUsuarioAlta: 0,
//     FechaAlta: new Date(),
//     IdUsuarioModificacion: null,
//     FechaModificacion: null,
//     Activo: false,
// };

import { IGiroComercial } from "../../interfaces/Catalogos.interface";

export const giroComercialInit: IGiroComercial[] = [
    {
        IdGiroComercial: 0,
        GiroComercial: '',
        IdUsuarioAlta: 0,
        FechaAlta: new Date(),
        IdUsuarioModificacion: null,
        FechaModificacion: null,
        Activo: true,
    }
]; // ← Debe ser un array vacío por defecto
