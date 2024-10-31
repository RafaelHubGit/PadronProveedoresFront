import { useNavigate } from 'react-router-dom';

export const ProveedorActionBarComponent = () => {

  const navigate = useNavigate();
    // const { numeroProveedor } = useParams();

    const handleTabChange = () => {
        // navigate(`/${numeroProveedor}/proveedorLyt/${path}`);
        navigate('/inicio/buscarProveedor');
    };

  return (
    <div className=' PActionBar-component d-flex justify-content-between'>
        <span 
          className="material-symbols-outlined mt-1"
          onClick={() => handleTabChange()}
        >
            arrow_back
        </span>

        <div>
            <button type="button" className="btn btn-outline-success">Guardar</button>
        </div>
    </div>
  )
}
