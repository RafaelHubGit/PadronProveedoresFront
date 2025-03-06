import { CatalogosAPI } from "../services/catalogosAPI.service";

export type ICatalogoConfig<T> = {
    label: string;
    storeHook: () => T[];
    loadingHook: () => boolean;
    fetchData: () => void;
    apiService: CatalogosAPI<T>;
    tableConfig: any;
    keyField: string;
  };