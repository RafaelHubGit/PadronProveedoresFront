import { ICatReportesFirmantes, ICatReportesLeyendas, ICatReportesLogos } from "../../interfaces/ReportesConfig.interfaces";

export const catReportesFirmantesInit: ICatReportesFirmantes[] = [
  {
    idReportesFirmantes: 0,
    nombre: '',
    cargo: '',
    prefijo: null,
    idUsuarioAlta: 0,
    fechaAlta: new Date(),
    idUsuarioModificacion: null,
    fechaModificacion: null,
    activo: true,
  }
];

export const catReportesLeyendasInit: ICatReportesLeyendas[] = [
  {
    idReportesLeyendas: 0,
    leyenda: '',
    idUsuarioAlta: 0,
    fechaAlta: new Date(),
    idUsuarioModificacion: null,
    fechaModificacion: null,
    activo: true,
  }
];

export const catReportesLogosInit: ICatReportesLogos[] = [
  {
    idReportesLogos: 0,
    nombre: '',
    descripcion: null,
    idUsuarioAlta: 0,
    fechaAlta: new Date(),
    idUsuarioModificacion: null,
    fechaModificacion: null,
    activo: true,
  }
];
