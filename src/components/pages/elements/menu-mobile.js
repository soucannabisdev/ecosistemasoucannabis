import React, { useState, useEffect } from "react";
import User from '../../../modules/User'
import Contact from '../modals/contact'
import { Dropdown } from 'react-bootstrap';

const MenuTopo = () => {

  const [user, setUser] = useState();

  useEffect(() => {
    (async function () {
      const userData = await User();
      setUser(userData);
    })();
  }, [])

  const [logout, setLogout] = useState(false);

  const logoutHandleChange = (event) => {
    setLogout(true);
    localStorage.removeItem("user_code")
    window.location.assign("/login");
  };

  return (
    <nav className="navbar  navbar-light fixed-top">
      <Contact />
      <div className="col-4">
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic" className="text-right">
            Menu
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logoutHandleChange} class="btn btn-primary">
              Sair
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>


  );
}

export default MenuTopo;
