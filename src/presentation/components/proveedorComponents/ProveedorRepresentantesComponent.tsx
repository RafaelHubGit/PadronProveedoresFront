import { ActionButtonsTableComponent } from "../generalComponents/ActionButtonsTableComponent"


export const ProveedorRepresentantesComponent = () => {
  return (
    <div>
        <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
            <div>
                
            </div>
            <div>
                <button type="button" className="btn btn-outline-success">Agregar</button>
            </div>
        </div>
        <div>
            <table className=" table table-hover">
                <thead className="table-secondary">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Representante</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Nombre del representante </td>
                        <td>Vendedor</td>
                        <td>
                            <ActionButtonsTableComponent view={false} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}
