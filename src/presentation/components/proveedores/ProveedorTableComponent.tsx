import InfiniteScroll from "react-infinite-scroll-component";
import { useProveedorTypeSenseStore } from "../../../stores/proveedores/proveedorTypeSense.store";
import { useEffect, useRef, useState } from "react";


export const ProveedorTableComponent = () => {

  const isMounted = useRef(false); // SIrve para evaluar cuando se monta el componente y evitar que se ejecute la info mas de una vez en useeffect

  const getProveedorTypeSense = useProveedorTypeSenseStore( state => state.getProveedorTypeSense );
  const { proveedores, total } = useProveedorTypeSenseStore( state => state.proveedoresTS );
  
  const numPage = useProveedorTypeSenseStore( state => state.numPage );
  const setNumPage = useProveedorTypeSenseStore( state => state.setNumPage );
  const setCurrentPage = useProveedorTypeSenseStore( state => state.setCurrentPage );

  const tableBodyRef = useRef<HTMLTableElement | null>(null);
  const [currentRow, setCurrentRow] = useState<number | null>(null);


  // const currentPage = useProveedorTypeSenseStore( state => state.currentPage );



  const fetchNext = async () => { //Al llegar al final del infinite scroll se ejecuta 
    setNumPage( 1 );
    setCurrentPage( numPage );
  };


  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      setCurrentPage( numPage );
      return;
    }
    getProveedorTypeSense('*', numPage, 10).then(() => {
      const { inicio, fin } = calcularRangoRegistros(numPage, 10, proveedores.length);
      console.log({ inicio, fin });
      // scrollToRegistro(inicio);
    });
  }, [numPage, getProveedorTypeSense]);


  const calcularRangoRegistros = (numPagina: number, registrosPorPagina: number, totalRegistros: number) => {
    const inicio = (numPagina - 1) * registrosPorPagina + 1;
    const calculoFin = inicio + ( registrosPorPagina - 1 );
    const  fin = (calculoFin > totalRegistros) ? calculoFin : totalRegistros;
    return { inicio, fin };
  }

  const scrollToRegistro = ( idx: number ) => {
    const tableBody = tableBodyRef.current;
    if (!tableBody) return;
    const filaEspecifica = document.getElementById(`idRow-${idx}`); // reemplaza con el ID de la fila deseada
    if (!filaEspecifica) return;
    console.log("DEBE DE MOVERSE AQWUI : ", idx);
    tableBody.scrollTo(0, filaEspecifica.offsetTop - tableBody.offsetTop);
  }
  

  return (
    <div className="bp__table-proveedor-container">
        
        <table className="table table-hover align-middle fixed_header">
          <thead className="table-secondary">
            <tr>
              <th scope="col"># Proveedor</th>
              <th scope="col">RFC</th>
              <th scope="col">Razón Social</th>
              <th scope="col">Activo</th>
            </tr>
          </thead>
          {/* <tbody id="scrollableTbody" className='table-group-divider' style={{ height: `calc(85vh - ${5000}px)`, overflow: 'auto' }}> */}
          <tbody 
            id="scrollableTbody" 
            ref={tableBodyRef} 
            className='table-group-divider' 
            style={{ height: '157px', overflow: 'auto' }}
          >
            <InfiniteScroll
                  dataLength={proveedores.length}
                  next={ fetchNext }
                  hasMore={ true } //le dice si hay mas o ya no
                  loader={<tr><td colSpan={5}>Cargando información...</td></tr>}
                  scrollableTarget="scrollableTbody"
                  scrollThreshold={0.9}
                  endMessage={
                      <tr>
                          <td colSpan={5} style={{ textAlign: 'center' }}>
                              <b>No hay mas que mostrar</b>
                          </td>
                      </tr>
                  }
            >
              {proveedores.map((p, idx) => (
                  <tr
                      id={`idRow-${idx}`}
                      key={p.idProveedor}
                      // onDoubleClick={() => handleRowClick(p)}
                      style={{ cursor: 'pointer' }}
                      className="fadeIn"
                      // data-bs-toggle="tooltip" data-bs-placement="top" title={p.observaciones ? p.observaciones : ""}
                  >
                      <th scope="row"> {idx}- {p.numeroProveedor} </th>
                      <td> {p.rfc} </td>
                      <td> {p.razonSocial} </td>
                      <td>
                          {
                              p.activo ?
                                  <span className="badge text-bg-success">Activo</span>
                                  :
                                  <span className="badge text-bg-danger">Inactivo</span>
                          }
                      </td>
                      {/* <td>  </td> */}
                  </tr>
                )
              )}
            </InfiniteScroll>
          </tbody>
        </table>

        <div className='bp__text d-flex justify-content-end pe-2'>
          <p>Se encontraron { total } registros, se muestran { proveedores.length }</p>
        </div>
    </div>
  )
}

