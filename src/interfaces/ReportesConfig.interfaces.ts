

export interface ICatReportesFirmantes {
    idReportesFirmantes: number;
    nombre: string;
    cargo: string;
    prefijo: string | null;
    idUsuarioAlta: number;
    fechaAlta: Date;
    idUsuarioModificacion: number | null;
    fechaModificacion: Date | null;
    activo: boolean;
}
  
export interface ICatReportesLeyendas {
    idReportesLeyendas: number;
    leyenda: string;
    idUsuarioAlta: number;
    fechaAlta: Date;
    idUsuarioModificacion: number | null;
    fechaModificacion: Date | null;
    activo: boolean;
}
  
export interface ICatReportesLogos {
    idReportesLogos: number;
    nombre: string;
    descripcion: string | null;
    idUsuarioAlta: number;
    fechaAlta: Date;
    idUsuarioModificacion: number | null;
    fechaModificacion: Date | null;
    activo: boolean;
}
  