import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import apiRequest from "../../modules/apiRequest";
import User from "../../modules/User";
import GenderInput from "../forms/GenderInput";
import NationalityInput from "../forms/NationalityInput";
import LabelInfo from "../pages/elements/labelInfo";
import AlertError from "../forms/AlertError";
import MultiSelectField from "../forms/CIAPInput";
import Modal from "react-bootstrap/Modal";
import PhoneInputs from "../forms/PhoneNumberInput";


const AssociateSignUp = () => {
  const [user, setUser] = useState({});
  const [inputError, setInputError] = useState(false);
  const [fieldsError, setFieldsError] = useState(false);
  const [validateForm, setValidateForm] = useState();
  const [cpfError, setCpfError] = useState(false);
  const [cpfNotValid, setCpfNotValid] = useState(false);
  const [rgError, setRgError] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const handleClose = () => setShowPopup(false);
  const handleShow = () => setShowPopup(true);

  useEffect(() => {
    (async () => {
      const userData = await User();
      setUser(userData);
    })();

    const timer = setTimeout(() => { }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (user.associate_status > 3) {
    window.location.assign("/");
  }

  const [phone, setPhone] = useState("");

  const handleOnChange = (value, country) => {
    setPhone(value);
  };

  const [formData, setFormData] = useState({
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
  });

  const handleChangeInput = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectionChange = event => {
    setFormData({
      ...formData,
      ["reason_treatment"]: event.target.value,
    });
  };

  const handleChangeInputPhone = event => {
    setFormData({
      ...formData,
      ["mobile_number"]: event,
    });
    setInputError(false);
  };
  const handleChoice = choice => {
    handleClose();
  };

  const responsable_himself = event => {
    var responsableType = event.target.value;
    setFormData({ ...formData, responsable_type: responsableType });
  };

  const responsable_another = event => {
    var responsableType = event.target.value;
    setFormData({ ...formData, responsable_type: responsableType });
  };

  const responsable_pet = event => {
    var responsableType = event.target.value;
    setFormData({ ...formData, responsable_type: responsableType });
  };

  const statesData = [
    { value: "AC", label: "Acre" },
    { value: "AL", label: "Alagoas" },
    { value: "AP", label: "Amapá" },
    { value: "AM", label: "Amazonas" },
    { value: "BA", label: "Bahia" },
    { value: "CE", label: "Ceará" },
    { value: "DF", label: "Distrito Federal" },
    { value: "ES", label: "Espírito Santo" },
    { value: "GO", label: "Goiás" },
    { value: "MA", label: "Maranhão" },
    { value: "MT", label: "Mato Grosso" },
    { value: "MS", label: "Mato Grosso do Sul" },
    { value: "MG", label: "Minas Gerais" },
    { value: "PA", label: "Pará" },
    { value: "PB", label: "Paraíba" },
    { value: "PR", label: "Paraná" },
    { value: "PE", label: "Pernambuco" },
    { value: "PI", label: "Piauí" },
    { value: "RJ", label: "Rio de Janeiro" },
    { value: "RN", label: "Rio Grande do Norte" },
    { value: "RS", label: "Rio Grande do Sul" },
    { value: "RO", label: "Rondônia" },
    { value: "RR", label: "Roraima" },
    { value: "SC", label: "Santa Catarina" },
    { value: "SP", label: "São Paulo" },
    { value: "SE", label: "Sergipe" },
    { value: "TO", label: "Tocantins" },
  ];

  const updateUser = async event => {
    event.preventDefault();

    var emptyFields = [];

    for (let key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (formData[key] == null || formData[key] == undefined || formData[key] == "" || formData[key] == []) {
          emptyFields.push(key);
          if (key != "mobile_number" && key != "status" && key != "associate_status" && key != "reason_treatment") {
            document.querySelector("#" + key).className = "form-input input-login input-empty";
          }
        } else {
          if (key != "mobile_number" && key != "status" && key != "associate_status" && key != "reason_treatment") {
            document.querySelector("#" + key).className = "form-input input-login";
          }
        }
           if (formData.reason_treatment == [] || formData.reason_treatment == null) {
          document.querySelector("#reason_treatment").className = "css-b62m3t-container input-empty";
        } else {
          document.querySelector("#reason_treatment").className = "css-b62m3t-container";
        }
      }
    }

    if (emptyFields != []) {
      setValidateForm(true);
    } else {
      setValidateForm(false);
    }

    const validateCPF = formData.cpf_associate;
    if (validateCPF && validateCPF.includes("_")) {
      setCpfError(true);
      setTimeout(() => {
        setCpfError(false);
      }, 6000);

      emptyFields.push("cpf");
    } else {
      function realCPF(cpf) {
        if(formData.cpf_associate){
        cpf = cpf.replace(/[^\d]+/g, "");
        if (cpf.length !== 11) return false;

        let soma = 0;
        for (let i = 0; i < 9; i++) {
          soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = 11 - (soma % 11);
        let digito1 = resto === 10 || resto === 11 ? 0 : resto;

        soma = 0;
        for (let i = 0; i < 10; i++) {
          soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = 11 - (soma % 11);
        let digito2 = resto === 10 || resto === 11 ? 0 : resto;

        return parseInt(cpf.charAt(9)) === digito1 && parseInt(cpf.charAt(10)) === digito2;
      }
      }

      if (!realCPF(validateCPF)) {
        emptyFields.push("cpf");
        setCpfNotValid(true);
        setTimeout(() => {
          setCpfNotValid(false);
        }, 6000);
      }
    }

    const validateRg = formData.rg_associate;
    if (validateRg && validateRg.includes("_")) {
      setRgError(true);
      setTimeout(() => {
        setRgError(false);
      }, 6000);

      emptyFields.push("rg");
    }

    setFieldsError(true);
    setTimeout(() => {
      setFieldsError(false);
    }, 6000);

    if (emptyFields == "" || emptyFields == []) {
      setFieldsError(false);
      formData.status = "registered"
      formData.log = "Registered OK"
      await apiRequest("/api/directus/update", { userId: user.id, formData: formData}, "POST")
        .then(response => { })
        .catch(error => {
          console.error(error);
        });

      if (formData.responsable_type == "another") {
        window.location.assign("/cadastro-paciente");
      } else {
        window.location.assign("/documentos");
      }
    }else{
      await apiRequest("/api/directus/update", { userId: user.id, formData:{status: "formerror", log:{"formError":{"emptyFields":emptyFields}}}}, "POST")
      
     }
  };

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

      <form onSubmit={updateUser} className="form-container ">
        <h1 className="sub-title">Você é responsável pelo seu próprio tratamento?</h1>
        <br></br>

        <div className="form-input input-login" id="responsable_type">
          <input type="radio" className="btn-check" onClick={responsable_himself} name="resposable" id="btnradio1" value="himself"></input>
          <label className="btn btn-outline-primary radio-input" htmlFor="btnradio1">
            Sim, sou responsável pelo MEU PRÓPRIO tratamento
          </label>
          <input type="radio" className="btn-check" onClick={responsable_another} name="resposable" id="btnradio2" value="another"></input>
          <label className="btn btn-outline-primary radio-input" htmlFor="btnradio2">
            Sou responsável pelo tratamento de OUTRA PESSOA
          </label>
          <input type="radio" className="btn-check" onClick={responsable_pet} name="resposable" id="btnradio3" value="pet"></input>
          <label className="btn btn-outline-primary radio-input" htmlFor="btnradio3">
            Sou responsável por um PET
          </label>
        </div>

        <br></br>
        <div>
          <div className="mb-3">
            <label className="form-label" htmlFor="name_associate">
              Primeiro nome
            </label>
            <input class="form-input input-login" placeholder="Digite seu primeiro nome" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.name_associate} type="text" id="name_associate" name="name_associate"></input>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="lastname_associate">
              Sobrenome
            </label>
            <input class="form-input input-login" placeholder="Digite seu sobrenome" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.lastname_associate} type="text" id="lastname_associate" name="lastname_associate"></input>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="birthday_associate">
              Data de nascimento
            </label>
            <input class="form-input input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.birthday_associate} type="date" id="birthday_associate" name="birthday_associate"></input>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="gender">
              Identidade de gênero <LabelInfo message="Escolha o gênero ou digite com qual você se identifica" id="gen" />
            </label>
            <GenderInput className="form-input" name="gender" handleChangeInput={handleChangeInput} />
          </div>
          <br></br>
          <div className="mb-3">
            <label className="form-label" htmlFor="nationality">
              Nacionalidade <LabelInfo message="Escolha o país onde nasceu" id="nac" />
            </label>
            <NationalityInput name="nacionality" handleChangeInput={handleChangeInput} />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="cpf_associate">
              CPF <LabelInfo message="Necessário para a geração doo termo de responsabilidade do associado" id="cpf" />
            </label>
            <InputMask mask="999.999.999-99" value={formData.cpf_associate} onChange={handleChangeInput} onBlur={handleChangeInput}>
              {inputProps => <input placeholder="Digite seu CPF" type="text" value={formData.cpf_associate} id="cpf_associate" name="cpf_associate" className="form-input" {...inputProps} />}
            </InputMask>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="rg_associate">
              RG <LabelInfo message="Necessário para a geração doo termo de responsabilidade do associado" id="rg" />
            </label>

            <InputMask mask="9.999.999" value={formData.rg_associate} onChange={handleChangeInput} onBlur={handleChangeInput}>
              {inputProps => <input placeholder="Digite seu RG" type="text" value={formData.rg_associate} id="rg_associate" name="rg_associate" className="form-input" {...inputProps} />}
            </InputMask>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="emiiter_rg_associate">
              Orgão emissor <LabelInfo message="Informe o orgão emissor do seu rg" id="org" />
            </label>
            <input placeholder="Digite o orgão emissor do seu RG" class="form-input input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.emiiter_rg_associate} type="text" id="emiiter_rg_associate" name="emiiter_rg_associate"></input>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="marital_status">
              Estado civil
            </label>
            <select class="form-input input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.marital_status} type="text" id="marital_status" name="marital_status">
              <option value="">Selecione...</option>
              <option value="Solteiro">Solteiro(a)</option>
              <option value="Casado">Casado(a)</option>
              <option value="Viúvo">Viúvo(a)</option>
              <option value="Divorciado">Divorciado(a)</option>
            </select>
          </div>
          <br></br>
          <br></br>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Defina uma senha para sua conta <LabelInfo message="Criar uma senha é necessário para poder acessar o sistema novamente e poder editar seus dados" id="pass" />
            </label>
            <input placeholder="Digite uma senha para sua conta" class="form-input input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.pass_account} type="password" id="pass_account" name="pass_account"></input>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Telefone
            </label>
            <PhoneInputs id="mobile_number" value={formData.mobile_number} onChange={handleChangeInputPhone} onBlur={handleChangeInputPhone} handleChangeInput={handleChangeInputPhone} name="mobile_number" />
          </div>
          <br></br>
          <br></br>
          <div className="mb-3">
            <label className="form-label" htmlFor="street">
              Rua
            </label>
            <input placeholder="Digite o nome da sua rua" class="form-input input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.street} type="text" id="street" name="street"></input>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="number">
              Número
            </label>
            <input placeholder="Digite o número da sua casa ou ap" class="form-input input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.number} type="text" id="number" name="number"></input>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="complement">
              Complemento
            </label>
            <input placeholder="Digite um complemento para seu endereço" class="form-input input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.complement} type="text" id="complement" name="complement"></input>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="neighborhood">
              Bairro
            </label>
            <input placeholder="Digite seu bairro" class="form-input input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.neighborhood} type="text" id="neighborhood" name="neighborhood"></input>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="city">
              Cidade
            </label>
            <input placeholder="Digite sua cidade" class="form-input input-login" onChange={handleChangeInput} value={formData.city} type="text" id="city" name="city"></input>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="state">
              Estado
            </label>
            <select class="form-input input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.state} type="text" id="state" name="state">
              <option value="">Selecione...</option>
              {statesData.map(state => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="cep">
              CEP
            </label>
            <input placeholder="Informe seu CEP" class="form-input input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.cep} type="text" id="cep" name="cep"></input>
          </div>
          <br></br>
          <br></br>
          <div className="mb-3">
            <label className="form-label" htmlFor="reason_treatment">
              Motivo principal para o tratamento
            </label>
            {/* <MultiSelectField onChange={handleSelectionChange} value={formData.reason_treatment} name="reason_treatment" /> */}
            <select  class="form-input input-login"  onChange={handleSelectionChange} value={formData.reason_treatment} name="reason_treatment" id="reason_treatment" ><option value="">Escolha uma opção</option><option value="ABSTINÊNCIA ALCOÓLICA">ABSTINÊNCIA ALCOÓLICA</option><option value="AFASIA PROGRESSIVA PRIMARIA">AFASIA PROGRESSIVA PRIMARIA</option><option value="AGRESSIVIDADE">AGRESSIVIDADE</option><option value="ALCOOLISMO">ALCOOLISMO</option><option value="ALERGIA">ALERGIA</option><option value="ALTERAÇÕES COMPORTAMENTAIS">ALTERAÇÕES COMPORTAMENTAIS</option><option value="ALTERAÇÕES HEPÁTICAS">ALTERAÇÕES HEPÁTICAS</option><option value="ALTERAÇÕES OSTEODISTROFICAS NAS VÉRTEBRAS">ALTERAÇÕES OSTEODISTROFICAS NAS VÉRTEBRAS</option><option value="ALZHEIMER">ALZHEIMER</option><option value="ANOMALIA CEREBRAL">ANOMALIA CEREBRAL</option><option value="ANOREXIA">ANOREXIA</option><option value="ANSIEDADE">ANSIEDADE</option><option value="APILEPSIA IDIOPÁTICA">APILEPSIA IDIOPÁTICA</option><option value="ARRITMIA CARDÍACA">ARRITMIA CARDÍACA</option><option value="ARTRALGIA">ARTRALGIA</option><option value="ARTRITE">ARTRITE</option><option value="ARTRITE INDIFERENCIADA">ARTRITE INDIFERENCIADA</option><option value="ARTRITE PSORIÁSICA">ARTRITE PSORIÁSICA</option><option value="ARTRITE REUMATOIDE">ARTRITE REUMATOIDE</option><option value="ARTROSE">ARTROSE</option><option value="ARTROSE CRÔNICA">ARTROSE CRÔNICA</option><option value="ASMA">ASMA</option><option value="ASPERGER">ASPERGER</option><option value="ATAXIA">ATAXIA</option><option value="ATOPIA">ATOPIA</option><option value="ATRASO COORDENAÇÃO MOTORA">ATRASO COORDENAÇÃO MOTORA</option><option value="ATRASO NA FALA">ATRASO NA FALA</option><option value="ATRITE PSORIASICA">ATRITE PSORIASICA</option><option value="AUTISMO">AUTISMO</option><option value="AUTOMUTILAÇÃO">AUTOMUTILAÇÃO</option><option value="AVC">AVC</option><option value="AVC HEMORRÁGICO">AVC HEMORRÁGICO</option><option value="AVE">AVE</option><option value="BICO DE PAPAGAIO">BICO DE PAPAGAIO</option><option value="BIRRA">BIRRA</option><option value="BORDERLINE">BORDERLINE</option><option value="BRONQUITE">BRONQUITE</option><option value="BRUXISMO">BRUXISMO</option><option value="BURSITE">BURSITE</option><option value="BUSCA DE EQUILÍBRIO EMOCIONAL">BUSCA DE EQUILÍBRIO EMOCIONAL</option><option value="CÂNCER">CÂNCER</option><option value="CÂNCER BENIGNO">CÂNCER BENIGNO</option><option value="CÂNCER CEREBRAL">CÂNCER CEREBRAL</option><option value="CÂNCER COM METASTASE">CÂNCER COM METASTASE</option><option value="CÂNCER DE COLON">CÂNCER DE COLON</option><option value="CÂNCER DE ENDOMÉTRIO E OVÁRIO">CÂNCER DE ENDOMÉTRIO E OVÁRIO</option><option value="CÂNCER DE ESTÔMAGO">CÂNCER DE ESTÔMAGO</option><option value="CÂNCER DE FÍGADO">CÂNCER DE FÍGADO</option><option value="CÂNCER DE MAMA">CÂNCER DE MAMA</option><option value="CÂNCER DE MANDÍBULA">CÂNCER DE MANDÍBULA</option><option value="CÂNCER DE PULMÃO">CÂNCER DE PULMÃO</option><option value="CÂNCER NA BEXIGA">CÂNCER NA BEXIGA</option><option value="CÂNCER NO INTESTINO">CÂNCER NO INTESTINO</option><option value="CÂNCER TERMINAL - MELANOMA">CÂNCER TERMINAL - MELANOMA</option><option value="CARCINOMA">CARCINOMA</option><option value="CARCINOMA DE BEXIGA">CARCINOMA DE BEXIGA</option><option value="CARCINOMA DE SACO ANAL">CARCINOMA DE SACO ANAL</option><option value="CARCINOMA INVASIVO DE MAMA">CARCINOMA INVASIVO DE MAMA</option><option value="CHORO">CHORO</option><option value="CICLO CIRCADIANO ALTERADO">CICLO CIRCADIANO ALTERADO</option><option value="CID 10: 31.2">CID 10: 31.2</option><option value="CID 10: 6808">CID 10: 6808</option><option value="CID 10: 90">CID 10: 90</option><option value="CID 10: 91">CID 10: 91</option><option value="CID 10: 91.3">CID 10: 91.3</option><option value="CID 10: C50">CID 10: C50</option><option value="CID 10: CID 10: F33.2">CID 10: CID 10: F33.2</option><option value="CID 10: F32.2">CID 10: F32.2</option><option value="CID 10: F33.1: DEPRESSÃO BIPOLAR">CID 10: F33.1: DEPRESSÃO BIPOLAR</option><option value="CID 10: F33.2">CID 10: F33.2</option><option value="CID 10: F41.1">CID 10: F41.1</option><option value="CID 10: F43.2 - TEPT">CID 10: F43.2 - TEPT</option><option value="CID 10: F60.3">CID 10: F60.3</option><option value="CID 10: F72">CID 10: F72</option><option value="CID 10: F72.1">CID 10: F72.1</option><option value="CID 10: F720">CID 10: F720</option><option value="CID 10: G11.9">CID 10: G11.9</option><option value="CID 10: G20">CID 10: G20</option><option value="CID 10: G30.1">CID 10: G30.1</option><option value="CID 10: M51.1 - TRANSTORNOS DE DISCOS LOMBARES E DE OUTROS DISCOS INTERVERTEBRAIS COM RADICULOPATIA">CID 10: M51.1 - TRANSTORNOS DE DISCOS LOMBARES E DE OUTROS DISCOS INTERVERTEBRAIS COM RADICULOPATIA</option><option value="CINOMOSE">CINOMOSE</option><option value="CINOMOSE VACINAL">CINOMOSE VACINAL</option><option value="CIRROSE HEPÁTICA">CIRROSE HEPÁTICA</option><option value="CONDROPATIA FEMOROACETABULAR">CONDROPATIA FEMOROACETABULAR</option><option value="CONDROPATIA PATELAR">CONDROPATIA PATELAR</option><option value="CONSTIPAÇÃO INTESTINAL PERSISTENTE">CONSTIPAÇÃO INTESTINAL PERSISTENTE</option><option value="COXOARTROSE">COXOARTROSE</option><option value="CROHN">CROHN</option><option value="DAD">DAD</option><option value="DB">DB</option><option value="DEBILIDADE FÍSICA POR IDADE">DEBILIDADE FÍSICA POR IDADE</option><option value="DEFICIÊNCIA DE CARNITINA PALMITOIL TRANSFERASE TIPO 2">DEFICIÊNCIA DE CARNITINA PALMITOIL TRANSFERASE TIPO 2</option><option value="DEFICIÊNCIA INTELECTUAL">DEFICIÊNCIA INTELECTUAL</option><option value="DEFICIENCIA MENTAL CONGENITA">DEFICIENCIA MENTAL CONGENITA</option><option value="DÉFICIT COGNITIVO">DÉFICIT COGNITIVO</option><option value="DÉFICIT DE ATENÇÃO">DÉFICIT DE ATENÇÃO</option><option value="DEGENERAÇÃO CEREBRAL">DEGENERAÇÃO CEREBRAL</option><option value="DEMÊNCIA">DEMÊNCIA</option><option value="DEMÊNCIA DE PICK">DEMÊNCIA DE PICK</option><option value="DEMÊNCIA POR CORPOS DE LEVY">DEMÊNCIA POR CORPOS DE LEVY</option><option value="DEMÊNCIA SENIL">DEMÊNCIA SENIL</option><option value="DEPENDENCIA QUÍMICA">DEPENDENCIA QUÍMICA</option><option value="DEPRESSÃO">DEPRESSÃO</option><option value="DERMATITE">DERMATITE</option><option value="DERMATITE ATÓPICA">DERMATITE ATÓPICA</option><option value="DESMAME DE BENZODIAZEPÍNICO">DESMAME DE BENZODIAZEPÍNICO</option><option value="DIABETES">DIABETES</option><option value="DIFICULDADE PARA CONCENTRAR">DIFICULDADE PARA CONCENTRAR</option><option value="DII">DII</option><option value="DISCENESIA PAROXÍSTICA">DISCENESIA PAROXÍSTICA</option><option value="DISCOPATIA">DISCOPATIA</option><option value="DISCOPATIA LOMBAR">DISCOPATIA LOMBAR</option><option value="DISFAGIA">DISFAGIA</option><option value="DISFUNÇÃO COGNITIVA">DISFUNÇÃO COGNITIVA</option><option value="DISFUNÇÃO TEMPOROMANDIBULAR">DISFUNÇÃO TEMPOROMANDIBULAR</option><option value="DISLEXIA">DISLEXIA</option><option value="DISPLASIA COXA FEMURAL">DISPLASIA COXA FEMURAL</option><option value="DISTÚRBIO COGNITIVO">DISTÚRBIO COGNITIVO</option><option value="DISTÚRBIO COMPORTAMENTAL">DISTÚRBIO COMPORTAMENTAL</option><option value="DISTÚRBIO DO SONO">DISTÚRBIO DO SONO</option><option value="DISTÚRBIO MENTAL">DISTÚRBIO MENTAL</option><option value="DISTÚRBIO NEUROLÓGICO">DISTÚRBIO NEUROLÓGICO</option><option value="DOENÇA DE HUNTINGTON">DOENÇA DE HUNTINGTON</option><option value="DOENÇA DEGENERATIVA">DOENÇA DEGENERATIVA</option><option value="DOENÇA DEGENERATIVA ARTICULAR">DOENÇA DEGENERATIVA ARTICULAR</option><option value="DOENÇA DOS DISCOS INTERVERTEBRAIS">DOENÇA DOS DISCOS INTERVERTEBRAIS</option><option value="DOENÇA INFLAMATÓRIA INTESTINAL">DOENÇA INFLAMATÓRIA INTESTINAL</option><option value="DOENÇA RENAL CRÔNICA">DOENÇA RENAL CRÔNICA</option><option value="DOR ARTICULAR">DOR ARTICULAR</option><option value="DOR CRÔNICA">DOR CRÔNICA</option><option value="DOR MIOFASCIAL">DOR MIOFASCIAL</option><option value="DOR NEUROLÓGICA">DOR NEUROLÓGICA</option><option value="DOR OROFACIAL">DOR OROFACIAL</option><option value="DOR REUMÁTICA">DOR REUMÁTICA</option><option value="DORES ARTICULARES">DORES ARTICULARES</option><option value="DTM">DTM</option><option value="EFEITOS COLATERAIS">EFEITOS COLATERAIS</option><option value="ELA BULBAR - ESCLEROSE LATERAL AMIOTRÓFICA BULBAR">ELA BULBAR - ESCLEROSE LATERAL AMIOTRÓFICA BULBAR</option><option value="ENDOMETRIOSE">ENDOMETRIOSE</option><option value="ENXAQUECA">ENXAQUECA</option><option value="EPILEPSIA">EPILEPSIA</option><option value="EPILEPSIA DE DIFÍCIL CONTROLE">EPILEPSIA DE DIFÍCIL CONTROLE</option><option value="EPILEPSIA FOCAL">EPILEPSIA FOCAL</option><option value="EPILEPSIA IDIOPÁTICA">EPILEPSIA IDIOPÁTICA</option><option value="EPILEPSIA LOBO TEMPORAL">EPILEPSIA LOBO TEMPORAL</option><option value="EPILEPSIA REFRATÁRIA">EPILEPSIA REFRATÁRIA</option><option value="ESCLERODERMIA SISTÊMICA">ESCLERODERMIA SISTÊMICA</option><option value="ESCLEROSE MESIAL TEMPORAL">ESCLEROSE MESIAL TEMPORAL</option><option value="ESCLEROSE MÚLTIPLA">ESCLEROSE MÚLTIPLA</option><option value="ESCLEROSE SISTÊMICA">ESCLEROSE SISTÊMICA</option><option value="ESPASMOS MUSCULARES">ESPASMOS MUSCULARES</option><option value="ESPONDILITE ANQUILOSANTE">ESPONDILITE ANQUILOSANTE</option><option value="ESPONDILOARTRITE">ESPONDILOARTRITE</option><option value="ESQUECIMENTO">ESQUECIMENTO</option><option value="ESQUIZOFRENIA PARANOIDE">ESQUIZOFRENIA PARANOIDE</option><option value="ESTENOSE CERVICAL">ESTENOSE CERVICAL</option><option value="ESTOMATITE">ESTOMATITE</option><option value="FALTA DE APETITE">FALTA DE APETITE</option><option value="FALTA DE EQUILÍBRIO">FALTA DE EQUILÍBRIO</option><option value="FECALOMA">FECALOMA</option><option value="FELV">FELV</option><option value="FIBROMIALGIA">FIBROMIALGIA</option><option value="FIBROSARCOMA">FIBROSARCOMA</option><option value="FIV">FIV</option><option value="FUSÃO CONGENITA DA CERVICAL">FUSÃO CONGENITA DA CERVICAL</option><option value="G-35">G-35</option><option value="GANHO DE PESO">GANHO DE PESO</option><option value="GENGIVO ESTOMATITE">GENGIVO ESTOMATITE</option><option value="GINECOLÓGICO">GINECOLÓGICO</option><option value="GLAUCOMA">GLAUCOMA</option><option value="GONARTROSE">GONARTROSE</option><option value="HAC">HAC</option><option value="HEMANGIOSSARCOMA">HEMANGIOSSARCOMA</option><option value="HEPATOPATIA CRÔNICA">HEPATOPATIA CRÔNICA</option><option value="HÉRNIA">HÉRNIA</option><option value="HÉRNIA DE DISCO">HÉRNIA DE DISCO</option><option value="HERPES ZOSTER">HERPES ZOSTER</option><option value="HIPERATIVIDADE CEREBRAL">HIPERATIVIDADE CEREBRAL</option><option value="HIPERISTESIA">HIPERISTESIA</option><option value="HIPERPLASIA PROSTÁTICA">HIPERPLASIA PROSTÁTICA</option><option value="HIPERTENSÃO">HIPERTENSÃO</option><option value="HIPERTIREOIDISMO">HIPERTIREOIDISMO</option><option value="HIPOTIREOIDISMO DE HASHIMOTO">HIPOTIREOIDISMO DE HASHIMOTO</option><option value="HIV">HIV</option><option value="IH">IH</option><option value="INFLAMAÇÃO INTESTINAL">INFLAMAÇÃO INTESTINAL</option><option value="INSÔNIA">INSÔNIA</option><option value="INSUFICIÊNCIA RENAL">INSUFICIÊNCIA RENAL</option><option value="IR">IR</option><option value="IRC">IRC</option><option value="IRRITABILIDADE">IRRITABILIDADE</option><option value="LABIRINTITE">LABIRINTITE</option><option value="LAMBEDURA COMPULSIVA">LAMBEDURA COMPULSIVA</option><option value="LAMBEDURA PSICOGÊNICA">LAMBEDURA PSICOGÊNICA</option><option value="LEISHMANIOSE">LEISHMANIOSE</option><option value="LESÃO NA COLUNA">LESÃO NA COLUNA</option><option value="LEUCEMIA">LEUCEMIA</option><option value="LIBIDO">LIBIDO</option><option value="LINFOMA">LINFOMA</option><option value="LINFOMA DE HODGKIN">LINFOMA DE HODGKIN</option><option value="LÚPUS">LÚPUS</option><option value="LÚPUS ERIMATOSO SISTÊMICO">LÚPUS ERIMATOSO SISTÊMICO</option><option value="LUXAÇÃO">LUXAÇÃO</option><option value="MÁ FORMAÇÃO DO CEREBELO">MÁ FORMAÇÃO DO CEREBELO</option><option value="MAL DE PARKINSON">MAL DE PARKINSON</option><option value="MASTOCITOMA CUTANEO">MASTOCITOMA CUTANEO</option><option value="MEDO">MEDO</option><option value="MEDO DE SEPARAÇÃO">MEDO DE SEPARAÇÃO</option><option value="MELANOMA CUTÂNEO">MELANOMA CUTÂNEO</option><option value="MEMÓRIA">MEMÓRIA</option><option value="MENOPAUSA">MENOPAUSA</option><option value="METÁSTASE">METÁSTASE</option><option value="METÁSTASE ÓSSEA">METÁSTASE ÓSSEA</option><option value="MICROCEFALIA">MICROCEFALIA</option><option value="MIGRANEA CRÔNICA">MIGRANEA CRÔNICA</option><option value="NEOPLASIA">NEOPLASIA</option><option value="NEURALGIA DO TRIGÊMEO">NEURALGIA DO TRIGÊMEO</option><option value="NEUROLÓGICO">NEUROLÓGICO</option><option value="NEUROPATIA">NEUROPATIA</option><option value="NÓDULO NO BAÇO">NÓDULO NO BAÇO</option><option value="NÓDULO NO PEITO">NÓDULO NO PEITO</option><option value="OBESIDADE">OBESIDADE</option><option value="OSTEOARTRITE NODAL">OSTEOARTRITE NODAL</option><option value="OSTEONECROSE">OSTEONECROSE</option><option value="OSTEONECROSE FEMOROACETABULAR">OSTEONECROSE FEMOROACETABULAR</option><option value="OSTEOPATIA">OSTEOPATIA</option><option value="OSTEOPOROSE AVANÇADA">OSTEOPOROSE AVANÇADA</option><option value="PANCREATITE">PANCREATITE</option><option value="PÂNICO">PÂNICO</option><option value="PARALISIA CEREBRAL">PARALISIA CEREBRAL</option><option value="PARALISIA SUPRA NUCLEAR PROGRESSIVA">PARALISIA SUPRA NUCLEAR PROGRESSIVA</option><option value="PERDA DE APETITE">PERDA DE APETITE</option><option value="PLAQUETAS BAIXAS">PLAQUETAS BAIXAS</option><option value="POLIARTRITE">POLIARTRITE</option><option value="POLINEUROPATIA PERIFÉRICA GRAVE DE FIBRAS FINAS">POLINEUROPATIA PERIFÉRICA GRAVE DE FIBRAS FINAS</option><option value="PRISÃO DE VENTRE">PRISÃO DE VENTRE</option><option value="PSORÍASE">PSORÍASE</option><option value="PTS">PTS</option><option value="REUMATISMO">REUMATISMO</option><option value="SAF">SAF</option><option value="SARCOMA">SARCOMA</option><option value="SARNA DEMODECICA">SARNA DEMODECICA</option><option value="SERINGOMIELIA">SERINGOMIELIA</option><option value="SINDROME CHIARI LIKE">SINDROME CHIARI LIKE</option><option value="SÍNDROME COGNITIVA SENIL">SÍNDROME COGNITIVA SENIL</option><option value="SÍNDROME DA CAUDA EQUINA">SÍNDROME DA CAUDA EQUINA</option><option value="SINDROME DA DISFUNÇÃO COGNITIVA">SINDROME DA DISFUNÇÃO COGNITIVA</option><option value="SÍNDROME DA IMUNODEFICIÊNCIA VIRAL FELINA">SÍNDROME DA IMUNODEFICIÊNCIA VIRAL FELINA</option><option value="SÍNDROME DA PICA">SÍNDROME DA PICA</option><option value="SÍNDROME DE CUSHING">SÍNDROME DE CUSHING</option><option value="SÍNDROME DE DELEÇÃO">SÍNDROME DE DELEÇÃO</option><option value="SÍNDROME DE EHLERS DANLOS">SÍNDROME DE EHLERS DANLOS</option><option value="SINDROME DE MOWAT WILSON">SINDROME DE MOWAT WILSON</option><option value="SÍNDROME DE SJOGREN">SÍNDROME DE SJOGREN</option><option value="SÍNDROME DE TOURETTE">SÍNDROME DE TOURETTE</option><option value="SÍNDROME DE WILHANS">SÍNDROME DE WILHANS</option><option value="SÍNDROME DO ABANDONO">SÍNDROME DO ABANDONO</option><option value="SÍNDROME DO INTESTINO IRRITÁVEL">SÍNDROME DO INTESTINO IRRITÁVEL</option><option value="SÍNDROME DO Q14">SÍNDROME DO Q14</option><option value="SÍNDROME DO TÚNEL DO CARPO">SÍNDROME DO TÚNEL DO CARPO</option><option value="SINDROME MIOFASCIAL">SINDROME MIOFASCIAL</option><option value="SÍNDROME MIOFASCIAL CERVICAL">SÍNDROME MIOFASCIAL CERVICAL</option><option value="SÍNDROME PÓS COVID 19">SÍNDROME PÓS COVID 19</option><option value="SÍNDROME PÓS LAMINECTOMIA">SÍNDROME PÓS LAMINECTOMIA</option><option value="SINDRONE DO PÂNICO">SINDRONE DO PÂNICO</option><option value="SJOGREN">SJOGREN</option><option value="STRESS">STRESS</option><option value="TAG">TAG</option><option value="TDAH">TDAH</option><option value="TDHA">TDHA</option><option value="TDHS">TDHS</option><option value="TENDINITE">TENDINITE</option><option value="TETRAPLEGIA">TETRAPLEGIA</option><option value="TIMIDEZ">TIMIDEZ</option><option value="TMAD">TMAD</option><option value="TOC">TOC</option><option value="TPM">TPM</option><option value="TRANSTORNO BIPOLAR">TRANSTORNO BIPOLAR</option><option value="TRANSTORNO BIPOLAR MANÍACO">TRANSTORNO BIPOLAR MANÍACO</option><option value="TRANSTORNO DE ADAPTAÇÃO">TRANSTORNO DE ADAPTAÇÃO</option><option value="TRANSTORNO DE ESPECTRO AUTISTA">TRANSTORNO DE ESPECTRO AUTISTA</option><option value="TRANSTORNO DE HUMOR">TRANSTORNO DE HUMOR</option><option value="TRANSTORNO DISFÓRICO PRÉ-MENSTRUAL">TRANSTORNO DISFÓRICO PRÉ-MENSTRUAL</option><option value="TRANSTORNO DO SONO">TRANSTORNO DO SONO</option><option value="TRANSTORNO MENTAL ORGÂNICO">TRANSTORNO MENTAL ORGÂNICO</option><option value="TRANSTORNOS OBSESSIVOS COMPULSIVOS">TRANSTORNOS OBSESSIVOS COMPULSIVOS</option><option value="TRASTORNO DE PÂNICO">TRASTORNO DE PÂNICO</option><option value="TRAUMA RAQUE MEDULAR">TRAUMA RAQUE MEDULAR</option><option value="TREMOR ESSENCIAL">TREMOR ESSENCIAL</option><option value="TRICOTILOMANIA">TRICOTILOMANIA</option><option value="TRISTEZA">TRISTEZA</option><option value="TUMOR">TUMOR</option><option value="TUMORES DE PELE">TUMORES DE PELE</option><option value="TUSS">TUSS</option><option value="VÍCIO MACONHA">VÍCIO MACONHA</option><option value="OUTRO">OUTRO</option></select>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="reason_treatment_text">
              Descreva com suas palavras o motivo do seu tratamento <LabelInfo message="Informe com suas palavras os motivos do seu tratamento" id="trattxt" />
            </label>
            <textarea onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.reason_treatment_text} id="reason_treatment_text" name="reason_treatment_text" />
          </div>

          <button class="btn btn-success btn-lg btn-float-right" type="submit">
            Enviar dados
          </button>
        </div>

        {fieldsError && <AlertError message="Você precisa preencher todos os campos" />}
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
        {cpfNotValid && (
          <div class="alert3">
            <AlertError message="O CPF digitado não é válido" />
          </div>
        )}
      </form>
    </div>
  );
};

export default AssociateSignUp;
