import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Redirect } from 'react-router'
import InputMask from "react-input-mask";
import apiRequest from "../../modules/apiRequest";
import User from '../../modules/User'
import GenderInput from '../forms/GenderInput'
import NationalityInput from '../forms/NationalityInput'
import EmailInput from '../forms/EmailInput'
import AlertError from '../forms/AlertError'
import MultiSelectField from '../forms/CIAPInput'; // Certifique-se de ajustar o caminho do arquivo
import PhoneInput from 'react-phone-number-input'
import Modal from 'react-bootstrap/Modal';


const AssociateSignUp = () => {

  const [user, setUser] = useState({});
  const [inputError, setInputError] = useState(false);
  const [fieldsError, setFieldsError] = useState(false);
  const [validateForm, setValidateForm] = useState();
  const [cpfError, setCpfError] = useState(false);
  const [rgError, setRgError] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const handleClose = () => setShowPopup(false);
  const handleShow = () => setShowPopup(true);

  useEffect(() => {
    (async () => {
      const userData = await User();
      setUser(userData);
    })()

    const timer = setTimeout(() => {
    }, 3000);
    return () => clearTimeout(timer);

  }, []);

  if (user.associate_status > 3) {
    window.location.assign("/")
  }


  const [formData, setFormData] = useState({
    status: "published",
    responsable_type: null,
    name_associate: null,
    lastname_associate: null,
    birthday_associate: null,
    gender: null,
    nationality: null,
    cpf_associate: null,
    rg_associate: null,
    emiiter_rg_associate: null,
    marital_status: null,
    street: null,
    number: null,
    complement: null,
    neighborhood: null,
    city: null,
    state: null,
    cep: null,
    reason_treatment: null,
    mobile_number: null,
    reason_treatment_text: null,
    associate_status: 3,
    pass_account: null,
  }
  );

  const handleChangeInput = (event) => {
    console.log()
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

  };

  const handleSelectionChange = (event) => {
    setFormData({
      ...formData,
      ["reason_treatment"]: event,
    });
  };

  const handleChandePhoneBlur = (event) => {
    const validatePhone = formData.mobile_number
    if (event.target.value && !validatePhone.includes("+55")) {
      setShowPopup(true)
    }
  }

  const handleChangeInputPhone = (event) => {
    setFormData({
      ...formData,
      ["mobile_number"]: event,
    });
    setInputError(false)
  };
  const handleChoice = (choice) => {
    handleClose();
  };


  const validateCPFAssociate = (value) => {
    if (!value) {
      return "O CPF é obrigatório";
    }
    const cleanedValue = value.replace(/[^\d]/g, "");
    if (cleanedValue.length !== 11) {
      return "O CPF deve ter 11 dígitos";
    }
    setFormData({ ...formData, cpf_associate: value })
    return undefined;
  };

  const validateRGAssociate = (value) => {
    if (!value) {
      return "O RG é obrigatório";
    }
    const cleanedValue = value.replace(/[^\d]/g, "");
    if (cleanedValue.length !== 7) {
      return "O RG deve ter 7 dígitos";
    }
    setFormData({ ...formData, rg_associate: value })
    return undefined;
  };

  const responsable_himself = (event) => {
    var responsableType = event.target.value
    setFormData({ ...formData, responsable_type: responsableType })
  };

  const responsable_another = (event) => {
    var responsableType = event.target.value
    setFormData({ ...formData, responsable_type: responsableType })
  };

  const responsable_pet = (event) => {
    var responsableType = event.target.value
    setFormData({ ...formData, responsable_type: responsableType })
  };

  const statesData = [
    { value: 'AC', label: 'Acre' },
    { value: 'AL', label: 'Alagoas' },
    { value: 'AP', label: 'Amapá' },
    { value: 'AM', label: 'Amazonas' },
    { value: 'BA', label: 'Bahia' },
    { value: 'CE', label: 'Ceará' },
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MA', label: 'Maranhão' },
    { value: 'MT', label: 'Mato Grosso' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PA', label: 'Pará' },
    { value: 'PB', label: 'Paraíba' },
    { value: 'PR', label: 'Paraná' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'PI', label: 'Piauí' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'RN', label: 'Rio Grande do Norte' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'RO', label: 'Rondônia' },
    { value: 'RR', label: 'Roraima' },
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'SP', label: 'São Paulo' },
    { value: 'SE', label: 'Sergipe' },
    { value: 'TO', label: 'Tocantins' },
  ];



  const updateUser = async (event) => {
    event.preventDefault();

    var emptyFields = []

    for (let key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (formData[key] == null || formData[key] == undefined || formData[key] == "" || formData[key] == []) {
          emptyFields.push(key)
          if (key != "mobile_number" && key != "status" && key != "associate_status" && key != "reason_treatment") {
            document.querySelector("#" + key).className = "form-control input-login input-empty"
          }
        } else {
          if (key != "mobile_number" && key != "status" && key != "associate_status" && key != "reason_treatment") {
            document.querySelector("#" + key).className = "form-control input-login"
          }
        }


        if (key == "reason_treatment") {
          document.querySelector("#" + key).className = "form-control input-login css-b62m3t-container input-empty"
        }

        if (formData.reason_treatment == [] || formData.reason_treatment == null) {
          document.querySelector("#reason_treatment").className = "css-b62m3t-container input-empty"
        } else {
          document.querySelector("#reason_treatment").className = "css-b62m3t-container"
        }
      }
    }

    if (emptyFields != []) {
      setValidateForm(true)
    } else {
      setValidateForm(false)
    }


    const validateCPF = formData.cpf_associate
    if (validateCPF && validateCPF.includes("_")) {
      setCpfError(true)
      setTimeout(() => {
        setCpfError(false)
      }, 6000)

      emptyFields.push("cpf")

    }

    const validateRg = formData.rg_associate
    if (validateRg && validateRg.includes("_")) {
      setRgError(true)
      setTimeout(() => {
        setRgError(false)
      }, 6000)

      emptyFields.push("rg")

    }

    setFieldsError(true)
    setTimeout(() => {
      setFieldsError(false)
    }, 6000)

    console.log(emptyFields)


    if (emptyFields == "" || emptyFields == []) {
      setFieldsError(false)
      await apiRequest("/api/directus/update", { "userId": user.id, "formData": formData }, "POST")
        .then(response => {

        })
        .catch(error => {
          console.error(error);
        });    

      if (formData.responsable_type == "another") {

        window.location.assign("/cadastro-paciente");

      } else {
        window.location.assign("/documentos");
      }

    }

  }



  return (
    <div>
      <Modal show={showPopup} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Você é estrangeiro?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Se seu número for de outro país clique SIM</h5>
          <button class="btn btn-primary button-modal" variant="secondary" onClick={() => handleChoice(true)}>
            Sim
          </button>
          <button class="btn btn-warning warning-button-modal  button-modal" variant="primary" onClick={() => handleChoice(false)}>
            Não, digitei errado
          </button>
        </Modal.Body>
      </Modal>

      <Formik>

        <Form onSubmit={updateUser} className="form-container ">
          <h1 className="sub-title">Você é responsável pelo seu próprio tratamento?</h1>
          <br></br>
          <div className="form-control input-login" id="responsable_type">
            <input type="radio" className="btn-check" onClick={responsable_himself} name="resposable" id="btnradio1" value="himself" ></input>
            <label className="btn btn-outline-primary radio-input" htmlFor="btnradio1">
              Sim, sou responsável pelo MEU PRÓPRIO tratamento
            </label>
            <input type="radio" className="btn-check" onClick={responsable_another} name="resposable" id="btnradio2" value="another" ></input>
            <label className="btn btn-outline-primary radio-input" htmlFor="btnradio2">
              Sou responsável pelo tratamento de OUTRA PESSOA
            </label>
            <input type="radio" className="btn-check" onClick={responsable_pet} name="resposable" id="btnradio3" value="pet" ></input>
            <label className="btn btn-outline-primary radio-input" htmlFor="btnradio3">
              Sou responsável por um PET
            </label>
          </div>

          <br></br>
          <div>
            <div className="mb-3">
              <label className="form-label" htmlFor="name_associate">Primeiro nome</label>
              <input class="form-control input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.name_associate} type="text" id="name_associate" name="name_associate" ></input>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="lastname_associate">Sobrenome</label>
              <input class="form-control input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.lastname_associate} type="text" id="lastname_associate" name="lastname_associate" ></input>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="birthday_associate">Data de nascimento</label>
              <input class="form-control input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.birthday_associate} type="date" id="birthday_associate" name="birthday_associate" ></input>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="gender">Identidade de gênero</label>
              <GenderInput name="gender" handleChangeInput={handleChangeInput} />
            </div>
            <br></br>
            <div className="mb-3">
              <label className="form-label" htmlFor="nationality">Nacionalidade</label>
              <NationalityInput name="nacionality" handleChangeInput={handleChangeInput} />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="cpf_associate">CPF</label>
              <Field class="form-control input-login" onChange={handleChangeInput} value={formData.cpf_associate} onBlur={handleChangeInput} name="cpf_associate" id="cpf_associate" validate={validateCPFAssociate}>
                {({ field, form }) => (
                  <InputMask
                    mask="999.999.999-99"
                    value={formData.cpf_associate}
                    onChange={handleChangeInput}
                    onBlur={handleChangeInput}
                  >
                    {(inputProps) => (
                      <input
                        type="text"
                        id="cpf_associate"
                        name="cpf_associate"
                        className="form-control"
                        {...inputProps}
                      />
                    )}
                  </InputMask>
                )}
              </Field>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="rg_associate">RG</label>
              <Field class="form-control input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.rg_associate} name="rg_associate" validate={validateRGAssociate}>
                {({ field, form }) => (
                  <InputMask
                    mask="9.999.999"
                    value={formData.rg_associate}
                    onChange={handleChangeInput}
                    onBlur={handleChangeInput}
                  >
                    {(inputProps) => (
                      <input
                        type="text"
                        id="rg_associate"
                        name="rg_associate"
                        className="form-control"
                        {...inputProps}
                      />
                    )}
                  </InputMask>
                )}
              </Field>
            </div>


            <div className="mb-3">
              <label className="form-label" htmlFor="emiiter_rg_associate">Orgão emissor</label>
              <input class="form-control input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.emiiter_rg_associate} type="text" id="emiiter_rg_associate" name="emiiter_rg_associate"></input>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="marital_status">Estado civil</label>
              <input class="form-control input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.marital_status} type="text" id="marital_status" name="marital_status"></input>
            </div>
            <br></br>
            <br></br>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">Defina uma senha para sua conta</label>
              <input class="form-control input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.pass_account} type="password" id="pass_account" name="pass_account"></input>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">Telefone</label>
              <PhoneInput
                id="mobile_number"
                className="form-control"
                placeholder="<-- Selecione o país | (DDD)Telefone"
                value={formData.mobile_number}
                onChange={handleChangeInputPhone}
                onBlur={handleChandePhoneBlur}
                name="mobile_number" />
              <ErrorMessage name="mobile_number" component="div" />
            </div>
            <br></br>
            <br></br>
            <div className="mb-3">
              <label className="form-label" htmlFor="street">Rua</label>
              <input class="form-control input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.street} type="text" id="street" name="street"></input>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="number">Número</label>
              <input class="form-control input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.number} type="text" id="number" name="number"></input>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="complement">Complemento</label>
              <input class="form-control input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.complement} type="text" id="complement" name="complement"></input>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="neighborhood">Bairro</label>
              <input class="form-control input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.neighborhood} type="text" id="neighborhood" name="neighborhood"></input>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="city">Cidade</label>
              <input class="form-control input-login" onChange={handleChangeInput} value={formData.city} type="text" id="city" name="city"></input>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="state">Estado</label>
              <select class="form-control input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.state} type="text" id="state" name="state" >
                <option value="">Selecione...</option>
                {statesData.map(state => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="cep">CEP</label>
              <input class="form-control input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.cep} type="text" id="cep" name="cep"></input>
            </div>
            <br></br>
            <br></br>
            <div className="mb-3">
              <label className="form-label" htmlFor="reason_treatment">Motivo principal para o tratamento</label>
              <MultiSelectField onChange={handleSelectionChange} value={formData.reason_treatment} name="reason_treatment" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="reason_treatment_text">Descreva com suas palavras o motivo do seu tratamento</label>
              <Field onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.reason_treatment_text} as="textarea" id="reason_treatment_text" name="reason_treatment_text" />
            </div>

            <button class="btn btn-success btn-lg btn-float-right" type="submit">Enviar dados</button>
          </div>

          {fieldsError && (
            <AlertError message="Você precisa preencher todos os campos" />
          )}
          {cpfError && (
            <div class="alert2">
              <AlertError message="O CPF precisa estar completo" />
            </div>
          )}
          {rgError && (
            <div class="alert3">
              <AlertError message="O RG precisa estar completo" />
            </div>
          )}



        </Form>
      </Formik>
    </div>
  );
};

export default AssociateSignUp;
