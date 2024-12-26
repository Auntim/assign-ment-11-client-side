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
import ServicesDetails from './components/pages/ServicesDetails';
import PrivateRoute from './components/pages/PrivateRoute';
import BookingService from './components/pages/BookingService';
import UpdateService from './components/pages/UpdateService';
import Erropage from './components/pages/Erropage';
import ManageBookedServices from './components/pages/ManageBookedServices';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Erropage></Erropage>,
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
        path: '/services/:id',
        element: <PrivateRoute><ServicesDetails></ServicesDetails></PrivateRoute>,
        loader: ({ params }) => fetch(`https://web-app-server-site.vercel.app/services/${params.id}`)
      },
      {
        path: 'bookings',
        element: <PrivateRoute><BookingService></BookingService></PrivateRoute>
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
        element: <PrivateRoute><ManageService></ManageService></PrivateRoute>
      },
      {
        path: "/dashboard/booked-services",
        element: <PrivateRoute><BookedService></BookedService></PrivateRoute>
      },
      {
        path: "/dashboard/service-to-do",
        element: <PrivateRoute> <ServiceToDo></ServiceToDo></PrivateRoute>
      },
      {
        path: "/edit-service/:id",
        element: <UpdateService></UpdateService>
      },
      {
        path: '/manage-booked-services',
        element: <ManageBookedServices></ManageBookedServices>
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
