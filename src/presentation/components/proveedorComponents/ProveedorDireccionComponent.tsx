import { MultiValue, SingleValue } from "react-select";
import { OptionSelect, SelectComponent } from "../generalComponents/SelectComponent"

const opciones: OptionSelect[] = [
    { value: 'opcion1', label: 'Opción 1' },
    { value: 'opcion2', label: 'Opción 2' },
    { value: 'opcion3', label: 'Opción 3' },
  ];

export const ProveedorDireccionComponent = () => {

    const handleChange = (newValue: SingleValue<OptionSelect> | MultiValue<OptionSelect>) => {
        console.log(newValue);
    };

  return (
    <div className="mb-3">
        <div className="mt-2">
            <div>
                <p>Madrid 62, Tabacalera, Cuauhtémoc, 06030 Ciudad de México, CDMX</p>
            </div>
            <div className="mt-2">
                <label htmlFor="exampleFormControlInput1" className="form-label">Calle</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Calle" />
            </div>
        </div>
        <div className="row">  {/* TODO Verificar si lo mejor seria poner hasta arriba el codigo postal ya que se ahi se puede sacar lo demas automaticamanete */}
            <div className="col-md-12 col-lg-6">
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
            <div className="col-md-12 col-lg-6">
                <SelectComponent
                    title="Municipio"
                    options={opciones}
                    onChange={handleChange}
                    placeholder="Seleccione una opción"
                    // noOptionsMessage={ 'No hay mas Opciones' }
                    isSearchable
                    // isMulti
                />
            </div>
        </div>
        <div className="row">
            <div className="col-md-12 col-lg-6">
                <SelectComponent
                    title="Colonia"
                    options={opciones}
                    onChange={handleChange}
                    placeholder="Seleccione una opción"
                    // noOptionsMessage={ 'No hay mas Opciones' }
                    isSearchable
                    // isMulti
                />
            </div>
            <div className="col-md-12 col-lg-6">
                <SelectComponent
                    title="Código Postal"
                    options={opciones}
                    onChange={handleChange}
                    placeholder="Seleccione una opción"
                    // noOptionsMessage={ 'No hay mas Opciones' }
                    isSearchable
                    // isMulti
                />
            </div>
        </div>
        <div className="row">
            <div className="mt-2">
                <label htmlFor="exampleFormControlInput1" className="form-label">Dirección Internacional</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Dirección Internacional" />
            </div>
            <div className="mt-2">
                <label htmlFor="exampleFormControlInput1" className="form-label">Notas</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Notas" />
            </div>
        </div>
    </div>
  )
}
