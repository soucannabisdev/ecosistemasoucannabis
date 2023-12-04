import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import directusRequest from "../../modules/apiRequest";
import apiRequest from "../../modules/apiRequest";

function SignupEmail() {
  const [emailInput, setEmailInput] = useState("");
  const [emailValidate, setEmailValidate] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {}, 3000);

    return () => clearTimeout(timer);
  }, []);

  const signUp = async event => {
    event.preventDefault();
    const validateEmail = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emailInput);

    if (!validateEmail) {
      const serchEmail = await apiRequest("/api/directus/search", { query: "/items/Users?filter[email_account][_eq]=" + emailInput }, "POST")
      console.log(serchEmail)
      if (serchEmail) {
        setErrorEmail(true);
        setTimeout(() => {
          setErrorEmail(false);
        }, 5000);
      } else {
        const userData = await apiRequest("/api/directus/create-user", { email_account: emailInput, associate_status: 0 }, "POST");
        localStorage.setItem("user_code", await userData.user_code);
        console.log(userData)
        if (userData) {
          window.location.assign("/bem-vindo");
        }
      }
    } else {
      setEmailValidate(true);
      setTimeout(() => {
        setEmailValidate(false);
      }, 5000);
    }
  };

  const emailHandleChange = event => {
    setEmailInput(event.target.value);
  };

  return (
    <div className="container">
      <h1 className="title" style={{ marginTop: "50px" }}>Cadastro de associado</h1>
      <div className="row justify-content-center">
        <div className="col-md-6 form-signup">
          {errorEmail && (
            <div className="alert alert-danger" role="alert">
              Este endereço de e-mail já está sendo usado.
            </div>
          )}
          {emailValidate && (
            <div className="alert alert-danger" role="alert">
              Endereço de e-mail inválido
            </div>
          )}
          <h1 className="sub-title">Preencha seu e-mail abaixo para iniciar seu cadastro de associado.</h1>
          <form onSubmit={signUp}>
            <div className="form-group">
              <label className="label-login" htmlFor="email">
                E-mail:
              </label>
              <input type="email" className="form-input input-login" onChange={emailHandleChange} value={emailInput} id="email" placeholder="Digite seu email" />
            </div>
            <br />
            <button type="submit" className="btn btn-primary btn-lg btn-signup">
              Iniciar cadastro
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupEmail;
