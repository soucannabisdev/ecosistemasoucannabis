import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'
import directusRequest from '../../modules/directusRequest'
import Logout from '../logout'

function LoginForm() {

  const [emailInput, setEmailInput] = useState([])
  const [passInput, setPassInput] = useState([])
  const [loginSucess, setLoginSucess] = useState(false);
  const [loginErrorPass, setLoginErrorPass] = useState(false);
  const [loginEmailError, setLoginEmailError] = useState(false);
  const [logged, setLogged] = useState(false);

  var verLogin = localStorage.getItem("user_code")

  useEffect(() => {
    if(verLogin) {
      setLogged(true)
    }else{
      setLogged(false)
    }
  }, [])


  const userLogin = async (event) => {
    event.preventDefault()
    await directusRequest("/items/Users?filter[email_account][_eq]=" + emailInput + "&", '', "GET")
    .then(response => {
      localStorage.setItem("user_code",response.data[0].user_code)
      setLogged(true)


      var verUser = response.data

      if (verUser.length == 0) {
        console.log("E-mail não encontrado")
        setLoginEmailError(true)
        setTimeout(() => {setLoginEmailError(false);}, 5000);
      } else {
        if (verUser[0].pass_account != passInput) {
          setLoginErrorPass(true)
          setTimeout(() => {setLoginErrorPass(false);}, 5000);
        } else {
          setLoginSucess(true);
          window.location.assign("/");
        }
      }
    })
     
  }

  const emailHandleChange = (event) => {
    setEmailInput(event.target.value);
  };

  const passHandleChange = (event) => {
    setPassInput(event.target.value);
  };



  return (

    <div class="container">
      {loginEmailError &&
        <div class="alert alert-danger" role="alert">
          E-mail não encontrado
        </div>
      }
      {loginErrorPass &&
        <div class="alert alert-danger" role="alert">
          Senha incorreta
        </div>
      }      

      {loginSucess && <Navigate to="/" replace={true} />}
      {!logged && 
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h1>Formulário de Login</h1>
          <form onSubmit={userLogin}>
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" class="form-control" onChange={emailHandleChange} value={emailInput} id="email" placeholder="Digite seu email"></input>
            </div>
            <div class="form-group">
              <label for="password">Senha:</label>
              <input type="password" class="form-control" onChange={passHandleChange} value={passInput} id="password" placeholder="Digite sua senha"></input>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
          </form>
          <p>Ou faça login usando sua conta do Google:</p>
          <a href="#" class="btn btn-danger"><i class="fab fa-google"></i> Login com Google</a>

          <button type="submit" onClick={userLogin} class="btn btn-primary">Login</button>
        </div>
      </div>
      }
      
     {logged && <Logout />}
    </div>
      
  );
}

export default LoginForm;
