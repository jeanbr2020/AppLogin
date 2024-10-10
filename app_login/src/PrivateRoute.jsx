import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // Verifica se o token está no localStorage

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />; // Redireciona para login se não autenticado
};

export default PrivateRoute;
