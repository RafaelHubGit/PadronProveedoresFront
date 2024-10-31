

export const ProveedorEncabezadoComponent = () => {
  return (
    <div className=" PEncabezado-component d-flex justify-content-between mt-4">
        <div>
            <h2> Innovaciones Tecnologicas Futuro </h2>
            <h3> RFC: iiuwdoeuiy87 </h3>
            <h4> Refrendo: 5 </h4>
        </div>
        <div>
            <select className="form-select form-select-sm" aria-label="Small select example">
                <option selected>Activo</option>
                <option value="1">Inactivo</option>
            </select>
        </div>
    </div>
  )
}
