import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import InputMask from "react-input-mask";
import "../../styles/general.css"
import directusRequest from '../../modules/directusRequest'
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

const FormikForm = () => {

  const validateCPF = (value) => {
    if (!value) {
      return "O CPF é obrigatório";
    }
    const cleanedValue = value.replace(/[^\d]/g, "");
    if (cleanedValue.length !== 11) {
      return "O CPF deve ter 11 dígitos";
    }
    return undefined;
  };

  const validateRG = (value) => {
    if (!value) {
      return "O RG é obrigatório";
    }
    const cleanedValue = value.replace(/[^\d]/g, "");
    if (cleanedValue.length !== 7) {
      return "O RG deve ter 7 dígitos";
    }
    return undefined;
  };

  const [showFormTreatmentYes, setShowFormTreatmentYes] = useState(false);
  const [showFormTreatmentNo, setShowFormTreatmentNo] = useState(false);
  const [showFormPetYes, setPetYes] = useState(false);
  const [formData, setFormData] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    const userData =  User();
    setUser(userData);
    console.log(userData)

    const timer = setTimeout(() => {
    }, 3000);
    return () => clearTimeout(timer);

  }, []);

 

  const treatmentYes = (event) => {
    setShowFormTreatmentYes(true);
    setShowFormTreatmentNo(false);
  };

  const treatmentNo = (event) => {
    setShowFormTreatmentNo(true);
    setShowFormTreatmentYes(false);
    setPetYes(false);

  };

  const petYes = (event) => {
    setPetYes(true);
    setShowFormTreatmentNo(false);
  };

  const updateUser = async (event) => {
    event.preventDefault();
 
      
    var responsableType

    if (event.target.elements.responsable_himself.checked) {
      responsableType = event.target.elements.responsable_himself.value
    }
    if (event.target.elements.responsable_another.checked) {
      responsableType = event.target.elements.responsable_another.value
    }
    if (event.target.elements.responsable_pet.checked) {
      responsableType = event.target.elements.responsable_pet.value
    }

    if (event.target.elements.responsable_himself.checked || event.target.elements.responsable_pet.checked) {
      setFormData({
        status: "published",
        responsable_type: responsableType,
        name_associate: event.target.elements.associate_name.value,
        lastname_associate: event.target.elements.associate_lastname.value,
        birthday_associate: event.target.elements.birthday_responsible.value,
        gender: event.target.elements.gender.value,
        nationality: event.target.elements.nationality.value,
        cpf_associate: event.target.elements.cpf_associate.value,
        rg_associate: event.target.elements.rg_associate.value,
        emiiter_rg_associate: event.target.elements.organ_emitter.value,
        marital_status: event.target.elements.marital_status.value,
        email: event.target.elements.email.value,
        mobile_number: event.target.elements.mobile_number.value,
        secundary_number: event.target.elements.secundary_number.value,
        street: event.target.elements.street.value,
        number: event.target.elements.number.value,
        complement: event.target.elements.complement.value,
        neighborhood: event.target.elements.neighborhood.value,
        city: event.target.elements.city.value,
        state: event.target.elements.state.value,
        cep: event.target.elements.cep.value,
        proof_of_adress: event.target.elements.residence_proof.value,
        reason_treatment: event.target.elements.reason_treatment.value,
        reason_treatment_text: event.target.elements.description_reasons_treatment.value

      });

    } else {
      setFormData({
        status: "published",
        responsable_type: responsableType,
        name_associate: event.target.elements.associate_name.value,
        lastname_associate: event.target.elements.associate_lastname.value,
        birthday_associate: event.target.elements.birthday_responsible.value,
        gender: event.target.elements.gender.value,
        nationality: event.target.elements.nationality.value,
        cpf_associate: event.target.elements.cpf_associate.value,
        rg_associate: event.target.elements.rg_associate.value,
        emiiter_rg_associate: event.target.elements.organ_emitter.value,
        marital_status: event.target.elements.marital_status.value,
        email: event.target.elements.email.value,
        mobile_number: event.target.elements.mobile_number.value,
        secundary_number: event.target.elements.secundary_number.value,
        street: event.target.elements.street.value,
        number: event.target.elements.number.value,
        complement: event.target.elements.complement.value,
        neighborhood: event.target.elements.neighborhood.value,
        city: event.target.elements.city.value,
        state: event.target.elements.state.value,
        cep: event.target.elements.cep.value,
        proof_of_adress: event.target.elements.residence_proof.value,
        reason_treatment: event.target.elements.reason_treatment.value,
        reason_treatment_text: event.target.elements.description_reasons_treatment.value,
        name_patient: event.target.elements.name_patient.value,
        lastname_patient: event.target.elements.lastname_patient.value,
        birthday_patient: event.target.elements.birthday_patient.value,
        cpf_patient: event.target.elements.cpf_patient.value,
        rg_patient: event.target.elements.rg_patient.value
      });
    }

    for (var key in formData) {
      if (formData.hasOwnProperty(key) && typeof formData[key] === 'string' && formData[key].trim() === '') {
        formData[key] = null;
      }
    }
    console.log(formData)
    await directusRequest("/items/Users/"+user.id, formData, "PATCH")
      .then(response => {
        
      })
      .catch(error => {
        console.error(error);
      });   

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
              <label className="form-label" htmlFor="associate_name">Primeiro nome do responsável</label>
              <Field  type="text" id="associate_name" name="associate_name" />
              <ErrorMessage name="associate_name" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="associate_lastname">Sobrenome do responsável</label>
              <Field type="text" id="associate_lastname" name="associate_lastname" />
              <ErrorMessage name="associate_lastname" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="birthday_responsible">Data de nascimento do responsável</label>
              <Field type="date" id="birthday_responsible" name="birthday_responsible" />
              <ErrorMessage name="birthday_responsible" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="gender">Identidade de gênero</label>
              <Field type="text" id="gender" name="gender" />
              <ErrorMessage name="gender" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="nationality">Nacionalidade</label>
              <Field type="text" id="nationality" name="nationality" />
              <ErrorMessage name="nationality" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="cpf_associate">CPF do responsável</label>
              <Field name="cpf_associate" validate={validateCPF}>
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
              <Field name="rg_associate" validate={validateRG}>
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
              <Field type="text" id="organ_emitter" name="organ_emitter" />
              <ErrorMessage name="organ_emitter" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="marital_status">Estado civil</label>
              <Field type="text" id="marital_status" name="marital_status" />
              <ErrorMessage name="marital_status" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="mobile_number">Telefone celular</label>
              <Field type="text" id="mobile_number" name="mobile_number" />
              <ErrorMessage name="mobile_number" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="secundary_number">Telefone secundário</label>
              <Field type="text" id="secundary_number" name="secundary_number" />
              <ErrorMessage name="secundary_number" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="street">Rua</label>
              <Field type="text" id="street" name="street" />
              <ErrorMessage name="street" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="number">Número</label>
              <Field type="text" id="number" name="number" />
              <ErrorMessage name="number" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="complement">Complemento</label>
              <Field type="text" id="complement" name="complement" />
              <ErrorMessage name="complement" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="neighborhood">Bairro</label>
              <Field type="text" id="neighborhood" name="neighborhood" />
              <ErrorMessage name="neighborhood" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="city">Cidade</label>
              <Field type="text" id="city" name="city" />
              <ErrorMessage name="city" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="state">Estado</label>
              <Field type="text" id="state" name="state" />
              <ErrorMessage name="state" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="cep">CEP</label>
              <Field type="text" id="cep" name="cep" />
              <ErrorMessage name="cep" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="residence_proof">Comprovante de residência</label>
              <Field type="text" id="residence_proof" name="residence_proof" />
              <ErrorMessage name="residence_proof" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="name_patient">Primeiro nome do paciente</label>
              <Field type="text" id="name_patient" name="name_patient" />
              <ErrorMessage name="name_patient" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="lastname_patient">Sobrenome do paciente</label>
              <Field type="text" id="lastname_patient" name="lastname_patient" />
              <ErrorMessage name="lastname_patient" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="birthday_patient">Data de nascimento do paciente</label>
              <Field type="date" id="birthday_patient" name="birthday_patient" />
              <ErrorMessage name="birthday_patient" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="cpf_patient">CPF do paciente</label>
              <Field name="cpf_patient" validate={validateCPF}>
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
              <Field name="rg_patient" validate={validateRG}>
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
              <Field type="text" id="reason_treatment" name="reason_treatment" />
              <ErrorMessage name="reason_treatment" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="description_reasons_treatment">Descreva o motivo do tratamento</label>
              <Field as="textarea" id="description_reasons_treatment" name="description_reasons_treatment" />
              <ErrorMessage name="description_reasons_treatment" component="div" />
            </div>

            <button onClick={updateUser} type="submit">Submit</button>
          </div>)}

        {showFormTreatmentYes && (
          <div>
            <div className="mb-3">
              <label className="form-label" htmlFor="associate_name">Primeiro nome</label>
              <Field type="text" id="associate_name" name="associate_name" />
              <ErrorMessage name="associate_name" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="associate_lastname">Sobrenome</label>
              <Field type="text" id="associate_lastname" name="associate_lastname" />
              <ErrorMessage name="associate_lastname" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="birthday_responsible">Data de nascimento</label>
              <Field type="date" id="birthday_responsible" name="birthday_responsible" />
              <ErrorMessage name="birthday_responsible" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="gender">Identidade de gênero</label>
              <Field type="text" id="gender" name="gender" />
              <ErrorMessage name="gender" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="nationality">Nacionalidade</label>
              <Field type="text" id="nationality" name="nationality" />
              <ErrorMessage name="nationality" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="cpf_associate">CPF</label>
              <Field name="cpf_associate" validate={validateCPF}>
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
              <Field name="rg_associate" validate={validateRG}>
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
              <Field type="text" id="organ_emitter" name="organ_emitter" />
              <ErrorMessage name="organ_emitter" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="marital_status">Estado civil</label>
              <Field type="text" id="marital_status" name="marital_status" />
              <ErrorMessage name="marital_status" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="mobile_number">Telefone celular</label>
              <Field type="text" id="mobile_number" name="mobile_number" />
              <ErrorMessage name="mobile_number" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="secundary_number">Telefone secundário</label>
              <Field type="text" id="secundary_number" name="secundary_number" />
              <ErrorMessage name="secundary_number" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="street">Rua</label>
              <Field type="text" id="street" name="street" />
              <ErrorMessage name="street" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="number">Número</label>
              <Field type="text" id="number" name="number" />
              <ErrorMessage name="number" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="complement">Complemento</label>
              <Field type="text" id="complement" name="complement" />
              <ErrorMessage name="complement" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="neighborhood">Bairro</label>
              <Field type="text" id="neighborhood" name="neighborhood" />
              <ErrorMessage name="neighborhood" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="city">Cidade</label>
              <Field type="text" id="city" name="city" />
              <ErrorMessage name="city" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="state">Estado</label>
              <Field type="text" id="state" name="state" />
              <ErrorMessage name="state" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="cep">CEP</label>
              <Field type="text" id="cep" name="cep" />
              <ErrorMessage name="cep" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="residence_proof">Comprovante de residência</label>
              <Field type="text" id="residence_proof" name="residence_proof" />
              <ErrorMessage name="residence_proof" component="div" />
            </div>


            <div className="mb-3">
              <label className="form-label" htmlFor="reason_treatment">Motivo principal para o tratamento</label>
              <Field type="text" id="reason_treatment" name="reason_treatment" />
              <ErrorMessage name="reason_treatment" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="description_reasons_treatment">Descreva o motivo do tratamento</label>
              <Field as="textarea" id="description_reasons_treatment" name="description_reasons_treatment" />
              <ErrorMessage name="description_reasons_treatment" component="div" />
            </div>

            <button  type="submit">Submit</button>
          </div>)}

        {showFormPetYes && (
          <div>
            <div className="mb-3">
              <label className="form-label" htmlFor="associate_name">Primeiro nome</label>
              <Field type="text" id="associate_name" name="associate_name" />
              <ErrorMessage name="associate_name" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="associate_lastname">Sobrenome</label>
              <Field type="text" id="associate_lastname" name="associate_lastname" />
              <ErrorMessage name="associate_lastname" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="birthday_responsible">Data de nascimento</label>
              <Field type="date" id="birthday_responsible" name="birthday_responsible" />
              <ErrorMessage name="birthday_responsible" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="gender">Identidade de gênero</label>
              <Field type="text" id="gender" name="gender" />
              <ErrorMessage name="gender" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="nationality">Nacionalidade</label>
              <Field type="text" id="nationality" name="nationality" />
              <ErrorMessage name="nationality" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="cpf_associate">CPF</label>
              <Field name="cpf_associate" validate={validateCPF}>
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
              <Field name="rg_associate" validate={validateRG}>
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
              <Field type="text" id="organ_emitter" name="organ_emitter" />
              <ErrorMessage name="organ_emitter" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="marital_status">Estado civil</label>
              <Field type="text" id="marital_status" name="marital_status" />
              <ErrorMessage name="marital_status" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="mobile_number">Telefone celular</label>
              <Field type="text" id="mobile_number" name="mobile_number" />
              <ErrorMessage name="mobile_number" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="secundary_number">Telefone secundário</label>
              <Field type="text" id="secundary_number" name="secundary_number" />
              <ErrorMessage name="secundary_number" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="street">Rua</label>
              <Field type="text" id="street" name="street" />
              <ErrorMessage name="street" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="number">Número</label>
              <Field type="text" id="number" name="number" />
              <ErrorMessage name="number" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="complement">Complemento</label>
              <Field type="text" id="complement" name="complement" />
              <ErrorMessage name="complement" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="neighborhood">Bairro</label>
              <Field type="text" id="neighborhood" name="neighborhood" />
              <ErrorMessage name="neighborhood" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="city">Cidade</label>
              <Field type="text" id="city" name="city" />
              <ErrorMessage name="city" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="state">Estado</label>
              <Field type="text" id="state" name="state" />
              <ErrorMessage name="state" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="cep">CEP</label>
              <Field type="text" id="cep" name="cep" />
              <ErrorMessage name="cep" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="residence_proof">Comprovante de residência</label>
              <Field type="text" id="residence_proof" name="residence_proof" />
              <ErrorMessage name="residence_proof" component="div" />
            </div>


            <div className="mb-3">
              <label className="form-label" htmlFor="reason_treatment">Motivo principal para o tratamento</label>
              <Field type="text" id="reason_treatment" name="reason_treatment" />
              <ErrorMessage name="reason_treatment" component="div" />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="description_reasons_treatment">Descreva o motivo do tratamento</label>
              <Field as="textarea" id="description_reasons_treatment" name="description_reasons_treatment" />
              <ErrorMessage name="description_reasons_treatment" component="div" />
            </div>

            <button type="submit">Submit</button>
          </div>)}


      </Form>
    </Formik>
  );
};

export default FormikForm;
