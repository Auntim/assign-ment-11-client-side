import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './components/root/Root';
import AuthProviders from './provider/AuthProviders';
import Home from './components/Home';
import Login from './components/pages/Login';
import Registrar from './components/pages/Registrar';
import { HelmetProvider } from 'react-helmet-async';
import AddServices from './components/pages/AddServices';
import ManageService from './components/pages/ManageService';
import BookedService from './components/pages/BookedService';
import ServiceToDo from './components/pages/ServiceToDo';
import AllServices from './components/pages/AllServices';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <div>page not pound</div>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'services',
        element: <AllServices></AllServices>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Registrar></Registrar>
      },
      {
        path: '/dashboard/add-service',
        element: <AddServices></AddServices>
      },
      {
        path: "/dashboard/manage-service",
        element: <ManageService></ManageService>
      },
      {
        path: "/dashboard/booked-services",
        element: <BookedService></BookedService>
      },
      {
        path: "/dashboard/service-to-do",
        element: <ServiceToDo></ServiceToDo>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProviders>
        <RouterProvider router={router} />
      </AuthProviders>
    </HelmetProvider>
  </StrictMode>,
)
