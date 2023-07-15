import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Redirect } from 'react-router'
import InputMask from "react-input-mask";
import "../../styles/general.css"
import apiRequest from "../../modules/apiRequest";
import User from '../../modules/User'

const initialValues = {
  responsible: "",
  patient_is_pet: "",
  associate_name: "",
  associate_lastname: "",
  birthday_responsible: "",
  gender: "",
  nationality: "",
  cpf_associate: "",
  rg_associate: "",
  organ_emitter: "",
  marital_status: "",
  email: "",
  mobile_number: "",
  secundary_number: "",
  street: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  state: "",
  cep: "",
  residence_proof: "",
  name_patient: "",
  lastname_patient: "",
  birthday_patient: "",
  cpf_patient: "",
  rg_patient: "",
  reason_treatment: "",
  description_reasons_treatment: ""
};

const AssociateSignUp = () => {


  const [showFormTreatmentYes, setShowFormTreatmentYes] = useState(false);
  const [showFormTreatmentNo, setShowFormTreatmentNo] = useState(false);
  const [showFormPetYes, setPetYes] = useState(false); 
  const [user, setUser] = useState({});

  const associate_status = user.associate_status

  if(associate_status > 2){
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
    email: null,
    mobile_number: null,
    secundary_number: null,
    street: null,
    number: null,
    complement: null,
    neighborhood: null,
    city: null,
    state: null,
    cep: null,
    proof_of_adress: null,
    reason_treatment: null,
    reason_treatment_text: null,
    associate_status:3
  }
  
  );

  

  const handleChangeInput = (event) => {
    console.log(event.target.value)
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };


  useEffect(() => {
   (async () => {
      const userData = await User();
      setUser(userData);
    })()

    const timer = setTimeout(() => {
    }, 3000);
    return () => clearTimeout(timer);

  }, []);

  const validateCPFAssociate = (value) => {
    if (!value) {
      return "O CPF é obrigatório";
    }
    const cleanedValue = value.replace(/[^\d]/g, "");
    if (cleanedValue.length !== 11) {
      return "O CPF deve ter 11 dígitos";
    }
    setFormData({...formData,cpf_associate:value})
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
    setFormData({...formData,rg_associate:value})
    return undefined;
  };

  const validateCPFPatient = (value) => {
    if (!value) {
      return "O CPF é obrigatório";
    }
    const cleanedValue = value.replace(/[^\d]/g, "");
    if (cleanedValue.length !== 11) {
      return "O CPF deve ter 11 dígitos";
    }
    setFormData({...formData, cpf_patient:value})
    return undefined;
  };

  const validateRGPatient= (value) => {
    if (!value) {
      return "O RG é obrigatório";
    }
    const cleanedValue = value.replace(/[^\d]/g, "");
    if (cleanedValue.length !== 7) {
      return "O RG deve ter 7 dígitos";
    }
    setFormData({...formData, rg_patient:value})
    return undefined;
  };


  const treatmentYes = (event) => {
    var responsableType = event.target.value
    setFormData({...formData, responsable_type:responsableType})
    setShowFormTreatmentYes(true);
    setShowFormTreatmentNo(false);
  };

  const treatmentNo = (event) => {
    var responsableType = event.target.value
    setFormData({...formData, responsable_type:responsableType})
    setShowFormTreatmentNo(true);
    setShowFormTreatmentYes(false);
    setPetYes(false);

  };

  const petYes = (event) => {
   var  responsableType = event.target.value
    setFormData({...formData, responsable_type:responsableType})
    setPetYes(true);
    setShowFormTreatmentNo(false);
  };


  const updateUser = async (event) => {
    event.preventDefault();

    console.log(formData)

    await apiRequest("/directus/update", {"userId":user.id, "formData":formData}, "POST")
      .then(response => {

      })
      .catch(error => {
        console.error(error);
      });

      window.location.assign("/documentos");
  }


  return (

    <Formik initialValues={initialValues}>
      <Form onSubmit={updateUser} className="form-container">
        <div className="mb-3">
          <label className="form-label" htmlFor="responsible">Você é responsável pelo seu próprio tratamento?</label>
          <Field checked={showFormTreatmentYes} onClick={treatmentYes} type="radio" id="responsable_himself" name="resposable" value="himself" />
          <label className="form-label" htmlFor="responsible">Sim, sou o responsável pelo meu tratamento</label>
          <Field checked={showFormTreatmentNo} onClick={treatmentNo} type="radio" id="responsable_another" name="resposable" value="another" />
          <label className="form-label" htmlFor="responsible">Não, sou reponsável pelo tratamento de outra pessoa</label>
          <Field checked={showFormPetYes} onClick={petYes} type="radio" id="responsable_pet" name="resposable" value="pet" />
          <label className="form-label" htmlFor="responsible">Não, sou reponsável pelo tratamento de um pet</label>
          <ErrorMessage name="responsible" component="div" />
        </div>

        {showFormTreatmentNo && (
          <div>
            <div className="mb-3">
              <label className="form-label" htmlFor="name_associate">Primeiro nome do responsável</label>
              <Field onChange={handleChangeInput} value={formData.name_associate} type="text" id="name_associate" name="name_associate" />
              <ErrorMessage name="name_associate" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="lastname_associate">Sobrenome do responsável</label>
              <Field onChange={handleChangeInput} value={formData.lastname_associate} type="text" id="lastname_associate" name="lastname_associate" />
              <ErrorMessage name="lastname_associate" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="birthday_associate">Data de nascimento do responsável</label>
              <Field onChange={handleChangeInput} value={formData.birthday_associate} type="date" id="birthday_associate" name="birthday_associate" />
              <ErrorMessage name="birthday_associate" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="gender">Identidade de gênero</label>
              <Field onChange={handleChangeInput} value={formData.gender} type="text" id="gender" name="gender" />
              <ErrorMessage name="gender" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="nationality">Nacionalidade</label>
              <Field onChange={handleChangeInput} value={formData.nationality} type="text" id="nationality" name="nationality" />
              <ErrorMessage name="nationality" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="cpf_associate">CPF do responsável</label>
              <Field onChange={handleChangeInput} value={formData.cpf_associate} name="cpf_associate" id="cpf_associate" validate={validateCPFAssociate}>
                {({ field, form }) => (
                  <InputMask
                    mask="999.999.999-99"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  >
                    {(inputProps) => (
                      <input
                        type="text"
                        id="cpf_associate"
                        className={
                          form.touched.cpf_associate && form.errors.cpf_associate ? "invalid" : ""
                        }
                        {...inputProps}
                      />
                    )}
                  </InputMask>
                )}
              </Field>
              <ErrorMessage name="cpf_associate" component="div" className="error-message" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="rg_associate">RG do responsável</label>
              <Field onChange={handleChangeInput} value={formData.rg_associate} name="rg_associate" id="rg_associate" validate={validateRGAssociate}>
                {({ field, form }) => (
                  <InputMask
                    mask="9.999.999"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  >
                    {(inputProps) => (
                      <input
                        type="text"
                        id="rg_associate"
                        className={
                          form.touched.rg_associate && form.errors.rg_associate ? "invalid" : ""
                        }
                        {...inputProps}
                      />
                    )}
                  </InputMask>
                )}
              </Field>
              <ErrorMessage name="rg_associate" component="div" className="error-message" />
            </div>


            <div className="mb-3">
              <label className="form-label" htmlFor="emiiter_rg_associate">Orgão emissor</label>
              <Field onChange={handleChangeInput} value={formData.emiiter_rg_associate} type="text" id="emiiter_rg_associate" name="emiiter_rg_associate" />
              <ErrorMessage name="emiiter_rg_associate" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="marital_status">Estado civil</label>
              <Field onChange={handleChangeInput} value={formData.marital_status} type="text" id="marital_status" name="marital_status" />
              <ErrorMessage name="marital_status" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="email">Email</label>
              <Field onChange={handleChangeInput} value={formData.email} type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="mobile_number">Telefone celular</label>
              <Field onChange={handleChangeInput} value={formData.mobile_number}type="text" id="mobile_number" name="mobile_number" />
              <ErrorMessage name="mobile_number" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="secundary_number">Telefone secundário</label>
              <Field onChange={handleChangeInput} value={formData.secundary_number} type="text" id="secundary_number" name="secundary_number" />
              <ErrorMessage name="secundary_number" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="street">Rua</label>
              <Field onChange={handleChangeInput} value={formData.street} type="text" id="street" name="street" />
              <ErrorMessage name="street" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="number">Número</label>
              <Field onChange={handleChangeInput} value={formData.number} type="text" id="number" name="number" />
              <ErrorMessage name="number" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="complement">Complemento</label>
              <Field onChange={handleChangeInput} value={formData.complement} type="text" id="complement" name="complement" />
              <ErrorMessage name="complement" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="neighborhood">Bairro</label>
              <Field onChange={handleChangeInput} value={formData.neighborhood} type="text" id="neighborhood" name="neighborhood" />
              <ErrorMessage name="neighborhood" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="city">Cidade</label>
              <Field onChange={handleChangeInput}value={formData.city}  type="text" id="city" name="city" />
              <ErrorMessage name="city" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="state">Estado</label>
              <Field onChange={handleChangeInput} value={formData.state} type="text" id="state" name="state" />
              <ErrorMessage name="state" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="cep">CEP</label>
              <Field onChange={handleChangeInput} value={formData.cep} type="text" id="cep" name="cep" />
              <ErrorMessage name="cep" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="name_patient">Primeiro nome do paciente</label>
              <Field onChange={handleChangeInput} value={formData.name_patient} type="text" id="name_patient" name="name_patient" />
              <ErrorMessage name="name_patient" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="lastname_patient">Sobrenome do paciente</label>
              <Field onChange={handleChangeInput} value={formData.lastname_patient} type="text" id="lastname_patient" name="lastname_patient" />
              <ErrorMessage name="lastname_patient" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="birthday_patient">Data de nascimento do paciente</label>
              <Field onChange={handleChangeInput} value={formData.birthday_patient} type="date" id="birthday_patient" name="birthday_patient" />
              <ErrorMessage name="birthday_patient" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="cpf_patient">CPF do paciente</label>
              <Field onChange={handleChangeInput} value={formData.cpf_patient}name="cpf_patient" validate={validateCPFPatient}>
                {({ field, form }) => (
                  <InputMask
                    mask="999.999.999-99"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  >
                    {(inputProps) => (
                      <input
                        type="text"
                        id="cpf_patient"
                        className={
                          form.touched.cpf_patient && form.errors.cpf_patient ? "invalid" : ""
                        }
                        {...inputProps}
                      />
                    )}
                  </InputMask>
                )}
              </Field>
              <ErrorMessage name="cpf_patient" component="div" className="error-message" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="rg_patient">RG do paciente</label>
              <Field onChange={handleChangeInput} value={formData.rg_patient} name="rg_patient" validate={validateRGPatient}>
                {({ field, form }) => (
                  <InputMask
                    mask="9.999.999"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  >
                    {(inputProps) => (
                      <input
                        type="text"
                        id="rg_patient"
                        className={
                          form.touched.rg_patient && form.errors.rg_patient ? "invalid" : ""
                        }
                        {...inputProps}
                      />
                    )}
                  </InputMask>
                )}
              </Field>
              <ErrorMessage name="rg_patient" component="div" className="error-message" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="reason_treatment">Motivo principal para o tratamento</label>
              <Field onChange={handleChangeInput}  value={formData.reason_treatment} type="text" id="reason_treatment" name="reason_treatment" />
              <ErrorMessage name="reason_treatment" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="reason_treatment_text">Descreva o motivo do tratamento</label>
              <Field onChange={handleChangeInput} value={formData.reason_treatment_text} as="textarea" id="reason_treatment_text" name="reason_treatment_text" />
              <ErrorMessage name="reason_treatment_text" component="div" />
            </div>

            <button onClick={updateUser} type="submit">Submit</button>
          </div>)}

        {showFormTreatmentYes && (
          <div>
            <div className="mb-3">
              <label className="form-label" htmlFor="name_associate">Primeiro nome</label>
              <Field onChange={handleChangeInput} value={formData.name_associate} type="text" id="name_associate" name="name_associate" />
              <ErrorMessage name="name_associate" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="lastname_associate">Sobrenome</label>
              <Field onChange={handleChangeInput} value={formData.lastname_associate} type="text" id="lastname_associate" name="lastname_associate" />
              <ErrorMessage name="lastname_associate" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="birthday_associate">Data de nascimento</label>
              <Field onChange={handleChangeInput} value={formData.birthday_associate} type="date" id="birthday_associate" name="birthday_associate" />
              <ErrorMessage name="birthday_associate" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="gender">Identidade de gênero</label>
              <Field onChange={handleChangeInput} value={formData.gender} type="text" id="gender" name="gender" />
              <ErrorMessage name="gender" component="div" />
            </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="nationality">Nacionalidade</label>
            <Field onChange={handleChangeInput} value={formData.nationality} type="text" id="nationality" name="nationality" />
            <ErrorMessage name="nationality" component="div" />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="cpf_associate">CPF</label>
            <Field onChange={handleChangeInput} name="cpf_associate" id="cpf_associate" validate={validateCPFAssociate}>
              {({ field, form }) => (
                <InputMask
                  mask="999.999.999-99"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                >
                  {(inputProps) => (
                    <input
                      type="text"
                      id="cpf_associate"
                      className={
                        form.touched.cpf_associate && form.errors.cpf_associate ? "invalid" : ""
                      }
                      {...inputProps}
                    />
                  )}
                </InputMask>
              )}
            </Field>
            <ErrorMessage name="cpf_associate" component="div" className="error-message" />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="rg_associate">RG</label>
            <Field onChange={handleChangeInput} value={formData.rg_associate} name="rg_associate" validate={validateRGAssociate}>
              {({ field, form }) => (
                <InputMask
                  mask="9.999.999"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                >
                  {(inputProps) => (
                    <input
                      type="text"
                      id="rg_associate"
                      className={
                        form.touched.rg_associate && form.errors.rg_associate ? "invalid" : ""
                      }
                      {...inputProps}
                    />
                  )}
                </InputMask>
              )}
            </Field>
            <ErrorMessage name="rg_associate" component="div" className="error-message" />
          </div>


          <div className="mb-3">
            <label className="form-label" htmlFor="emiiter_rg_associate">Orgão emissor</label>
            <Field onChange={handleChangeInput} value={formData.emiiter_rg_associate} type="text" id="emiiter_rg_associate" name="emiiter_rg_associate" />
            <ErrorMessage name="emiiter_rg_associate" component="div" />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="marital_status">Estado civil</label>
            <Field onChange={handleChangeInput} value={formData.marital_status} type="text" id="marital_status" name="marital_status" />
            <ErrorMessage name="marital_status" component="div" />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="email">Email</label>
            <Field onChange={handleChangeInput} value={formData.email} type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="mobile_number">Telefone celular</label>
            <Field onChange={handleChangeInput} value={formData.mobile_number}type="text" id="mobile_number" name="mobile_number" />
            <ErrorMessage name="mobile_number" component="div" />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="secundary_number">Telefone secundário</label>
            <Field onChange={handleChangeInput} value={formData.secundary_number} type="text" id="secundary_number" name="secundary_number" />
            <ErrorMessage name="secundary_number" component="div" />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="street">Rua</label>
            <Field onChange={handleChangeInput} value={formData.street} type="text" id="street" name="street" />
            <ErrorMessage name="street" component="div" />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="number">Número</label>
            <Field onChange={handleChangeInput} value={formData.number} type="text" id="number" name="number" />
            <ErrorMessage name="number" component="div" />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="complement">Complemento</label>
            <Field onChange={handleChangeInput} value={formData.complement} type="text" id="complement" name="complement" />
            <ErrorMessage name="complement" component="div" />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="neighborhood">Bairro</label>
            <Field onChange={handleChangeInput} value={formData.neighborhood} type="text" id="neighborhood" name="neighborhood" />
            <ErrorMessage name="neighborhood" component="div" />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="city">Cidade</label>
            <Field onChange={handleChangeInput}value={formData.city}  type="text" id="city" name="city" />
            <ErrorMessage name="city" component="div" />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="state">Estado</label>
            <Field onChange={handleChangeInput} value={formData.state} type="text" id="state" name="state" />
            <ErrorMessage name="state" component="div" />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="cep">CEP</label>
            <Field onChange={handleChangeInput} value={formData.cep} type="text" id="cep" name="cep" />
            <ErrorMessage name="cep" component="div" />
          </div>

          <div className="mb-3">
              <label className="form-label" htmlFor="reason_treatment">Motivo principal para o tratamento</label>
              <Field onChange={handleChangeInput}  value={formData.reason_treatment} type="text" id="reason_treatment" name="reason_treatment" />
              <ErrorMessage name="reason_treatment" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="reason_treatment_text">Descreva o motivo do tratamento</label>
              <Field onChange={handleChangeInput} value={formData.reason_treatment_text} as="textarea" id="reason_treatment_text" name="reason_treatment_text" />
              <ErrorMessage name="reason_treatment_text" component="div" />
            </div>

            <button type="submit">Submit</button>
          </div>)}

        {showFormPetYes && (
           <div>
            <div className="mb-3">
              <label className="form-label" htmlFor="name_associate">Primeiro nome</label>
              <Field onChange={handleChangeInput} value={formData.name_associate} type="text" id="name_associate" name="name_associate" />
              <ErrorMessage name="name_associate" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="lastname_associate">Sobrenome</label>
              <Field onChange={handleChangeInput} value={formData.lastname_associate} type="text" id="lastname_associate" name="lastname_associate" />
              <ErrorMessage name="lastname_associate" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="birthday_associate">Data de nascimento</label>
              <Field onChange={handleChangeInput} value={formData.birthday_associate} type="date" id="birthday_associate" name="birthday_associate" />
              <ErrorMessage name="birthday_associate" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="gender">Identidade de gênero</label>
              <Field onChange={handleChangeInput} value={formData.gender} type="text" id="gender" name="gender" />
              <ErrorMessage name="gender" component="div" />
            </div>
 
           <div className="mb-3">
             <label className="form-label" htmlFor="nationality">Nacionalidade</label>
             <Field onChange={handleChangeInput} value={formData.nationality} type="text" id="nationality" name="nationality" />
             <ErrorMessage name="nationality" component="div" />
           </div>
 
           <div className="mb-3">
             <label className="form-label" htmlFor="cpf_associate">CPF do responsável</label>
             <Field onChange={handleChangeInput} value={formData.cpf_associate} name="cpf_associate" validate={validateCPFAssociate}>
               {({ field, form }) => (
                 <InputMask
                   mask="999.999.999-99"
                   value={field.value}
                   onChange={field.onChange}
                   onBlur={field.onBlur}
                 >
                   {(inputProps) => (
                     <input
                       type="text"
                       id="cpf_associate"
                       className={
                         form.touched.cpf_associate && form.errors.cpf_associate ? "invalid" : ""
                       }
                       {...inputProps}
                     />
                   )}
                 </InputMask>
               )}
             </Field>
             <ErrorMessage name="cpf_associate" component="div" className="error-message" />
           </div>
 
           <div className="mb-3">
             <label className="form-label" htmlFor="rg_associate">RG do responsável</label>
             <Field onChange={handleChangeInput} value={formData.rg_associate} name="rg_associate" validate={validateRGAssociate}>
               {({ field, form }) => (
                 <InputMask
                   mask="9.999.999"
                   value={field.value}
                   onChange={field.onChange}
                   onBlur={field.onBlur}
                 >
                   {(inputProps) => (
                     <input
                       type="text"
                       id="rg_associate"
                       className={
                         form.touched.rg_associate && form.errors.rg_associate ? "invalid" : ""
                       }
                       {...inputProps}
                     />
                   )}
                 </InputMask>
               )}
             </Field>
             <ErrorMessage name="rg_associate" component="div" className="error-message" />
           </div>
 
 
           <div className="mb-3">
             <label className="form-label" htmlFor="organ_emitter">Orgão emissor</label>
             <Field onChange={handleChangeInput} value={formData.emiiter_rg_associate} type="text" id="organ_emitter" name="organ_emitter" />
             <ErrorMessage name="organ_emitter" component="div" />
           </div>
 
           <div className="mb-3">
             <label className="form-label" htmlFor="marital_status">Estado civil</label>
             <Field onChange={handleChangeInput} value={formData.marital_status} type="text" id="marital_status" name="marital_status" />
             <ErrorMessage name="marital_status" component="div" />
           </div>
 
           <div className="mb-3">
             <label className="form-label" htmlFor="email">Email</label>
             <Field onChange={handleChangeInput} value={formData.email} type="email" id="email" name="email" />
             <ErrorMessage name="email" component="div" />
           </div>
 
           <div className="mb-3">
             <label className="form-label" htmlFor="mobile_number">Telefone celular</label>
             <Field onChange={handleChangeInput} value={formData.mobile_number}type="text" id="mobile_number" name="mobile_number" />
             <ErrorMessage name="mobile_number" component="div" />
           </div>
 
           <div className="mb-3">
             <label className="form-label" htmlFor="secundary_number">Telefone secundário</label>
             <Field onChange={handleChangeInput} value={formData.secundary_number} type="text" id="secundary_number" name="secundary_number" />
             <ErrorMessage name="secundary_number" component="div" />
           </div>
 
           <div className="mb-3">
             <label className="form-label" htmlFor="street">Rua</label>
             <Field onChange={handleChangeInput} value={formData.street} type="text" id="street" name="street" />
             <ErrorMessage name="street" component="div" />
           </div>
 
           <div className="mb-3">
             <label className="form-label" htmlFor="number">Número</label>
             <Field onChange={handleChangeInput} value={formData.number} type="text" id="number" name="number" />
             <ErrorMessage name="number" component="div" />
           </div>
 
           <div className="mb-3">
             <label className="form-label" htmlFor="complement">Complemento</label>
             <Field onChange={handleChangeInput} value={formData.complement} type="text" id="complement" name="complement" />
             <ErrorMessage name="complement" component="div" />
           </div>
 
           <div className="mb-3">
             <label className="form-label" htmlFor="neighborhood">Bairro</label>
             <Field onChange={handleChangeInput} value={formData.neighborhood} type="text" id="neighborhood" name="neighborhood" />
             <ErrorMessage name="neighborhood" component="div" />
           </div>
 
           <div className="mb-3">
             <label className="form-label" htmlFor="city">Cidade</label>
             <Field onChange={handleChangeInput}value={formData.city}  type="text" id="city" name="city" />
             <ErrorMessage name="city" component="div" />
           </div>
 
           <div className="mb-3">
             <label className="form-label" htmlFor="state">Estado</label>
             <Field onChange={handleChangeInput} value={formData.state} type="text" id="state" name="state" />
             <ErrorMessage name="state" component="div" />
           </div>
 
           <div className="mb-3">
             <label className="form-label" htmlFor="cep">CEP</label>
             <Field onChange={handleChangeInput} value={formData.cep} type="text" id="cep" name="cep" />
             <ErrorMessage name="cep" component="div" />
           </div>
 
           <div className="mb-3">
               <label className="form-label" htmlFor="reason_treatment">Motivo principal para o tratamento</label>
               <Field onChange={handleChangeInput}  value={formData.reason_treatment} type="text" id="reason_treatment" name="reason_treatment" />
               <ErrorMessage name="reason_treatment" component="div" />
             </div>
 
             <div className="mb-3">
               <label className="form-label" htmlFor="reason_treatment_text">Descreva o motivo do tratamento</label>
               <Field onChange={handleChangeInput} value={formData.reason_treatment_text} as="textarea" id="reason_treatment_text" name="reason_treatment_text" />
               <ErrorMessage name="reason_treatment_text" component="div" />
             </div>
 
             <button type="submit">Submit</button>
           </div>)}


      </Form>
    </Formik>
  );
};

export default AssociateSignUp;
