import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'


function Logout() { 

  const [logout, setLogout] = useState(false);

  const logoutHandleChange = (event) => {
    setLogout(true);
    localStorage.removeItem("user_code")
    window.location.reload();
  };
    
    return (
      <div>
      Usuario Logado! 
      <br></br>     
      <a  onClick={logoutHandleChange} class="btn btn-primary">Sair</a>
      </div>
     );
}

export default Logout;
