import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import MainPage from './MainPage';
import ProfilePage from './ProfilePage';
import TaskList from './TaskList';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/main' element={<MainPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/tasks' element={<TaskList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
