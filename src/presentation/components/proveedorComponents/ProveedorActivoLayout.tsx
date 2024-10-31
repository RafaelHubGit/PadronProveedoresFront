import { CardGeneral } from "../generalComponents/CardGeneralComponent"
import { ProveedorContactosComponent } from "./ProveedorContactosComponent"
import { ProveedorDireccionComponent } from "./ProveedorDireccionComponent"
import { ProveedorDocumentos } from "./ProveedorDocumentos"
import { ProveedorInactivoComponent } from "./ProveedorInactivoComponent"
import { ProveedorInformacionGeneralComponent } from "./ProveedorInformacionGeneralComponent"
import { ProveedorRepresentantesComponent } from "./ProveedorRepresentantesComponent"

export const ProveedorActivoLayout = () => {
  return (
    <div className="mt-4 mb-5">
        <div>
            <CardGeneral
                title="Información General"
            >
                <ProveedorInformacionGeneralComponent />
            </CardGeneral>
        </div>
        <div className="mt-5 row">
            <div className="col-6 col-sm-12 col-md-6">
                <CardGeneral
                    title="Dirección"
                >
                    <ProveedorDireccionComponent />
                </CardGeneral>
            </div>
            <div className="col-6 col-sm-12 col-md-6 mt-sm-5 mt-md-0">
                <CardGeneral
                    title="Documentos"
                >
                    <ProveedorDocumentos />
                </CardGeneral>
            </div>
        </div>
        <div className="mt-5 row">
            <div className="col-6 col-sm-12 col-md-6">
                <CardGeneral
                    title="Representantes"
                >
                    <ProveedorRepresentantesComponent />
                </CardGeneral>
            </div>
            <div className="col-6 col-sm-12 col-md-6 mt-sm-5 mt-md-0">
                <CardGeneral
                 title="Contactos"
                 >
                    <ProveedorContactosComponent />
                 </CardGeneral>
            </div>
        </div>
        <div className="mt-5">
            <CardGeneral 
                title="Inactivar"
                className='cardGeneral-red'
            >
                <ProveedorInactivoComponent />
            </CardGeneral>
        </div>

    </div>
  )
}
