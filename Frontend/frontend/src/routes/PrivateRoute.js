import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../service/AuthService';

const PrivateRoute = () => {
  return getToken() ? <Outlet />
   : <Navigate to="/login" />;
};

export default PrivateRoute;
