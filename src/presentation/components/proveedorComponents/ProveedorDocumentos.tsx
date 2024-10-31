import { ActionButtonsTableComponent } from "../generalComponents/ActionButtonsTableComponent"


export const ProveedorDocumentos = () => {
  return (
    <div>
        <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
            <div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Tiene documentos
                    </label>
                </div>
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
                        <th scope="col">Documento</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Nombre del documento</td>
                        <td>pdf</td>
                        <td>
                            <ActionButtonsTableComponent edit={false} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}
