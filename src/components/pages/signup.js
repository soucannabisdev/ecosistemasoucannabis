import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'
import directusRequest from '../../modules/apiRequest'
import apiRequest from '../../modules/apiRequest';

function Signup() {

  const [emailInput, setEmailInput] = useState([])
  const [passInput, setPassInput] = useState([])
  const [errorEmail, setErrorEmail] = useState(false);
  const [formData, setFormData] = useState({});
  const [loginSucess, setLoginSucess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const signUp = async (event) => {
    event.preventDefault()

    var serchEmail =  await apiRequest("/api/directus/login", {"email":emailInput}, "POST")

    if (serchEmail) {
      setErrorEmail(true)
      setTimeout(() => { setErrorEmail(false); }, 5000);
    } else {
      
      const createUser = await apiRequest("/api/directus/create-user", { "email_account": emailInput, "pass_account": passInput, "associate_status": 0 }, "POST")

      if(createUser){
        setLoginSucess(true)
        window.location.assign("/login");
      }else{
        console.log("erro")
      }
      
    }
  }

  const emailHandleChange = (event) => {
    setEmailInput(event.target.value);
  };

  const passHandleChange = (event) => {
    setPassInput(event.target.value);
  };

  return (

    <div class="container">
     
      {errorEmail &&
        <div class="alert alert-danger" role="alert">
          Este endereço de e-mail já está sendo usado.
        </div>
      }

      <div class="row justify-content-center">
        <div class="col-md-6 form-signup">
          <h1 class="sub-title">Preencha com seu e-mail e defina uma senha</h1>
          <form onSubmit={signUp}>
            <div class="form-group">
            <label class="label-login" for="email">E-mail:</label>
              <input type="email" class="form-control input-login" onChange={emailHandleChange} value={emailInput} id="email" placeholder="Digite seu email"></input>
            </div>
            <div class="form-group">
            <label class="label-login" for="email">Senha:</label>
              <input type="password" class="form-control input-login" onChange={passHandleChange} value={passInput} id="password" placeholder="Digite sua senha"></input>
            </div>
            <br></br>
            <button type="submit" onClick={signUp} class="btn btn-primary btn-lg btn-signup">Fazer Cadastro</button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default Signup;
