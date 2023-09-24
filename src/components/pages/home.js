import React, { useState, useEffect } from 'react';
import User from '../../modules/User'

function Home() {

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
          const userData = await User();
          setUser(userData);
        })()

    }, []);

 
    if(user.associate_status == 2){
        window.location.assign("/cadastro-associado");
    }
    if(user.associate_status == 3){        
        window.location.assign("/documentos");        
    }
    if(user.associate_status == 4){        
        window.location.assign("/consulta");        
    }
    if(user.associate_status == 5){        
        window.location.assign("/receita-medica");        
    }
    if(user.associate_status >= 6){        
        window.location.assign("/cadastro");       
    }


    const homeSuccess = async () => {
        window.location.assign("/solicitacao-contato");
    }

    return (
        <div className="form-container bg1">
            <div>
                <h1 class="title"> Olá, seja bem-vindo(a) à Associação Sou Cannabis. </h1>
                <h1 class="sub-title">Siga todos os passos deste guia para se tornar um Associado e fazer o seu primeiro pedido em nossa associação.</h1>
                <div class="container d-flex justify-content-center align-items-center">
                    <button class="btn btn-primary btn-lg" onClick={homeSuccess}>Iniciar Cadastro</button>
                </div>
            </div></div>
    );
}

export default Home;
