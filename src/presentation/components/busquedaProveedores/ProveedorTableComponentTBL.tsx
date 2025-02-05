import { createTable  } from '@tanstack/react-table';
import InfiniteScroll from "react-infinite-scroll-component";
import { useProveedorTypeSenseStore } from "../../../stores/proveedores/proveedorTypeSense.store";
// import {  useRef } from "react";
import { TableRow } from "./TableRow";


interface Props {
  sizePage: number;}


export const ProveedorTableComponent = ({ sizePage }: Props) => {
  const { proveedores, total } = useProveedorTypeSenseStore( state => state.proveedoresTS );
  const setNumPage = useProveedorTypeSenseStore( state => state.setNumPage );
  const numPage = useProveedorTypeSenseStore( state => state.numPage );
  // const tableBodyRef = useRef<HTMLTableElement | null>(null);

  const table = createTable()
    .setOptions({
      data: proveedores,
      columns: [
        { header: '# Proveedor', accessorKey: 'idProveedor' },
        { header: 'RFC', accessorKey: 'rfc' },
        { header: 'Razón Social', accessorKey: 'razonSocial' },
        { header: 'Activo', accessorKey: 'activo' },
        { header: 'Acción', accessorKey: 'accion' },
      ],
      state: {
        pageIndex: 0,
        pageSize: sizePage,
      },
    });

 

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  


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
        
        <table {...getTableProps()} className="table table-hover align-middle fixed_header">
          <thead className="table-secondary">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className='table-group-divider' style={{ height: '157px', overflow: 'auto' }}>
            <InfiniteScroll
              dataLength={rows.length}  // Usamos rows de TanStack Table
              next={fetchNext}
              hasMore={rows.length < total}  // Actualiza la condición de "hasMore" si es necesario
              loader={<tr><td colSpan={5}>Cargando información...</td></tr>}
              scrollableTarget="scrollableTbody"
              scrollThreshold={0.99}
              endMessage={
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center' }}>
                    <b>No hay más que mostrar</b>
                  </td>
                </tr>
              }
            >
              {rows.map(row => {
                prepareRow(row);
                return (
                  <TableRow
                    key={row.id}  // Cambia esto a row.id para asegurar que cada fila tenga una clave única
                    proveedor={row.original}  // Utiliza row.original para obtener los datos completos
                    idx={row.index}
                    sizePage={sizePage}
                    totalProveedores={rows.length}
                  />
                );
              })}
            </InfiniteScroll>
          </tbody>
        </table>

        <div className='bp__text d-flex justify-content-end pe-2'>
          <p>Se encontraron { total } registros, se muestran { proveedores.length }</p>
        </div>
    </div>
  )
}

