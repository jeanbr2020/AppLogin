import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthRoute from './AuthRoute'; // Rota protegida para usuários NÃO autenticados
import Login from './Login';
import MainPage from './MainPage';
import PrivateRoute from './PrivateRoute'; // Rota protegida para usuários autenticados
import ProfilePage from './ProfilePage';
import Signup from './Signup';
import TaskList from './TaskList';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Rotas para usuários não autenticados */}
          <Route element={<AuthRoute />}>
            <Route path="/register" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>
          
          {/* Rotas para usuários autenticados */}
          <Route element={<PrivateRoute />}>
            <Route path="/main" element={<MainPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/tasks" element={<TaskList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
