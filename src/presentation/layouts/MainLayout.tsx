import { Outlet } from 'react-router-dom'
import { HeaderComponent } from '../components/header/HeaderComponent'

export const MainLayout = () => {
  return (
    <div className='ml-container'>
      <div className='ml__header-container'>
        <div className='ml__header'>
          <HeaderComponent/>
        </div>
        {/* <div className='ml__menu'>menu</div> */}
      </div>
        
        <Outlet/>

      <div className='ml__footer'>
        <p>
          Sistema de Padrón de Proveedores vx.x.x Senado de la República todos los derechos reservados.
        </p>
      </div>
    </div>
  )
}
