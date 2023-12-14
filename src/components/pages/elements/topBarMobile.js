import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import User from "../../../modules/User";
import CheckIcon from "./checkIcon";
import Contact from "../modals/contact";

const TopBarMobile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const userData = await User();
      setUser(userData);
    })();
  }, []);

  return (
    <div>
          <div class="">
          <ul class="list-unstyled topMenuMobile">
          {user.associate_status === 0 && (
              <div>
                <Link to="/cadastro-associado">
                  <li className="item-selected">
                    <CheckIcon status={1} size={12} />
                    Cadastro de associado
                  </li>
                </Link>
                <Link>
                  <li className="disabled">
                    <CheckIcon status={1} size={12} />
                    Documentação
                  </li>
                </Link>
                <Link>
                  <li className="disabled">
                    <CheckIcon status={1} size={12} />
                    Consulta
                  </li>
                </Link>
                <Link>
                  <li className="disabled">
                    <CheckIcon status={1} size={12} />
                    Aprovação do cadastro
                  </li>
                </Link>
              </div>
            )}
            {user.associate_status === 2 && (
              <div>
                <Link to="/cadastro-associado">
                  <li className="item-selected">
                    <CheckIcon status={1} size={12} />
                    Cadastro de associado
                  </li>
                </Link>
                <Link>
                  <li className="disabled">
                    <CheckIcon status={1} size={12} />
                    Documentação
                  </li>
                </Link>
                <Link>
                  <li className="disabled">
                    <CheckIcon status={1} size={12} />
                    Consulta
                  </li>
                </Link>
                <Link>
                  <li className="disabled">
                    <CheckIcon status={1} size={12} />
                    Aprovação do cadastro
                  </li>
                </Link>
              </div>
            )}

            {user.associate_status === 3 && (
              <div>
                <Link>
                  <li className="line-through">
                    <CheckIcon status={2} size={12} />
                    Cadastro de associado
                  </li>
                </Link>
                <Link to="/documentos">
                  <li className="item-selected">
                    <CheckIcon status={1} size={12} />
                    Documentação
                  </li>
                </Link>
                <Link>
                  <li className="disabled">
                    <CheckIcon status={1} size={12} />
                    Consulta
                  </li>
                </Link>
                <Link>
                  <li className="disabled">
                    <CheckIcon status={1} size={12} />
                    Aprovação do cadastro
                  </li>
                </Link>
              </div>
            )}

            {user.associate_status === 4 && (
              <div>
                <Link>
                  <li className="line-through">
                    <CheckIcon status={2} size={12} />
                    Cadastro de associado
                  </li>
                </Link>
                <Link to="/documentos">
                  <li className="line-through">
                    <CheckIcon status={2} size={12} />
                    Documentação
                  </li>
                </Link>
                <Link>
                  <li className="item-selected">
                    <CheckIcon status={1} size={12} />
                    Consulta
                  </li>
                </Link>
                <Link>
                  <li className="disabled">
                    <CheckIcon status={1} size={12} />
                    Aprovação do cadastro
                  </li>
                </Link>
              </div>
            )}

            {user.associate_status === 5 && (
              <div>
                <Link>
                  <li className="line-through">
                    <CheckIcon status={2} size={12} />
                    Cadastro de associado
                  </li>
                </Link>
                <Link to="/documentos">
                  <li className="line-through">
                    <CheckIcon status={2} size={12} />
                    Documentação
                  </li>
                </Link>
                <Link>
                  <li className="line-through">
                    <CheckIcon status={2} size={12} />
                    Consulta
                  </li>
                </Link>
                <Link>
                  <li className="disabled">
                    <CheckIcon status={1} size={12} />
                    Aprovação do cadastro
                  </li>
                </Link>
              </div>
            )}

            {user.associate_status === 6 && (
              <div>
                <Link>
                  <li className="line-through">
                    <CheckIcon status={2} size={12} />
                    Solicitação de contato
                  </li>
                </Link>
                <Link>
                  <li className="line-through">
                    <CheckIcon status={2} size={12} />
                    Cadastro de associado
                  </li>
                </Link>
                <Link>
                  <li className="line-through">
                    <CheckIcon status={2} size={12} />
                    Documentação
                  </li>
                </Link>
                <Link>
                  <li className="line-through">
                    <CheckIcon status={2} size={12} />
                    Consulta
                  </li>
                </Link>
                <Link to="/cadastro-aprovado">
                  <li className="item-selected">
                    <CheckIcon status={1} size={12} />
                    Aprovação do cadastro
                  </li>
                </Link>
              </div>
            )}
            {user.associate_status === 7 && (
              <div>
                <Link>
                  <li className="line-through">
                    <CheckIcon status={2} size={12} />
                    Solicitação de contato
                  </li>
                </Link>
                <Link>
                  <li className="line-through">
                    <CheckIcon status={2} size={12} />
                    Cadastro de associado
                  </li>
                </Link>
                <Link>
                  <li className="line-through">
                    <CheckIcon status={2} size={12} />
                    Documentação
                  </li>
                </Link>
                <Link>
                  <li className="line-through">
                    <CheckIcon status={2} size={12} />
                    Consulta
                  </li>
                </Link>
                <Link to="/cadastro-aprovado">
                  <li className="item-selected">
                    <CheckIcon status={2} size={12} />
                    Aprovação do cadastro
                  </li>
                </Link>
              </div>
            )}
          </ul>
        </div>
    </div>
  );
};

export default TopBarMobile;
