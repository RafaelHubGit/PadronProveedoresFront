import type { CollapseProps } from 'antd';
import { Collapse } from "antd";

import { IGiroComercial, ICatEstatusProveedorBloqueado, ICatEstratificacion, ICatGenero, ICatTipoContacto, ICatTipoEntidad, ICatTipoProveedor, ICatMatrizArticulosFracciones } from "../../../interfaces/Catalogos.interface";
import { useCatalogosStore } from '../../../stores/catalogos/catalogos.store';
import { CatalogosAPI } from '../../../services/catalogosAPI.service';
import { GiroComercialTableConfig  } from '../../components/Catalogos/GiroComercialTableConfig';

import { CatalogoGenericoComponent } from '../../components/Catalogos/CatalogoGenericoComponent';
import { catEstatusProveedorBloqueadoTableConfig } from '../../components/Catalogos/EstatusProveedorBloqueadoTableConfig';
import { EstratificacionTableConfig } from '../../components/Catalogos/EstratificacionTableConfig';
import { GeneroTableConfig } from '../../components/Catalogos/GeneroTableConfig';
import { TipoContactoTableConfig } from '../../components/Catalogos/TipoContactoTableConfig';
import { TipoEntidadTableConfig } from '../../components/Catalogos/TipoEntidadTableConfig';
import { TipoProveedorTableConfig } from '../../components/Catalogos/TipoProveedorTableConfig';
import { catMatrizArticulosFraccionesInit } from '../../../stores/catalogos/initialState';
import { MatrizArticulosFraccionesTableConfig } from '../../components/Catalogos/MatrizArticulosFraccionesTableConfig';



type CatalogoConfig<T> = {
  label: string;
  storeHook: () => T[];
  loadingHook: () => boolean;
  fetchData: () => void;
  apiService: CatalogosAPI<T>;
  tableConfig: any;
  keyField: string;
};


export const CatalogosPage = () => {

  const articulosFracciones = useCatalogosStore( state => state.matrizArticulosFracciones);
  const estatusProveedorBloqueado = useCatalogosStore( state => state.estatusProveedorBloqueado);
  const girosComerciales = useCatalogosStore( state => state.girosComerciales);
  const estratificacion = useCatalogosStore( state => state.estratificacion);
  const genero = useCatalogosStore(state => state.genero);
  const tipoContacto = useCatalogosStore(state => state.tipoContacto);
  const tipoEntidad = useCatalogosStore(state => state.tipoEntidad);
  const tipoProveedor = useCatalogosStore(state => state.tipoProveedor);




  const loadingArticulosFracciones = useCatalogosStore(state => state.loading.matrizArticulosFracciones);
  const loadingEstatusProveedorBloqueado = useCatalogosStore(state => state.loading.estatusProveedorBloqueado);
  const loadingGirosComerciales = useCatalogosStore(state => state.loading.estatusProveedorBloqueado);
  const loadingEstratificacion = useCatalogosStore(state => state.loading.estratificacion);
  const loadingGenero = useCatalogosStore(state => state.loading.genero);
  const loadingTipoContacto = useCatalogosStore(state => state.loading.tipoContacto);
  const loadingTipoEntidad = useCatalogosStore(state => state.loading.tipoEntidad);
  const loadingTipoProveedor = useCatalogosStore(state => state.loading.tipoProveedor);




  const getArticulosFracciones = useCatalogosStore( state => state.getMatrizArticulosFracciones );
  const getEstatusProveedorBloqueado = useCatalogosStore( state => state.getAllEstatusProveedorBloqueado );
  const getGirosComerciales = useCatalogosStore( state => state.getAllGirosComerciales );
  const getEstratificacion = useCatalogosStore( state => state.getEstratificacion );
  const getGenero = useCatalogosStore(state => state.getGenero);
  const getTipoContacto = useCatalogosStore(state => state.getTipoContacto);
  const getTipoEntidad = useCatalogosStore(state => state.getTipoEntidad);
  const getTipoProveedor = useCatalogosStore(state => state.getTipoProveedor);




  const catalogosConfig: CatalogoConfig<any>[] = [
    {
      label: 'Artículos y Fracciones',
      storeHook: () => articulosFracciones as ICatMatrizArticulosFracciones[],
      loadingHook: () => loadingArticulosFracciones ?? false,
      fetchData: () => getArticulosFracciones(),
      apiService: new CatalogosAPI<ICatMatrizArticulosFracciones>("CatMatrizArticulosFracciones"),
      tableConfig: MatrizArticulosFraccionesTableConfig,
      keyField: "idMatrizArticulosFracciones",
    },
    {
      label: 'Estatus Proveedor Bloqueado',
      storeHook: () => estatusProveedorBloqueado as ICatEstatusProveedorBloqueado[],
      loadingHook: () => loadingEstatusProveedorBloqueado ?? false,
      fetchData: () => getEstatusProveedorBloqueado(),
      apiService: new CatalogosAPI<ICatEstatusProveedorBloqueado>("CatEstatusProveedorBloqueado"),
      tableConfig: catEstatusProveedorBloqueadoTableConfig,
      keyField: "idEstatusProveedorBloqueado",
    },
    {
      label: 'Giros Comerciales',
      storeHook: () => girosComerciales as IGiroComercial[],
      loadingHook: () => loadingGirosComerciales ?? false,
      fetchData: () => getGirosComerciales(),
      apiService: new CatalogosAPI<IGiroComercial>("CatGiroComercial"),
      tableConfig: GiroComercialTableConfig,
      keyField: "idGiroComercial",
    },
    {
      label: 'Estratificación',
      storeHook: () => estratificacion as ICatEstratificacion[],
      loadingHook: () => loadingEstratificacion ?? false,
      fetchData: () => getEstratificacion(),
      apiService: new CatalogosAPI<ICatEstratificacion>("CatEstratificacion"),
      tableConfig: EstratificacionTableConfig,
      keyField: "IdEstratificacion",
    },
    {
      label: 'Género',
      storeHook: () => genero as ICatGenero[],
      loadingHook: () => loadingGenero ?? false,
      fetchData: () => getGenero(),
      apiService: new CatalogosAPI<ICatGenero>("CatGenero"),
      tableConfig: GeneroTableConfig,
      keyField: "idGenero",
      },
      {
        label: 'Tipo Contacto',
        storeHook: () => tipoContacto as ICatTipoContacto[],
        loadingHook: () => loadingTipoContacto ?? false,
        fetchData: () => getTipoContacto(),
        apiService: new CatalogosAPI<ICatTipoContacto>("CatTipoContacto"),
        tableConfig: TipoContactoTableConfig,
        keyField: "idTipoContacto",
      },
      {
        label: 'Tipo Persona Juridica',
        storeHook: () => tipoEntidad as ICatTipoEntidad[],
        loadingHook: () => loadingTipoEntidad ?? false,
        fetchData: () => getTipoEntidad(),
        apiService: new CatalogosAPI<ICatTipoEntidad>("CatTipoEntidad"),
        tableConfig: TipoEntidadTableConfig,
        keyField: "idTipoEntidad",
      },
      {
        label: 'Tipo Proveedor',
        storeHook: () => tipoProveedor as ICatTipoProveedor[],
        loadingHook: () => loadingTipoProveedor ?? false,
        fetchData: () => getTipoProveedor(),
        apiService: new CatalogosAPI<ICatTipoProveedor>("CatTipoProveedor"),
        tableConfig: TipoProveedorTableConfig,
        keyField: "idTipoProveedor",
      },
  ];
  
  const items: CollapseProps['items'] = catalogosConfig.map((config, idx) => ({
    // key: config.key,
    key: idx,
    label: config.label,
    children: (
      <CatalogoGenericoComponent
                storeHook={config.storeHook}
                loadingHook={config.loadingHook}
                fetchData={config.fetchData}
                apiService={config.apiService}
                tableConfig={config.tableConfig}
                keyField={config.keyField}
              />
    ),
  }));

  return (
    <div
        className='container' 
        style={{ padding: '30px 0px 30px 0px' }}>
        <Collapse accordion items={items} />
    </div>
  )
}
