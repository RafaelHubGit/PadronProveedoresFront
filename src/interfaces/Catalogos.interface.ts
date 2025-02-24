

export interface IGiroComercial {
    idGiroComercial: number;
    giroComercial: string;
    idUsuarioAlta: number;
    fechaAlta: Date;
    idUsuarioModificacion: number | null;
    fechaModificacion: Date | null;
    activo: boolean;
}

export interface ICatEstatusProveedorBloqueado {
    idEstatusProveedorBloqueado: number;
    estatus: string;
    idUsuarioAlta: number;
    fechaAlta: Date;
    idUsuarioModificacion: number | null;
    fechaModificacion: Date | null;
    activo: boolean;
  }

  export interface ICatEstratificacion {
    idEstratificacion: number;
    estratificacion: string;
    idUsuarioAlta: number;
    fechaAlta: Date;
    idUsuarioModificacion: number | null;
    fechaModificacion: Date | null;
    activo: boolean;
}

export interface ICatGenero {
    idGenero: number;
    genero: string;
    idUsuarioAlta: number;
    fechaAlta: Date;
    idUsuarioModificacion: number | null;
    fechaModificacion: Date | null;
    activo: boolean;
}

export interface ICatTipoContacto {
    idTipoContacto: number;
    tipoContacto: string;
    idUsuarioAlta: number;
    fechaAlta: Date;
    idUsuarioModificacion: number | null;
    fechaModificacion: Date | null;
    activo: boolean;
  }

export interface ICatTipoEntidad {
    idTipoEntidad: number;
    tipoEntidad: string;
    idUsuarioAlta: number;
    fechaAlta: Date;
    idUsuarioModificacion: number | null;
    fechaModificacion: Date | null;
    activo: boolean;
}

export interface ICatTipoProveedor {
    idTipoProveedor: number;
    tipoProveedor: string;
    idUsuarioAlta: number;
    fechaAlta: Date;
    idUsuarioModificacion: number | null;
    fechaModificacion: Date | null;
    activo: boolean;
}

export interface ICatMatrizArticulosFracciones {
    idMatrizArticulosFracciones: number;
    articulo: number;
    fraccion: string;
    descripcion: string;
    nota: string;
    idUsuarioAlta: number;
    fechaAlta: Date;
    idUsuarioModificacion: number | null;
    fechaModificacion: Date | null;
    activo: boolean;
  }