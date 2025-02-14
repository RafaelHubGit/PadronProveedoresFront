

export interface IGiroComercial {
    idGiroComercial: number;
    giroComercial: string;
    idUsuarioAlta: number;
    fechaAlta: Date;
    idUsuarioModificacion: number | null;
    fechaModificacion: Date | null;
    activo: boolean;
}