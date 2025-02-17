

// export const giroComercialInit = {
//     IdGiroComercial: 0,
//     GiroComercial: '',
//     IdUsuarioAlta: 0,
//     FechaAlta: new Date(),
//     IdUsuarioModificacion: null,
//     FechaModificacion: null,
//     Activo: false,
// };

import { IGiroComercial, ICatEstatusProveedorBloqueado } from "../../interfaces/Catalogos.interface";

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


export const catEstatusProveedorBloqueadoInit: ICatEstatusProveedorBloqueado[] = [
    {
      idEstatusProveedorBloqueado: 0,
      estatus: '',
      idUsuarioAlta: 0,
      fechaAlta: new Date(),
      idUsuarioModificacion: null,
      fechaModificacion: null,
      activo: true,
    }
];