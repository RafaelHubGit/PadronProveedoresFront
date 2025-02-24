

// export const giroComercialInit = {
//     IdGiroComercial: 0,
//     GiroComercial: '',
//     IdUsuarioAlta: 0,
//     FechaAlta: new Date(),
//     IdUsuarioModificacion: null,
//     FechaModificacion: null,
//     Activo: false,
// };

import { IGiroComercial, ICatEstatusProveedorBloqueado, ICatEstratificacion, ICatGenero, ICatTipoContacto, ICatTipoEntidad, ICatTipoProveedor, ICatMatrizArticulosFracciones } from "../../interfaces/Catalogos.interface";

export const giroComercialInit: IGiroComercial[] = [
    {
        idGiroComercial: 0,
        giroComercial: '',
        idUsuarioAlta: 0,
        fechaAlta: new Date(),
        idUsuarioModificacion: null,
        fechaModificacion: null,
        activo: true,
    }
]; // ← Debe ser un array vacío por defecto


export const estatusProveedorBloqueadoInit: ICatEstatusProveedorBloqueado[] = [
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

export const estratificacionInit: ICatEstratificacion[] = [
    {
        idEstratificacion: 0,
        estratificacion: '',
        idUsuarioAlta: 0,
        fechaAlta: new Date(),
        idUsuarioModificacion: null,
        fechaModificacion: null,
        activo: true,
    }
];

export const catGeneroInit: ICatGenero[] = [
    {
        idGenero: 0,
        genero: '',
        idUsuarioAlta: 0,
        fechaAlta: new Date(),
        idUsuarioModificacion: null,
        fechaModificacion: null,
        activo: true,
    }
];

export const catTipoContactoInit: ICatTipoContacto[] = [
    {
      idTipoContacto: 0,
      tipoContacto: '',
      idUsuarioAlta: 0,
      fechaAlta: new Date(),
      idUsuarioModificacion: null,
      fechaModificacion: null,
      activo: true,
    }
  ];

export const catTipoEntidadInit: ICatTipoEntidad[] = [
    {
        idTipoEntidad: 0,
        tipoEntidad: '',
        idUsuarioAlta: 0,
        fechaAlta: new Date(),
        idUsuarioModificacion: null,
        fechaModificacion: null,
        activo: true,
    }
];

export const catTipoProveedorInit: ICatTipoProveedor[] = [
    {
      idTipoProveedor: 0,
      tipoProveedor: '',
      idUsuarioAlta: 0,
      fechaAlta: new Date(),
      idUsuarioModificacion: null,
      fechaModificacion: null,
      activo: true,
    }
  ];

export const catMatrizArticulosFraccionesInit: ICatMatrizArticulosFracciones[] = [
    {
      idMatrizArticulosFracciones: 0,
      articulo: 0,
      fraccion: '',
      descripcion: '',
      nota: '',
      idUsuarioAlta: 0,
      fechaAlta: new Date(),
      idUsuarioModificacion: null,
      fechaModificacion: null,
      activo: true,
    }
];