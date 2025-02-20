

export interface IProveedorTypeSense {
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

export interface IProveedoresTypeSenseApi {
  Document: IProveedorTypeSense,
  Highlights: IHighlightsApi[]
}

export interface IProveedoresTypeSense {
  proveedor: IProveedorTypeSense,
  highlights: IHighlights[]
}
export interface IProveedoresTS {
  proveedores: IProveedoresTypeSense[];
  total: number,
  mostrados: number
}

export interface IHighlights {
  field : string, 
  matched_tokens: string[],
  snippets: string[]
}

export interface IHighlightsApi {
  field : string, 
  matched_tokens: string[],
  snippets?: string[],
  snippet?: string
}