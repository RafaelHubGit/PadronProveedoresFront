

export interface IGiroComercial {
    IdGiroComercial: number;
    GiroComercial: string;
    IdUsuarioAlta: number;
    FechaAlta: Date;
    IdUsuarioModificacion: number | null;
    FechaModificacion: Date | null;
    Activo: boolean;
}