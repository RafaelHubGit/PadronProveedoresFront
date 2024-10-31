import InfiniteScroll from "react-infinite-scroll-component";
import { useProveedorTypeSenseStore } from "../../../stores/proveedores/proveedorTypeSense.store";
import {  useRef } from "react";
import { TableRow } from "./TableRow";


interface Props {
  sizePage: number;}


export const ProveedorTableComponent = ({ sizePage }: Props) => {
  const { proveedores, total } = useProveedorTypeSenseStore( state => state.proveedoresTS );
  const setNumPage = useProveedorTypeSenseStore( state => state.setNumPage );
  const numPage = useProveedorTypeSenseStore( state => state.numPage );
  const tableBodyRef = useRef<HTMLTableElement | null>(null);
  


  const fetchNext = async () => { //Al llegar al final del infinite scroll se ejecuta 
    setNumPage( numPage + 1 );
    console.log('se ejecua el FETCHNEXT');
  };
  




  // const scrollToRegistro = ( idx: number ) => {
  //   const tableBody = tableBodyRef.current;
  //   if (!tableBody) return;
  //   const filaEspecifica = document.getElementById(`idRow-${idx}`); // reemplaza con el ID de la fila deseada
  //   if (!filaEspecifica) return;
  //   console.log("DEBE DE MOVERSE AQWUI : ", idx);
  //   tableBody.scrollTo(0, filaEspecifica.offsetTop - tableBody.offsetTop);
  // }

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
                  scrollThreshold={0.99}
                  endMessage={
                      <tr>
                          <td colSpan={5} style={{ textAlign: 'center' }}>
                              <b>No hay mas que mostrar</b>
                          </td>
                      </tr>
                  }
            >
              {proveedores.map((p, idx) => (
                <TableRow 
                  // key={p.idProveedor} 
                  proveedor={p} 
                  idx={idx}
                  sizePage={ sizePage }
                  totalProveedores={ proveedores.length }

                />
              ))}
            </InfiniteScroll>
          </tbody>
        </table>

        <div className='bp__text d-flex justify-content-end pe-2'>
          <p>Se encontraron { total } registros, se muestran { proveedores.length }</p>
        </div>
    </div>
  )
}

