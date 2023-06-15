import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar bg-green text-white" style={{ width: '30%' }}>
      <ul>
      <li>
          <Link to="/cadastro">Cadastro</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/solicitacao-contato">Solicitação de contato</Link>
        </li>
        <li>
          <Link to="/cadastro-associado">Cadastro de associado</Link>
        </li>
        <li>
          <Link to="/link4">Documentação</Link>
        </li>
        <li>
          <Link to="/link5">Consulta Medica</Link>
        </li>
        <li>
          <Link to="/link5">Receita Medica</Link>
        </li>
        <li>
          <Link to="/link5">Aguardando aprovação do cadastro de Associado</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
