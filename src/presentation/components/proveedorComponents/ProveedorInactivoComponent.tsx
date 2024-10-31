import { MultiValue, SingleValue } from "react-select";
import { OptionSelect, SelectComponent } from "../generalComponents/SelectComponent"
import { DateTimePickerComponent } from "../generalComponents/DateTimePickerComponent";

const opciones: OptionSelect[] = [
    { value: 'opcion1', label: 'Opción 1' },
    { value: 'opcion2', label: 'Opción 2' },
    { value: 'opcion3', label: 'Opción 3' },
  ];


export const ProveedorInactivoComponent = () => {

    const handleChange = (newValue: SingleValue<OptionSelect> | MultiValue<OptionSelect>) => {
        console.log(newValue);
    };

  return (
    <div className="row">
        <div className="col-sm-12 col-md-6">
            <div className="mb-3">
                <SelectComponent
                    title="Estado"
                    options={opciones}
                    onChange={handleChange}
                    placeholder="Seleccione una opción"
                    // noOptionsMessage={ 'No hay mas Opciones' }
                    isSearchable
                    // isMulti
                /> 
            </div>
            <div className="row">
                <div className="col-6 col-sm-4 col-md-6 col-lg-4 mb-3 me-lg-3">
                    <DateTimePickerComponent 
                        titulo="Fecha de Inicio"
                    />
                </div>
                <div className="col-6 col-sm-4 col-md-6 col-lg-4 me-lg-3">
                    <DateTimePickerComponent 
                        titulo="Fecha de Fin"
                    />
                </div>
                <div className="col-6 col-sm-4 col-md-6 col-lg-4">
                    <DateTimePickerComponent 
                        titulo="Fecha de DOF"
                    />
                </div>
            </div>
        </div>
        <div className="col-sm-12 col-md-6 ">
            {/* <div className="form-floating"> */}
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Observaciones</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows={6}></textarea>
            {/* </div> */}
        </div>
    </div>
  )
}
