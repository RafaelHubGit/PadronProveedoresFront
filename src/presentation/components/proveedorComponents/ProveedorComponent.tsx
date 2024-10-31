import { Link, Outlet } from "react-router-dom"
import { useProveedorStore } from "../../../stores/proveedores/proveedores.store"
import { useEffect, useState } from "react";
import { DatosProveedor as DatosProveedorInterface } from "../../../interfaces/Proveedor.interface";



export const ProveedorComponent = () => {

    const proveedor = useProveedorStore( state => state.proveedor);

    const [datosProveedor, setDatosProveedor] = useState<DatosProveedorInterface | null>(null);

    useEffect(() => {
        console.log('PROVEEDOR : ', proveedor);
      if ( !proveedor?.DatosProveedores ){
        return;
      }
      setDatosProveedor( proveedor.DatosProveedores[0] );
    }, [proveedor])
    

  return (
    <div className="proveedor-detalle-container container-md mt-4 ">
      {/* <ReturnBarComponent
        urlReturn="/home/busqueda"
        showGuardarBtn={proveedor?.Activo === true ? true : false}
        titleBtn="Actualizar"
      /> */}

      <div className="header-container mb-4">
        <div
          className={`proveedor-data ${!proveedor?.Activo ? 'proveedor-data-red-text' : ''}`}
        >
          <p className="nombre-proveedor">{ proveedor?.RazonSocial }</p>
          <p className="numero-proveedor">
            No. Proveedor: {proveedor?.NumeroProveedor}
          </p>
          <p className="rfc">RFC: RFC</p>
          <p className="refrendo">Refrendo: { datosProveedor?.NumeroRefrendo }</p>
        </div>
        <div className="proveedor-status">
          <div className="status-toggle mb-2">
            <div className="form-check form-switch custom-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                checked={proveedor?.Activo === true} // Asumiendo que 'activo' es 1 o 0
                // onChange={handleCheckboxChange}  // Manejador para cambios en el checkbox
              />
            </div>
            <div>
              {proveedor?.Activo ? (
                <span className="badge text-bg-success">Activo</span>
              ) : (
                <span className="badge text-bg-danger">Inactivo</span>
              )}
            </div>
          </div>
          {/* <div className='inactive-detail-button'>
                                        <button type="button" className="btn btn-danger"> Ver detalle inactividad </button>
                                </div> */}
        </div>
      </div>

      <div className="body-container">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link
              className={`nav-link ${location.pathname === '/home/proveedorInfo' ? 'active' : ''}`}
              to="proveedorInfo"
            >
              Actual
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${location.pathname === '/home/refrendos' ? 'active' : ''}`}
              to="refrendos"
            >
              Refrendos
            </Link>
          </li>
        </ul>

        <Outlet/>
      </div>
    </div>
  )
}
