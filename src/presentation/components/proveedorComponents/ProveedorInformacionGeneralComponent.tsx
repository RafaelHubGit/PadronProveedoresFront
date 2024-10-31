
import { DateTimePickerComponent } from "../generalComponents/DateTimePickerComponent"
import { OptionSelect, SelectComponent } from "../generalComponents/SelectComponent"
import { MultiValue, SingleValue } from "react-select";
import { ProveedorEsRepseComponent } from "./ProveedorEsRepseComponent";
// import { useState } from "react";


const opciones: OptionSelect[] = [
  { value: 'opcion1', label: 'Opción 1' },
  { value: 'opcion2', label: 'Opción 2' },
  { value: 'opcion3', label: 'Opción 3' },
];
const opciones2: OptionSelect[] = [
  { value: 'opcion1', label: 'Opción 1' },
  { value: 'opcion2', label: 'Opción 2' },
  { value: 'opcion3', label: 'Opción 3' },
];


export const ProveedorInformacionGeneralComponent = () => {

  // const [selectedValue, setSelectedValue] = useState<SingleValue<OptionSelect> | MultiValue<OptionSelect>>(null);


  // const handleChange = (newValue: SingleValue<OptionSelect> | MultiValue<OptionSelect> | null) => {
  //   setSelectedValue(newValue); // Actualizar el estado con el nuevo valor
  //   console.log('Seleccionado:', newValue); // Imprimir en consola la opción seleccionada
  // };

  const handleChange = (newValue: SingleValue<OptionSelect> | MultiValue<OptionSelect>) => {
    console.log(newValue);
  };


  return (
    <div className="generalInformation container-fluid mt-2">
      <div className="">
        <button type="button" className="btn btn-outline-primary w-100">Nuevo Refrendo</button>
      </div>
      <div className="dateTime-section d-flex mt-3">
        <DateTimePickerComponent 
          titulo="Fecha de Alta"
        />
        <DateTimePickerComponent
          titulo="Fecha de Refrendo"
        />
      </div>
      <div className=" selects-section row mt-2 ">
        <div className="col-12 col-sm-12 col-md-6">
          <SelectComponent
            title="Tipo Proveedor"
            options={opciones}
            onChange={handleChange}
            placeholder="Seleccione una opción"
            // noOptionsMessage={ 'No hay mas Opciones' }
            isSearchable
            // isMulti
          />
        </div>
        <div className="col-12 col-sm-12 col-md-6">
          <SelectComponent
            title="Giros Comerciales"
            options={opciones2}
            onChange={handleChange}
            placeholder="Seleccione una opción"
            // noOptionsMessage={ 'No hay mas Opciones' }
            isSearchable
            isMulti
          />
        </div>
      </div>
      <div className="  row mt-3">
        <div className=" d-flex flex-column justify-content-center col-sm-12 col-md-6 ">
          <ProveedorEsRepseComponent />
        </div>
        <div className=" col-sm-12 col-md-6 mt-sm-3">
          <div className="mb-2 ">
            <label htmlFor="exampleFormControlInput1" className="form-label">Página Web</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="www.ejemplo.com.mx" />
          </div>
          <div className="mb-2">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Observciones</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}></textarea>
          </div>
        </div>
      </div>
    </div>
  )
}
