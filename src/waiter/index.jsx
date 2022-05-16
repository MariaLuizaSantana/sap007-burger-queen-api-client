import React from 'react';
import { Link } from 'react-router-dom';

const Waiter = () =>{
  return (
    <div>
      <p>Oi, eu sou a página dos garçons!</p>
      <nav>
        <ul>
          <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link to="/admin">Administração</Link>
          </li>
          <li>
            <Link to="/chef">Cozinha</Link>
          </li>
          <li>
            <Link to="/waiter">Garçom</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Waiter;