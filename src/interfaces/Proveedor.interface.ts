export interface Proveedor {
    IdProveedor: number;
    Rfc?: string;
    RazonSocial?: string;
    FechaAlta: Date;
    Activo: boolean;
    NumeroProveedor?: string;
    DatosProveedores?: DatosProveedor[];
  }
  
export interface DatosProveedor {
    IdProveedorDatos: number;
    NumeroProveedor?: string;
    NumeroRefrendo?: string;
    FechaRefrendo?: Date;
    TipoProveedor?: string;
    Observaciones?: string;
    SitioWeb?: string;
    EsRepse: boolean;
    FechaRepse?: Date;
    TieneDocumentos: boolean;
    FechaAlta: Date;
    Activo: boolean;
    Domicilio?: Domicilio[];
    Representantes?: Representantes[];
    Contactos?: Contacto[];
    GirosComerciales?: GirosComerciales[];
    Inactivos?: Inactivo[];
    Documentos?: Documento[];
  }
  
export interface Domicilio {
    Calle?: string;
    IdEstado?: number;
    Estado?: string;
    IdMunicipio?: number;
    Municipio?: string;
    IdColonia: number;
    Colonia?: string;
    IdCodigoPostal: number;
    CodigoPostal?: string;
    DireccionInternacional?: string;
    Nota?: string;
  }
  
export interface Representantes {
    Representante?: string;
    Tipo?: string;
    Nota?: string;
    Activo: boolean;
  }
  
export interface Contacto {
    Tipo?: string;
    Contactos?: string;
    Nota?: string;
    Activo: boolean;
  }
  
export interface GirosComerciales {
    GiroComercial?: string;
    Activo?: boolean;
  }
  
export interface Inactivo {
    Observacion?: string;
    FechaInicio: Date;
    FechaFin: Date;
    FechaDiarioOficialFederacion: Date;
  }
  
export interface Documento {
    IdDocumentos: number;
    NombreDocumento?: string;
    TipoDocumento?: string;
    FechaCarga: Date;
  }