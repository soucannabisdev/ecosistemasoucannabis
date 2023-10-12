import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import apiRequest from "../../../modules/apiRequest";

const LostPass = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [mailError, setMailError] = useState(false);
  const [resetPassMsg, setResetPassMsg] = useState(false);
  const [formData, setFormData] = useState({
    email: null,
  });

  const handleClose = () => setShowPopup(false);

  function lostPass() {
    setShowPopup(true);
  }

  async function submit() {
    await apiRequest("/api/email/lost-password", { email: formData.email }, "POST").then(response => {
      if (response) {
        setResetPassMsg(true);
      } else {
        setMailError(true);
        setTimeout(() => {
          setMailError(false);
        }, 4000);
      }
    });
  }

  function handleChange(event) {
    setFormData({
      ...formData,
      email: event.target.value,
    });
  }

  return (
    <div>
      <Modal show={showPopup} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Esqueceu sua senha?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 class="text-center">Preencha seu e-mail abaixo para receber um link para definir uma nova senha.</h5>
          <form action="POST">
            <br></br>
            {mailError && (
              <div class="alert alert-danger" role="alert">
                O e-mail não está cadastrado em nossa base de dados.
              </div>
            )}
            {resetPassMsg && (
              <div class="alert alert-success text-center" role="alert">
                Verifique sua caixa de entrada para redefinir sua senha.<br></br>
                Se caso não achar o e-mail, <b>verifique a caixa de SPAN.</b>
              </div>
            )}
            <input class="form-control input-login" placeholder="Digite seu e-mail" onChange={handleChange} type="text"></input>
            <a class="btn btn-success btn-lg btn-float-right" onClick={submit}>
              Redefinir senha
            </a>
          </form>
        </Modal.Body>
      </Modal>
      <a onClick={lostPass} class="text-left text-white lost-pass">
        Esqueci minha senha
      </a>
    </div>
  );
};

export default LostPass;
