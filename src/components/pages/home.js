import React, { useState, useEffect } from 'react';


function Home() { 

      const homeSuccess = async () => {    
          window.location.assign("/solicitacao-contato");    
      }    
    
    return (
        <div className="form-container">
        <div>
        Home
        <button onClick={homeSuccess}>Iniciar</button>
        </div></div>
     );
}

export default Home;
