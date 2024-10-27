

export interface ProveedorTypeSense {
    idProveedor: number;
    rfc: string;
    razonSocial: string;
    fechaAlta: string;
    activo: boolean;
    numeroProveedor: string;
  
    numeroRefrendo?: string[];
    tipoProveedor?: string[];
    observaciones?: string[];
    esRepse?: boolean[];
    tieneDocumentos?: boolean[];
  
    Direccion?: string;
    DireccionInternacional?: string;
  
    representante?: string[];
    contactos?: string[];
    girosComerciales?: string[];
    documentos?: string[];
  
    inactivoObservacion?: string;
    inactivoFechaInicio?: string;
    inactivoFechaFin?: string;
    inactivoFechaDOF?: string;
  }