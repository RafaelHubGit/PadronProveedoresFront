import React from 'react'
import { Outlet, useNavigate  } from 'react-router-dom'

export const ProveedorNavigation = () => {
    const navigate = useNavigate();
    // const { numeroProveedor } = useParams();

    const handleTabChange = (path: string) => {
        // navigate(`/${numeroProveedor}/proveedorLyt/${path}`);
        navigate(path, { relative: "path" });
    };
  return (
    <div className='PDetalleLayout-component mt-4'>
        <div>
            <ul className="nav nav-tabs ">
                <li className="nav-item">
                    <a 
                        className="nav-link active" 
                        aria-current="page" 
                        href="#"
                        onClick={() => handleTabChange('activo')}
                    >
                        Activo
                    </a>
                </li>
                <li className="nav-item">
                    <a 
                        className="nav-link" 
                        href="#"
                        onClick={() => handleTabChange('refrendos')}
                    >
                        Refrendo
                    </a>
                </li>
            </ul>
        </div>
        <div>
            <Outlet/>
        </div>
    </div>
  )
}
