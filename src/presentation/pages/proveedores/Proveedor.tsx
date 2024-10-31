import { Outlet, useParams } from "react-router-dom"
import { useProveedorStore } from "../../../stores/proveedores/proveedores.store"
import { useEffect } from "react";

export const Proveedor = () => {
    const { numeroProveedor } = useParams();


    const proveedor = useProveedorStore( state => state.proveedor );
    const getProveedorByNumeroProveedor = useProveedorStore( state => state.getProveedorByNumeroProveedor);


    useEffect(() => {
        getProveedorByNumeroProveedor( String(numeroProveedor) );
    }, []);

    useEffect(() => {
        // console.log(proveedor);
    }, [proveedor])



  return (
    <div>
        <Outlet />
    </div>
  )
}
