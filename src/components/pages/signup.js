import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'
import directusRequest from '../../modules/directusRequest'

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

    var serchEmail = await directusRequest("/items/Users?filter[email_account][_eq]=" + emailInput + "&", '', 'GET')
    var verUser = serchEmail.data

    if (verUser.length != 0) {
      setErrorEmail(true)
      setTimeout(() => { setErrorEmail(false); }, 5000);

    } else {
      await directusRequest("/items/Users", { "email_account": emailInput, "pass_account": passInput, "associate_status": 0 }, "POST")
        .then(response => {
          setLoginSucess(true)
          window.location.assign("/login");
        })
        .catch(error => {
          console.error(error);
        });


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
        <div class="col-md-6">
          <h1>Formulário de Cadastro</h1>
          <form onSubmit={signUp}>
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" class="form-control" onChange={emailHandleChange} value={emailInput} id="email" placeholder="Digite seu email"></input>
            </div>
            <div class="form-group">
              <label for="password">Senha:</label>
              <input type="password" class="form-control" onChange={passHandleChange} value={passInput} id="password" placeholder="Digite sua senha"></input>
            </div>
            <br></br>
            <button type="submit" onClick={signUp} class="btn btn-primary">Fazer Cadastro</button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default Signup;
