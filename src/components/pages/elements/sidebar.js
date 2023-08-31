import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import User from '../../../modules/User'

const Sidebar = () => {  
  const [user, setUser] = useState({}); 

  useEffect(() => {
    (async () => {
      const userData = await User();
      setUser(userData);
    })()

 

  }, []);

  return (
    <div>
      <div>
        <div className="bg-green text-white" >
          <ul className="listPages">
          {user.associate_status <= 1 &&(
              <div>
                <Link to="/solicitacao-contato"><li >Solicitação de contato</li></Link>
                <Link><li className="disabled">Cadastro de associado</li></Link>
                <Link><li className="disabled">Documentação</li></Link>
                <Link><li className="disabled">Consulta Medica</li></Link>
                <Link><li className="disabled">Receita Medica</li></Link>
                <Link><li className="disabled">Aguardando aprovação do cadastro</li></Link>
              </div>
            )}
            {user.associate_status === 2 && (
              <div>
                <Link><li className="line-through">Solicitação de contato</li></Link>
                <Link to="/cadastro-associado"><li>Cadastro de associado</li></Link>
                <Link><li className="disabled">Documentação</li></Link>
                <Link><li className="disabled">Consulta Medica</li></Link>
                <Link><li className="disabled">Receita Medica</li></Link>
                <Link><li className="disabled">Aguardando aprovação do cadastro</li></Link>
              </div>
            )}

            {user.associate_status === 3 && (
              <div>
                <Link><li className="line-through">Solicitação de contato</li></Link>
                <Link><li className="line-through">Cadastro de associado</li></Link>
                <Link to="/documentos"><li>Documentação</li></Link>
                <Link><li className="disabled">Consulta Medica</li></Link>
                <Link><li className="disabled">Receita Medica</li></Link>
                <Link><li className="disabled">Aguardando aprovação do cadastro</li></Link>
              </div>
            )}

            {user.associate_status === 4 && (
              <div>
                <Link><li className="line-through">Solicitação de contato</li></Link>
                <Link><li className="line-through">Cadastro de associado</li></Link>
                <Link><li className="line-through">Documentação</li></Link>
                <Link to="/consulta"><li>Consulta Medica</li></Link>
                <Link><li className="disabled">Receita Medica</li></Link>
                <Link><li className="disabled">Aguardando aprovação do cadastro</li></Link>
              </div>
            )}

            {user.associate_status === 5 && (
              <div>
                <Link><li className="line-through">Solicitação de contato</li></Link>
                <Link><li className="line-through">Cadastro de associado</li></Link>
                <Link><li className="line-through">Documentação</li></Link>
                <Link><li className="line-through">Consulta Medica</li></Link>
                <Link to="/receita-medica"><li >Receita Medica</li></Link>
                <Link><li className="disabled">Aguardando aprovação do cadastro</li></Link>
              </div>
            )}

          {user.associate_status === 6 && (
              <div>
                <Link><li className="line-through">Solicitação de contato</li></Link>
                <Link><li className="line-through">Cadastro de associado</li></Link>
                <Link><li className="line-through">Documentação</li></Link>
                <Link><li className="line-through">Consulta Medica</li></Link>
                <Link><li className="line-through">Receita Medica</li></Link>
                <Link to="/cadastro-aprovado"><li>Aguardando aprovação do cadastro</li></Link>
              </div>
            )}


          </ul>
        </div>
      </div>

    </div>

  );
}

export default Sidebar;
