import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './page/Home';
import AddCar from './page/AddCar';
import Login from './page/Login';
import SignUp from './page/SignUp';
import EditCar from './page/EditCar';
import CarDetail from './page/CarDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/car/:id',
    element: <CarDetail />,
  },
  {
    path: '/car/:id/edit',
    element: <EditCar />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/add',
    element: <AddCar />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}