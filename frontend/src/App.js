import React from 'react';
import './App.css';
import {  Route, Routes, BrowserRouter} from 'react-router-dom';
import Login from './component/Login';
import Register from './component/Register';
import Dashboard from './component/Dashboard';
import ForgotPassword from './component/ForgotPassword';
import Crud from "./component/Crud"

function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>

      <Route  path="/login" element={<Login />}/>
      <Route  path="/" element={<Register />}/>
      <Route  path="/dash" element={<Dashboard />}/>
      <Route  path="/forgot" element={<ForgotPassword />}/>
      <Route  path="/crud" element={<Crud />}/>
    </Routes>
    
    
    </BrowserRouter>
    
    
    </>
  );
}

export default App;
