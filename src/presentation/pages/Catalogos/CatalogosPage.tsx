import type { CollapseProps } from 'antd';
import { Collapse } from "antd";
import { GiroComercialCatalogoComponent } from '../../components/Catalogos/GiroComercialCatalogoComponent';
import { EstatusProveedorBloqueadoComponent } from '../../components/Catalogos/EstatusProveedorBloqueadoComponent';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Estatus Proveedor Bloqueado',
      children: <EstatusProveedorBloqueadoComponent/>,
    },
    {
      key: '2',
      label: 'Giro Comercial',
      children: <GiroComercialCatalogoComponent/>,
    },
    {
      key: '55',
      label: 'This is panel header 2',
      children: <p>{text}</p>,
    },
    {
      key: '765',
      label: 'This is panel header 3',
      children: <p>{text}</p>,
    },
  ];

export const CatalogosPage = () => {
  return (
    <div
        className='container' 
        style={{ padding: '30px 0px 30px 0px' }}>
        <Collapse accordion items={items} />
    </div>
  )
}
