import { createBrowserRouter } from "react-router-dom"
import { Root } from "../Root";
import { MainLayout } from "../presentation/layouts/MainLayout";
import { BusquedaProveedor } from "../presentation/pages/proveedores/BusquedaProveedor";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            ///Proveedores Rutas
            {
                path: 'inicio',
                element: <MainLayout/>,
                children: [
                    {
                        path: 'buscarProveedor',
                        element: <BusquedaProveedor />
                    }
                ]
            }
        ]

    }
]);
