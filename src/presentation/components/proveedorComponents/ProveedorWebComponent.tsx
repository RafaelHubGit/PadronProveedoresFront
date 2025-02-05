
import MaterialTable, { Column } from "@material-table/core";
import { useState } from "react";

interface DataRow {
    name: string;
    surname: string;
    birthYear: number;
    birthCity: number;
  }

export const ProveedorWebComponent = () => {

    const [columns] = useState<Column<DataRow>[]>([
        { title: 'Name', field: 'name' },
        // { title: 'Surname', field: 'surname', initialEditValue: 'initial edit value' },
        // { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        // {
        //   title: 'Birth Place',
        //   field: 'birthCity',
        //   lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        // },
      ]);
    
      const [data, setData] = useState<DataRow[]>([
        { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
        { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
      ]);
  return (
    <div>
        
        <MaterialTable
        title="Página web"
        columns={columns}
        data={data}
        options={{
            tableLayout: 'auto',
            search: false, // Oculta el campo de búsqueda
            paging: false, // Oculta la paginación
            toolbar: true, // Oculta la barra de herramientas
            showTitle: true,
            header: false,
        }}
        style={{
            boxShadow: 'none', // Quita la sombra alrededor de la tabla
            border: 'none',     // Quita el borde
          }}
        editable={{
            onRowAdd: (newData) =>
            new Promise((resolve) => {
                setTimeout(() => {
                setData([...data, newData]);
                resolve( undefined );
                }, 1000)
            }),
            onRowUpdate: (newData) =>
            new Promise((resolve) => {
                setTimeout(() => {
                const dataUpdate = [...data];
                const index = dataUpdate.indexOf( newData )
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
                resolve( undefined );
                }, 1000)
            }),
            onRowDelete: (oldData) =>
            new Promise((resolve) => {
                setTimeout(() => {
                const dataDelete = [...data];
                const index = dataDelete.indexOf( oldData )
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                resolve( undefined );
                }, 1000)
            }),
        }}
        />
        
    </div>
  )
}
