import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoute = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // Verifica se o usuário está autenticado

  return isAuthenticated ? <Navigate to="/main" /> : <Outlet />; // Redireciona para a página principal se autenticado
};

export default AuthRoute;
