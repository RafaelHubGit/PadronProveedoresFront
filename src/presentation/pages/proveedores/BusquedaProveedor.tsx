


import { useProveedorTypeSenseStore } from "../../../stores/proveedores/proveedorTypeSense.store";
import { PaginationComponent } from "../../components/generalComponents/PaginationComponent";
import { ProveedorTableComponent } from "../../components/proveedores/ProveedorTableComponent"


export const BusquedaProveedor = () => {

  const getProveedorTypeSense = useProveedorTypeSenseStore( state => state.getProveedorTypeSense );
  const numPage = useProveedorTypeSenseStore( state => state.numPage );
  const maxPage = useProveedorTypeSenseStore( state => state.maxPage );
  const setNumPage = useProveedorTypeSenseStore( state => state.setNumPage );

  const currentPage = useProveedorTypeSenseStore( state => state.currentPage );

  const handleCurrentPage = ( page: number ) => {
    // if ( page > numPage ){
    //   setNumPage( page );
    // }
  }

  return (
    <div className="bp__container">
      <div className="bp__tools d-flex justify-content-end">
        <button onClick={ () => getProveedorTypeSense( '*', 1, 100 ) } type="button" className="btn btn-outline-success me-4">Success</button>
        <button type="button" className="btn btn-outline-danger me-4">Danger</button>

        <div
          className="input-group mb-0"
          style={{ width: '50%'}}
        >
          <input type="text" className="form-control" placeholder="Busqueda de Proveedores" aria-label="Recipient's username" aria-describedby="button-addon2" />
          <button
            className="btn btn-outline-primary"
            type="button"
            id="button-addon2"
            style={{ display: 'flex' }}
          >
            <span className="material-symbols-outlined me-1">
             search
            </span>
            Buscar
          </button>
        </div>
      </div>

      <div className="mb-2">
        <button type="button" className="btn btn-outline-success">Nuevo</button>
      </div>

      <div>
        <ProveedorTableComponent />
      </div>


      <PaginationComponent
        currentPage={currentPage}
        maxPage={ maxPage }
        handlePage={ handleCurrentPage }
      />
    </div>
  )
}
