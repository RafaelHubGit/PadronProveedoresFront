


import { useEffect, useRef, useState } from "react";
import { useProveedorTypeSenseStore } from "../../../stores/proveedores/proveedorTypeSense.store";
import { PaginationComponent } from "../../components/generalComponents/PaginationComponent";
import { ProveedorTableComponent } from "../../components/busquedaProveedores/ProveedorTableComponent"


const sizePage = 50;

export const BusquedaProveedor = () => {

  const isMounted = useRef(false);
  const getProveedorTypeSense = useProveedorTypeSenseStore( state => state.getProveedorTypeSense );
  const currentPage = useProveedorTypeSenseStore( state => state.currentPage );
  const setCurrentPage = useProveedorTypeSenseStore( state => state.setCurrentPage );
  const numPage = useProveedorTypeSenseStore( state => state.numPage );
  const setNumPage = useProveedorTypeSenseStore( state => state.setNumPage );
  const maxPage = useProveedorTypeSenseStore( state => state.maxPage );


  const [searchText, setSearchText] = useState("*");
  const lastSearchTerm = useRef("");


  useEffect(() => { //La primera vez que entra al componente realiza la busqueda 
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    console.log("EJECUTA EL NUMPAGE  : ", numPage);
    
    getProveedorTypeSense(searchText,lastSearchTerm.current, 1, sizePage).then(() => {//FIXME al entrar aqui, el scroll debe de posicionarse en el proveedor automaticamente
      // const { inicio, fin } = calcularRangoRegistros(numPage, sizePage, proveedores.length);
      // console.log({ inicio, fin });
      // scrollToRegistro(inicio);
      // setCurrentPage( numPage );
      lastSearchTerm.current = searchText;
    });
  }, [numPage]);


  const handleSearchBtn = ( ) => { //Se encarga de l bototn de busqueda 
    const updatedSearchText = searchText === '' ? '*' : searchText;
    setSearchText(updatedSearchText); // Actualiza el estado de searchText
    setNumPage(1);
    setCurrentPage(1);
    
    
    // Llama a getProveedorTypeSense con el nuevo texto de búsqueda
    getProveedorTypeSense(updatedSearchText, lastSearchTerm.current, 1, sizePage).then(() => {
      lastSearchTerm.current = updatedSearchText; // Actualiza el último término de búsqueda
    });
  }

  const handleCurrentPage = ( page: number ) => { //TODO Corregir, si se da click en la paginacion debe mostrar la informacion
    console.log(page);
    // if ( page > numPage ){
    //   setNumPage( page );
    // }
  }

  
  return (
    <div className="bp__container">
      <div className="bp__tools d-flex justify-content-end">
        <button  type="button" className="btn btn-outline-success me-4">Success</button>
        <button type="button" className="btn btn-outline-danger me-4">Danger</button>

        <div
          className="input-group mb-0"
          style={{ width: '50%'}}
        >
          <input 
            type="text" 
            className="form-control" 
            placeholder="Busqueda de Proveedores" 
            aria-label="Busqueda de Proveedores" 
            aria-describedby="button-addon2" 
            value={ searchText }
            onChange={ ( e ) => setSearchText( e.target.value ) }
          />
          <button
            className="btn btn-outline-primary"
            type="button"
            id="button-addon2"
            style={{ display: 'flex' }}
            onClick={ () => handleSearchBtn() }
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
        <ProveedorTableComponent
          sizePage={ sizePage }
        />
      </div>


      <PaginationComponent
        currentPage={currentPage}
        maxPage={ maxPage }
        handlePage={ handleCurrentPage }
      />
    </div>
  )
}
