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
      const userData = await apiRequest("/api/directus/create-user", {email_account: emailInput, associate_status: 0 }, "POST")
      localStorage.setItem("user_code", await userData.user_code)
      if(userData){
        setLoginSucess(true)
        window.location.assign("/cadastro-associado");
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
     
      <div class="row justify-content-center">
        <div class="col-md-6 form-signup">
        {errorEmail &&
        <div class="alert alert-danger" role="alert">
          Este endereço de e-mail já está sendo usado.
        </div>
      }
          <h1 class="sub-title">Faça seu cadastro</h1>
          <form onSubmit={signUp}>
            <div class="form-group">
            <label class="label-login" for="email">E-mail:</label>
              <input type="email" class="form-control input-login" onChange={emailHandleChange} value={emailInput} id="email" placeholder="Digite seu email"></input>
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
