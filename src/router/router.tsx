import { createBrowserRouter, Navigate } from "react-router-dom"
import { Root } from "../Root";
import { MainLayout } from "../presentation/layouts/MainLayout";
import { BusquedaProveedor } from "../presentation/pages/proveedores/BusquedaProveedor";
import { Proveedor } from "../presentation/pages/proveedores/Proveedor";
import { ProveedorLayout } from "../presentation/layouts/ProveedorLayout";
import { ProveedorActivoLayout } from "../presentation/components/proveedorComponents/ProveedorActivoLayout";
import { ProveedorRefrendosComponent } from "../presentation/components/proveedorComponents/ProveedorRefrendosComponent";
import { CatalogosPage } from "../presentation/pages/Catalogos/CatalogosPage";
import { ConfiguracionDeReportesPage } from "../presentation/pages/Configuracion/ConfiguracionDeReportesPage";

// Definir las rutas del detalle de proveedor
const proveedorDetalleRoutes = [
  {
    path: '', // Redirige a 'proveedorLyt'
    element: <Navigate to="proveedorLyt" replace />,
  },
  {
    path: 'proveedorLyt',
    element: <ProveedorLayout />,
    children: [
      {
        path: '', // Redirige a 'activo'
        element: <Navigate to="activo" replace />,
      },
      {
        path: 'activo',
        element: <ProveedorActivoLayout />,
      },
      {
        path: 'refrendos',
        element: <ProveedorRefrendosComponent />,
      },
    ],
  },
];

// Definir las rutas principales de inicio
const inicioRoutes = [
  {
    path: '', // Redirige a 'buscarProveedor'
    element: <Navigate to="buscarProveedor" replace />,
  },
  {
    path: 'buscarProveedor',
    element: <BusquedaProveedor />,
  },
  {
    path: 'proveedor/:numeroProveedor',
    element: <Proveedor />,
    children: proveedorDetalleRoutes,
  },
  {
    path: 'catalogos',
    element: <CatalogosPage />,
  },
  {
    path: 'configuracionReportes',
    element: <ConfiguracionDeReportesPage/>  
  }
];

// Configuración final del router
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'inicio',
        element: <MainLayout />,
        children: inicioRoutes,
      },
    ],
  },
]);
