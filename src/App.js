import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import Formulario from './Components/Form';
import Navbar from './Components/Navbar';
import FormularioExibicao from './Components/Proposta';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/formulario" element={<Formulario />} />
        <Route path="/proposta" element={<FormularioExibicao />} />
      </Routes>
    </Router>
  );
};

export default App;
