import React, { useState, useEffect } from 'react';


function Home() {

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
