import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/formulario" className="navbar-link">Formulário</Link>
        </li>
        <li className="navbar-item">
          <Link to="/proposta" className="navbar-link">Proposta</Link>
        </li>
      </ul>
    </nav>
  );
}
