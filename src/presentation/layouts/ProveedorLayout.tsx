import { ProveedorActionBarComponent } from "../components/proveedorComponents/ProveedorActionBarComponent"
import { ProveedorNavigation } from "../components/proveedorComponents/ProveedorNavigation"
import { ProveedorEncabezadoComponent } from "../components/proveedorComponents/ProveedorEncabezadoComponent"


export const ProveedorLayout = () => {
  return (
    <div className="ps-4 pe-4">
        <div>
            <ProveedorActionBarComponent />
        </div>
        <div>
            <ProveedorEncabezadoComponent />
        </div>
        <div>
            <ProveedorNavigation />
        </div>
    </div>
  )
}
