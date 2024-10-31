import { ActionButtonsTableComponent } from "../generalComponents/ActionButtonsTableComponent"
import { DateTimePickerComponent } from "../generalComponents/DateTimePickerComponent"


export const ProveedorEsRepseComponent = () => {
  return (
    <div className="d-flex flex-column ">
        <div className="d-flex align-items-center">
            <div className="form-check mt-2 me-4">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" />
                <label className="form-check-label" htmlFor="flexCheckIndeterminate">
                    Es repse
                </label>
            </div>
            <DateTimePickerComponent />
        </div>
        <div className="mt-3">
            <div>
                <div className="input-group mb-1">
                    {/* <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2"> */}
                    {/* <button className="btn btn-outline-warning" type="button" id="button-addon2">Ver</button> */}
                    <div className="btn-group btn-group-sm w-100" role="group" aria-label="Large button group">
                        <p className="form-control"> Nombre del documento .pdf</p>
                        <ActionButtonsTableComponent edit={false} />
                    </div>
                </div>
            </div>
            <div className="mt-3">
                <div>
                    <button type="button" className="btn btn-outline-success w-100">Agregar documento</button>
                </div>
            </div>
        </div>
    </div>
  )
}
