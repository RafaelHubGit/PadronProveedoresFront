import { QueryClient, QueryClientProvider } from 'react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import './presentation/styles/index.styles.scss';


// Crear un cliente de React Query
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={ router } />
    </QueryClientProvider>
  </StrictMode>,
)
