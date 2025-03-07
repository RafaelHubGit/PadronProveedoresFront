import { Collapse, CollapseProps } from "antd";
import { CatalogoGenericoComponent } from "../../components/Catalogos/CatalogoGenericoComponent";
import { ICatalogoConfig } from "../../../interfaces/CatalogoConfig.interfaces";
import { useReporteConfigStore } from "../../../stores/reportes configuracion/reportesConfig.store";
import { ICatReportesFirmantes, ICatReportesLeyendas, ICatReportesLogos } from "../../../interfaces/ReportesConfig.interfaces";
import { catReportesFirmantesTableConfig } from "../../components/ReportesConfig/CatReportesFirmantesTableConfig";
import { CatalogosAPI } from "../../../services/catalogosAPI.service";
import { catReportesLeyendasTableConfig } from "../../components/ReportesConfig/CatReportesLeyendasTableConfig";
import { CatReportesLogosTableConfig } from "../../components/ReportesConfig/CatReportesLogosTableConfig";

export const ConfiguracionDeReportesPage = () => {

  const reportesFirmantes = useReporteConfigStore(state => state.reportesFirmantes);
  const reportesLeyendas = useReporteConfigStore(state => state.reportesLeyendas);
  const reportesLogos = useReporteConfigStore(state => state.reportesLogos);




  const loadingReportesFirmantes = useReporteConfigStore(state => state.loading.reportesFirmantes);
  const loadingReportesLeyendas = useReporteConfigStore(state => state.loading.reportesLeyendas);
  const loadingReportesLogos = useReporteConfigStore(state => state.loading.reportesLogos);




  const getReportesFirmantes = useReporteConfigStore(state => state.getReportesFirmantes);
  const getReportesLeyendas = useReporteConfigStore(state => state.getReportesLeyendas);
  const getReportesLogos = useReporteConfigStore(state => state.getReportesLogos);




  const catalogosConfig: ICatalogoConfig<any>[] = [
    {
      label: 'Reportes Firmantes',
      storeHook: () => reportesFirmantes as ICatReportesFirmantes[],
      loadingHook: () => loadingReportesFirmantes ?? false,
      fetchData: () => getReportesFirmantes(),
      apiService: new CatalogosAPI<ICatReportesFirmantes>("CatReportesFirmantes"),
      tableConfig: catReportesFirmantesTableConfig,
      keyField: "idReportesFirmantes",
    },
    {
      label: 'Reportes Leyendas',
      storeHook: () => reportesLeyendas as ICatReportesLeyendas[],
      loadingHook: () => loadingReportesLeyendas ?? false,
      fetchData: () => getReportesLeyendas(),
      apiService: new CatalogosAPI<ICatReportesLeyendas>("CatReportesLeyendas"),
      tableConfig: catReportesLeyendasTableConfig,
      keyField: "idReportesLeyendas",
    },
    {
      label: 'Reportes Logos',
      storeHook: () => reportesLogos as ICatReportesLogos[],
      loadingHook: () => loadingReportesLogos ?? false,
      fetchData: () => getReportesLogos(),
      apiService: new CatalogosAPI<ICatReportesLogos>("CatReportesLogos"),
      tableConfig: CatReportesLogosTableConfig,
      keyField: "idReportesLogos",
    }
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
