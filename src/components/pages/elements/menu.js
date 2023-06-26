import React, { useState, useEffect } from "react";
import User from '../../../modules/User'
import { Dropdown } from 'react-bootstrap';

const MenuTopo = () => {

  const [user, setUser] = useState();

  (async function () {
    const userData = await User();
    setUser(userData);
  })();


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {user &&
                <a className="nav-link" href="#">{user.email_account}</a>
              }
            </li>
            <li className="nav-item">
              <img src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-48.png" alt="Avatar" className="rounded-circle" />
            </li>
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Dropdown
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#action1">Opção 1</Dropdown.Item>
                <Dropdown.Item href="#action2">Opção 2</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#action3">Sair</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MenuTopo;
