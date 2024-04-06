import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import ProctectedRoute from './ProctectedRoute';
import Main from './Main/Main';
import Login from './Login/Login';
import Signup from './Login/Signup'


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProctectedRoute><Main /></ProctectedRoute>}></Route>
        <Route path='/login' element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
