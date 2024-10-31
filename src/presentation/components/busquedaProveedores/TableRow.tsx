import { useInView } from "react-intersection-observer";
import { calculaPagina, calcularRangoRegistros } from "../../../helpers";
import { ProveedorTypeSense } from "../../../interfaces/proveedorTypeSense.interface";
import { useEffect } from "react";
import { useProveedorTypeSenseStore } from "../../../stores/proveedores/proveedorTypeSense.store";
import { useNavigate } from "react-router-dom";


interface Props {
  proveedor: ProveedorTypeSense,
  idx: number,
  sizePage: number, 
  totalProveedores: number
}

export const TableRow = ({ proveedor, idx, sizePage, totalProveedores }: Props) => {
  const navigate = useNavigate();

  const setCurrentPage = useProveedorTypeSenseStore( state => state.setCurrentPage );
  const currentPage = useProveedorTypeSenseStore( state => state.currentPage );

  

  const handleDblClick = ( numeroProveedor: string ) => {
    navigate(`/inicio/proveedor/${numeroProveedor}/proveedorLyt`);
  }
    const { ref, inView } = useInView({
      threshold: 1, // Umbral de visibilidad (0-1)
    });
  
    useEffect(() => {
      if (inView) { //FIXME Corregir por que los registros que se agregan con el idx menor al sizePage no se muestran aqui
        console.log(`La fila con id ${idx} está visible`);

        // Calcula la pagina y la settea para que el componente de paginacion de actualice
        const pagina =  calculaPagina( idx, sizePage );
        if ( currentPage !== pagina ){ 
            setCurrentPage(pagina)
        }

        
      }
    }, [inView]);

    const aplicarRef = ( idx: number) => {
      const page = calculaPagina( idx, sizePage );
      const {inicio, fin} = calcularRangoRegistros( page, sizePage, totalProveedores  );
      
      if ( idx === (inicio + 2 ) || idx === (fin - 2) ){
        return true;
      } 
      return false;
      
    }
  //Aplica la referencia cada sizePage
  
    return (
      <tr
        id={`idRow-${idx}`}
        key={idx + 1}
        // ref={ref}
        ref={aplicarRef(idx) ? ref : null} 
        style={{ cursor: 'pointer' }}
        className="fadeIn"
        onDoubleClick={ () => handleDblClick( proveedor.numeroProveedor ) }
      >
        <th scope="row"> {idx}- {proveedor.numeroProveedor} </th>
        <td> {proveedor.rfc} </td>
        <td> {proveedor.razonSocial} </td>
        <td>
          {
            proveedor.activo ?
              <span className="badge text-bg-success">Activo</span>
              :
              <span className="badge text-bg-danger">Inactivo</span>
          }
        </td>
      </tr>
    );
  };