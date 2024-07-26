import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FormComponent from './components/FormComponent';
import HistoryTable from './components/HistoryTable';
import logo from './images/logo.jpg';
import './App.css';  // Adicionado o CSS para estilos

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="nav-bar">
          <ul>
            <img src={logo} alt="Cinematic Logo" />
          </ul>
          <ul>
            <li>
              <Link to="/">Consulta de Filmes </Link>
            </li>
            <li>
              |
            </li>
            <li>
              <Link to="/history">Histórico de Consultas</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<FormComponent onSuccess={() => {}} />} />
          <Route path="/history" element={<HistoryTable />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

