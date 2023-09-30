import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import directusRequestUpload from "../../modules/directusRequestUpload";
import apiRequest from "../../modules/apiRequest";
import User from "../../modules/User";
import AlertError from "../forms/AlertError";
import { Link } from "react-router-dom";

const FileUploadComponent = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);
  const [user, setUser] = useState({});
  const [rgProof, setRgProof] = useState(false);
  const [rg_patient_proof, setRg_patient_proof] = useState(false);
  const [proof_of_address, setProof_of_address] = useState(false);
  const [contract, setcontract] = useState(false);
  const [generateContract, setGenerateContract] = useState(true);
  const [docsError, setDocsError] = useState(false);
  const [visible, setVisible] = useState(true);
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");

  var userData = {};

  setTimeout(async () => {
    userData = await User();
    setUser(userData);
  }, 2000);

  if (user.associate_status == 4) {
    window.location.assign("/consulta");
  }

  useEffect(() => {
    (async function () {
      userData = await User();
      setUser(userData);

      if (userData.rg_proof == null) {
        setRgProof(false);
      } else {
        setRgProof(true);
      }

      if (userData.rg_patient_proof == null) {
        setRg_patient_proof(false);
      } else {
        setRg_patient_proof(true);
      }
      if (userData.proof_of_address == null) {
        setProof_of_address(false);
      } else {
        setProof_of_address(true);
      }
      if (userData.contract == null) {
        setcontract(false);
      } else {
        setcontract(true);
      }
      if (userData.responsable_type == "himself" || userData.responsable_type == "pet") {
        setVisible(true);
      } else {
        setVisible(false);
      }
    })();
  }, []);

  const handleFile1Change = async event => {
    setFile1(event.target.files[0]);

    const file1 = event.target.files[0];

    const createFolder = await apiRequest("/api/directus/create-folder", { name: user.user_code }, "POST");
    var userFolder = createFolder.id;
    localStorage.setItem("user_folder", userFolder);

    await apiRequest("/api/directus/update", { userId: user.id, formData: { user_path: userFolder } }, "POST");

    file1.storage = "local";
    file1.filename_download = file1.name;

    var formData = new FormData();
    formData.append("folder", userFolder);
    formData.append("file", file1);

    var fileId = "";

    await directusRequestUpload("/files", formData, "POST", { "Content-Type": "multipart/form-data" })
      .then(response => {
        fileId = response.id;
        console.log(fileId);
        return fileId;
      })
      .catch(error => {
        console.error(error);
      });

    const bodyRequest = { rg_proof: fileId };
    await apiRequest("/api/directus/update", { userId: user.id, formData: bodyRequest }, "POST")
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });

    setRgProof(true);
  };

  const handleFile2Change = async event => {
    setFile2(event.target.files[0]);

    const file2 = event.target.files[0];

    var userFolder = localStorage.getItem("user_folder");

    file2.storage = "local";
    file2.filename_download = file2.name;

    var formData = new FormData();
    formData.append("folder", userFolder);
    formData.append("file", file2);

    var fileId = "";

    console.log(formData);

    await directusRequestUpload("/files", formData, "POST", { "Content-Type": "multipart/form-data" })
      .then(response => {
        fileId = response.id;
        return fileId;
      })
      .catch(error => {
        console.error(error);
      });

    const bodyRequest = { proof_of_address: fileId };
    await apiRequest("/api/directus/update", { userId: user.id, formData: bodyRequest }, "POST")
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });

    zapsign();
    setTimeout(() => {
      setProof_of_address(true);
    }, 5000);
  };

  const handleFile3Change = async event => {
    setFile3(event.target.files[0]);

    const file3 = event.target.files[0];

    var userFolder = localStorage.getItem("user_folder");

    file3.storage = "local";
    file3.filename_download = file3.name;

    var formData = new FormData();
    formData.append("folder", userFolder);
    formData.append("file", file3);

    var fileId = "";

    await directusRequestUpload("/files", formData, "POST", { "Content-Type": "multipart/form-data" })
      .then(response => {
        fileId = response.id;
        return fileId;
      })
      .catch(error => {
        console.error(error);
      });

    const bodyRequest = { rg_patient_proof: fileId };
    await apiRequest("/api/directus/update", { userId: user.id, formData: bodyRequest }, "POST")
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });

    setRg_patient_proof(true);
  };

  const zapsign = async () => {
    var fields = ["name_associate", "lastname_associate", "nacionality", "marital_status", "rg_associate", "cpf_associate", "emiiter_rg_associate", "email", "street", "number", "neighborhood", "city", "cep", "date"];

    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const monthName = months[month];
    const formattedDate = `${day} de ${monthName} de ${year}`;

    user.date = formattedDate;

    var userData = [];
    const templateInfo = await apiRequest("/api/zapsign/template-info", "", "GET");

    var inputs = templateInfo.inputs;
    inputs.forEach(async function (input, i) {
      userData.push({
        de: input.variable,
        para: user[fields[i]],
      });
    });

    const createContract = await apiRequest("/api/zapsign/create-contract", { userData: userData, cod_id: user.id }, "POST");
    console.log(createContract.signers[0].sign_url);
    setGenerateContract(createContract.signers[0].sign_url);
  };

  return (
    <div class="justify-content-center">
      <h1 class="sub-title">Envie seus documentos</h1>

      <div class="">
        {!rgProof && (
          <Form>
            <Form.Group controlId="formFile1">
              <Form.Label className="label-upload">Documento de Identidade do Responsável</Form.Label>
              <Form.Control className="input-upload" type="file" onChange={handleFile1Change} />
            </Form.Group>
          </Form>
        )}

        {rgProof && (
          <div>
            <Form.Label className="label-upload send-ok">Documento de Identidade enviado</Form.Label>
          </div>
        )}

        {!proof_of_address && (
          <Form>
            <Form.Group controlId="formFile2">
              <Form.Label className="label-upload">Comprovante de residência</Form.Label>
              <Form.Control className="input-upload" type="file" onChange={handleFile2Change} />
            </Form.Group>
          </Form>
        )}
        {proof_of_address && (
          <div class="document-send">
            <Form.Label className="label-upload send-ok">Comprovante de residência enviado</Form.Label>
          </div>
        )}

        {!rg_patient_proof && (
          <Form hidden={visible}>
            <Form.Group controlId="formFile3">
              <Form.Label className="label-upload">Documento de Identidade do paciente</Form.Label>
              <Form.Control className="input-upload" type="file" onChange={handleFile3Change} />
            </Form.Group>
          </Form>
        )}

        {rg_patient_proof && (
          <div class="document-send">
            <Form.Label hidden={visible} className="label-upload send-ok">
              Documento de Identidade já enviado
            </Form.Label>
          </div>
        )}
        <br></br>
        {/*<Link to="https://database.ecosistemasoucannabis.ong.br/assets/2099cd80-16af-4863-bb45-af7b29ece349?download=&access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU2ZjAzMTVmLTc5ZWEtNGQ0ZS04Mzg0LTI3NTMxZTNmNDU2MiIsInJvbGUiOiI3ZWE3NzA0Mi1hZDhlLTQ5YTgtOTg3YS0zMzRkYThhYTI2MjEiLCJhcHBfYWNjZXNzIjp0cnVlLCJhZG1pbl9hY2Nlc3MiOnRydWUsImlhdCI6MTY5NTQwMDA4MiwiZXhwIjoxNjk1NDAwOTgyLCJpc3MiOiJkaXJlY3R1cyJ9.1ewPiN75rH4zX258leVMfG6LeYAuyBUPIZF0-xx_tTY" className="label-upload">Download do Contrato</Link>/*}


                {/*!contract && (
                    <Form>
                        <Form.Group controlId="formFile4">
                            <Form.Label className="label-upload">Enviar contrato assinado</Form.Label>
                            <Form.Control type="file" className="input-upload" onChange={handleFile4Change} />
                        </Form.Group>
                    </Form>
                )}
                {contract && (
                    <div class="document-send">
                        <Form.Label className="label-upload send-ok">Contrato já enviado</Form.Label>

                    </div>
                )*/}
        {/*
                <Form>
                    <Form.Group controlId="formFile4">
                        <Link onClick={zapsign} className="label-upload">Gerar um contrato com Zapsign</Link>
                    </Form.Group>
                </Form>

                */}
        <a className="label-upload" target="_blank" href={generateContract} hidden={!proof_of_address}>
          Assinar Termo de Responsabilidade
        </a>
      </div>
      {docsError && (
        <div class="alert1">
          <AlertError message="Você precisa enviar todos os comprovantes antes de enviar o contrato" />
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;
