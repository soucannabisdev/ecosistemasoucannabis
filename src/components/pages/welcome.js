import { BrowserRouter as Router, Route, Routes, Navigate, Link, useHistory } from 'react-router-dom'


function Welcome() {

  return (
    
    <div class="container">
         <div className="form-container bg1">
            <div>
                <h1 class="title"> Olá, seja bem-vindo(a) à Associação Sou Cannabis. </h1>
                <h1 class="sub-title">Siga todos os passos deste guia para se tornar um Associado e contar com os benefícios da associação.</h1>
                <div class="container d-flex justify-content-center align-items-center">
                    <Link to="/cadastro-associado" class="btn btn-lg btn-primary btn-login" >Iniciar Cadastro</Link>
                </div>
            </div></div>
     
        </div>
  );
}

export default Welcome;
