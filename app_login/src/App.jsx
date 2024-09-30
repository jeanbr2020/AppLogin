import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Signup />}> </Route>
          <Route path='/login' element={<Login />}> </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
