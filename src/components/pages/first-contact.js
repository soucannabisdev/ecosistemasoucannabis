import React, { useState, useEffect } from 'react';
import User from '../../modules/User'
import apiRequest from '../../modules/apiRequest';
import PhoneNumberInput from '../forms/PhoneNumberInput'
import EmailInput from '../forms/EmailInput'
import { Formik, Form, Field, ErrorMessage } from "formik";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import Modal from 'react-bootstrap/Modal';

function Contact() {
  useEffect(() => {
    (async () => {
      const userData = await User();
      setUser(userData);
    })()

  }, []);

  const [user, setUser] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [inputError, setInputError] = useState(false);
  const [submit, setSumbit] = useState(true);
  const [msgWhats, setMsgWhats] = useState(false);
  const [errorConn, setErrorConn] = useState(false);
  const [msgWhatsError, setMsgWhatsError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const handleClose = () => setShowPopup(false);
  const handleShow = () => setShowPopup(true);

  const [formData, setFormData] = useState({
    name: null,
    phone: null,
    email: null
  })

  const associate_status = user.associate_status

  if (associate_status > 2) {
    window.location.assign("/")
  }

  const nocontact = async (event) => {
    event.preventDefault();
    var value = event.target.value

    await apiRequest("/api/directus/update", { "userId": user.id, "formData": { "associate_status": value } }, "POST")
      .then(response => {
      })
      .catch(error => {
        console.error(error);
      });

    window.location.assign("/cadastro-associado");
  }

  const handleChoice = (choice) => {
    handleClose();
  };


  const contact = async (event) => {
    event.preventDefault();
    var phoneNumber = formData.phone

    if (phoneNumber) {
      if (!phoneNumber.includes("+55")) {
        handleShow(true)
      }

      var phone = phoneNumber.split("+")
      formData.phoneSoma = phoneNumber

      formData.phone = phone[1]
    }

    function isEmpty(formData) {
      for (let key in formData) {
        if (formData.hasOwnProperty(key)) {
          if (formData[key] === null || formData[key] === undefined || formData[key] === "") {
            return true;
          }
        }
      }
      return false;
    }

    if (isEmpty(formData)) {
      setInputError(true)
    } else {
      await apiRequest("/api/chatwoot/send-message-api", JSON.stringify(formData), "POST")
        .then(response => {
          console.log(response)
          if (response != []) {
            setMsgWhats(true)
            setTimeout(() => {
              setMsgWhats(false)
            }, 6000)
          }else{
            setErrorConn(true)
          }
        })
        .catch(error => {
          console.error(error);          
        });


      await apiRequest("/api/chatwoot/send-message-chat", JSON.stringify({
        "email": formData.email,
        "name": formData.name,
        "phone_number": formData.phoneSoma
      }), "POST")
        .catch(error => {
          console.error(error);
        });
    }

    setSumbit(false)
  }

  const handleChangeInputPhone = (event) => {
    setFormData({
      ...formData,
      ["phone"]: event,
    });
    setInputError(false)
  };

  const handleChangeInput = (event) => {
    event.preventDefault();
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  };

  return (
    <div className="form-container bg1" >
        <h1 class="title"> Acolhimento</h1>
                <h1 class="sub-title">Preencha o formulário com seus dados para entrar em nossa fila de atendimento.</h1>
      {!inputError && (
        <Modal show={showPopup} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Você é estrangeiro?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Se seu número for de outro país clique SIM</p>
            <button variant="secondary" onClick={() => handleChoice(true)}>
              Sim
            </button>
            <button variant="primary" onClick={() => handleChoice(false)}>
              Não, digitei errado
            </button>
          </Modal.Body>
        </Modal>
      )}



      <Formik
        initialValues={formData}
      >
        <Form onSubmit={contact} className="form-container">
          {errorConn && (
            
              <div class="alert alert-warning" role="alert">
                Houve um erro na conexão, entre em contato <a href={'https://api.whatsapp.com/send/?phone='+process.env.REACT_CHATWOOT_NUMBER_PHONE} target="_blank">por aqui</a>.
              </div>
          )}
          {msgWhats && (
            <div class="alert alert-success" role="alert">
              Uma mensagem foi enviada para o seu Whats'app
            </div>
          )}
          {msgWhatsError && (
            <div class="alert alert-danger" role="alert">
              Houve um erro ao enviar sua mensagem. Entre em contato por aqui
            </div>
          )}
          {inputError && (
            <div class="alert alert-danger" role="alert">
              Você precisa preencher todos os campos
            </div>
          )}
          <div>
            <div className="mb-3">
              <label class="label-login">Seu Nome</label>
              <Field class="form-control" onBlur={handleChangeInput} onChange={handleChangeInput} value={formData.name} type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>
            <div className="mb-3">
              <label class="label-login">E-mail:</label>
              <EmailInput
                class="form-control"
                onBlur={handleChangeInput}
                handleChangeInput={handleChangeInput}
                setButtonDisabled={setButtonDisabled} // Passa a função para alterar o estado do botão para o componente EmailInput
              />
            </div>
            <label class="label-login">Telefone:</label>
            <div className="mb-3">
              <PhoneInput
                className="form-control"
                placeholder="<-- Selecione o país | (DDD)Telefone"
                value={formData.phone}
                onChange={handleChangeInputPhone}
                name="phone" />
              <ErrorMessage name="phone" component="div" />
            </div>
          </div>

          <br></br>
          <button class="btn btn-primary btn-lg" type="submit" disabled={buttonDisabled} onClick={contact}>Solicitar contato</button>
          <button class="btn btn-success btn-lg btn-float-right" disabled={submit} type="button" onClick={nocontact} value={2}>Seguir com o cadastro</button>
        </Form>
      </Formik>
      <br></br>
      <div>
        <div className="form-container">

        </div>
      </div>




    </div>
  );
}

export default Contact;
