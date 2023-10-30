import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import directusRequestUpload from "../../modules/directusRequestUpload";
import apiRequest from "../../modules/apiRequest";
import User from "../../modules/User";
import AlertError from "../forms/AlertError";
import { Link } from "react-router-dom";

const FileUploadComponent = () => {
  const [user, setUser] = useState({});
  const [rgProof, setRgProof] = useState(false);
  const [rg_patient_proof, setRg_patient_proof] = useState(false);
  const [proof_of_address, setProof_of_address] = useState(false);
  const [contract, setContract] = useState(false);
  const [generateContract, setGenerateContract] = useState(true);
  const [docsError, setDocsError] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingB, setIsLoadingB] = useState(false);
  const [isLoadingC, setIsLoadingC] = useState(false);

  var userData = {};

  setTimeout(async () => {
    userData = await User();
    setUser(userData);
  }, 4000);


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
        setContract(false);
      } else {
        setContract(true);
      }
      if (userData.responsable_type == "himself" || userData.responsable_type == "pet") {
        setVisible(true);
      } else {
        setVisible(false);
      }

    })();

  }, []);

  const handleFile1Change = async event => {
    setIsLoading(true);

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
        return fileId;
      })
      .catch(error => {
        console.error(error);
      });

    const bodyRequest = { rg_proof: fileId };
    await apiRequest("/api/directus/update", { userId: user.id, formData: bodyRequest }, "POST")
      .then(response => {
        setRgProof(true);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
      });

    await apiRequest("/api/directus/upload-files", { userId: user.id, fileId: fileId }, "POST")
      .then(response => { })
      .catch(error => {
        console.error(error);
      });

    setRgProof(true);
    setIsLoading(false);
  };

  const handleFile2Change = async event => {
    setIsLoadingB(true);

    const file2 = event.target.files[0];

    var userFolder = localStorage.getItem("user_folder");

    file2.storage = "local";
    file2.filename_download = file2.name;

    var formData = new FormData();
    formData.append("folder", userFolder);
    formData.append("file", file2);

    var fileId = "";

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
        .then(response => {})
        .catch(error => {
          console.error(error);
        });
  
    await apiRequest("/api/directus/upload-files", { userId: user.id, fileId: fileId }, "POST")
        .then(response => {})
        .catch(error => {
          console.error(error);
        });

    docusign();

    setTimeout(() => {
      setProof_of_address(true);
      setIsLoadingB(false);
    }, 5000);
  };

  const handleFile3Change = async event => {
    setIsLoadingC(true);

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
      .then(response => { })
      .catch(error => {
        console.error(error);
      });

    await apiRequest("/api/directus/upload-files", { userId: user.id, fileId: fileId }, "POST")
      .then(response => { })
      .catch(error => {
        console.error(error);
      });

    setRg_patient_proof(true);
    setIsLoadingC(false);
  };

  const handleFile4Change = async event => {
    setIsLoadingC(true);

    const file4 = event.target.files[0];

    var userFolder = localStorage.getItem("user_folder");

    file4.storage = "local";
    file4.filename_download = file4.name;

    var formData = new FormData();
    formData.append("folder", userFolder);
    formData.append("file", file4);

    var fileId = "";

    await directusRequestUpload("/files", formData, "POST", { "Content-Type": "multipart/form-data" })
      .then(response => {
        fileId = response.id;
        return fileId;
      })
      .catch(error => {
        console.error(error);
      });

    const bodyRequest = { contract: fileId, associate_status: 4 };
    await apiRequest("/api/directus/update", { userId: user.id, formData: bodyRequest }, "POST")
      .then(response => { })
      .catch(error => {
        console.error(error);
      });

    await apiRequest("/api/directus/upload-files", { userId: user.id, fileId: fileId }, "POST")
      .then(response => { })
      .catch(error => {
        console.error(error);
      });

    setRg_patient_proof(true);
    setIsLoadingC(false);

    window.location.assign("/consulta");
  };

  const docusign = async () => {
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const monthName = months[month];
    const formattedDate = `${day} de ${monthName} de ${year}`;

    const fullname = user.name_associate + " " + user.lastname_associate;

    var userData = [
      {
        "name": "cardid",
        "default_value": user.id,
        "readonly": true
      },
      {
        "name": "Nome do Responsavel",
        "default_value": fullname,
        "readonly": true
      },
      {
        "name": "Estado Civil",
        "default_value": user.marital_status,
        "readonly": true
      },
      {
        "name": "Nacionalidade",
        "default_value": user.nationality,
        "readonly": true
      },
      {
        "name": "CPF",
        "default_value": user.cpf_associate,
        "readonly": true
      },
      {
        "name": "RG",
        "default_value": user.rg_associate,
        "readonly": true
      },
      {
        "name": "Orgao",
        "default_value": user.emiiter_rg_associate,
        "readonly": true
      },
      {
        "name": "Rua",
        "default_value": user.street,
        "readonly": true
      },
      {
        "name": "Numero",
        "default_value": user.number,
        "readonly": true
      },
      {
        "name": "Bairro",
        "default_value": user.neighborhood,
        "readonly": true
      },
      {
        "name": "Cidade",
        "default_value": user.city,
        "readonly": true
      },
      {
        "name": "Estado",
        "default_value": user.state,
        "readonly": true
      },
      {
        "name": "CEP",
        "default_value": user.cep,
        "readonly": true
      },
      {
        "name": "Data",
        "default_value": formattedDate,
        "readonly": true
      }
    ];

    const createContract = await apiRequest("/api/docusign/create-contract", userData, "POST");
    setGenerateContract(process.env.REACT_APP_DOCUSIGN_URL + "/s/" + createContract[0].slug);
  };

  return (
    <div class="justify-content-center">
      <h1 class="sub-title">Envie seus documentos</h1>

      <div class="">
        {!rgProof && (
          <Form>
            <Form.Group controlId="formFile1">
              <Form.Label className="label-upload">
                {isLoading && (
                  <span class="loading-text">
                    <img class="animated-icon" width="40" src="/icons/data-cloud.gif" /> Carregando documento... <img class="animated-icon" width="40" src="/icons/data-cloud.gif" />
                  </span>
                )}
                {!isLoading && <span>Documento de Identidade do Responsável</span>}
              </Form.Label>
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
              <Form.Label className="label-upload">
                {isLoadingB && (
                  <span class="loading-text">
                    <img class="animated-icon" width="40" src="/icons/data-cloud.gif" /> Carregando documento... <img class="animated-icon" width="40" src="/icons/data-cloud.gif" />
                  </span>
                )}
                {!isLoadingB && <span>Comprovante de residência</span>}
              </Form.Label>
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
              <Form.Label className="label-upload">
                {isLoadingC && (
                  <span class="loading-text">
                    <img class="animated-icon" width="40" src="/icons/data-cloud.gif" /> Carregando documento... <img class="animated-icon" width="40" src="/icons/data-cloud.gif" />
                  </span>
                )}
                {!isLoadingC && <span>Documento de Identidade do paciente</span>}
              </Form.Label>
              <Form.Control className="input-upload" type="file" onChange={handleFile3Change} />
            </Form.Group>
          </Form>
        )}

        {rg_patient_proof && (
          <div class="document-send">
            <Form.Label hidden={visible} className="label-upload send-ok">
              Documento de Identidade enviado
            </Form.Label>
          </div>
        )}
        <br></br>
        {process.env.REACT_APP_ZAPSIGN == "false" && (
          <div>
            <Link to="https://database.ecosistemasoucannabis.ong.br/assets/2099cd80-16af-4863-bb45-af7b29ece349?download=&access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU2ZjAzMTVmLTc5ZWEtNGQ0ZS04Mzg0LTI3NTMxZTNmNDU2MiIsInJvbGUiOiI3ZWE3NzA0Mi1hZDhlLTQ5YTgtOTg3YS0zMzRkYThhYTI2MjEiLCJhcHBfYWNjZXNzIjp0cnVlLCJhZG1pbl9hY2Nlc3MiOnRydWUsImlhdCI6MTY5NTQwMDA4MiwiZXhwIjoxNjk1NDAwOTgyLCJpc3MiOiJkaXJlY3R1cyJ9.1ewPiN75rH4zX258leVMfG6LeYAuyBUPIZF0-xx_tTY" className="label-upload">
              Download do Contrato
            </Link>

            {!contract && (
              <Form>
                <Form.Group controlId="formFile4">
                  <Form.Label className="label-upload">
                    {isLoading && (
                      <span class="loading-text">
                        <img class="animated-icon" width="40" src="/icons/data-cloud.gif" /> Carregando documento... <img class="animated-icon" width="40" src="/icons/data-cloud.gif" />
                      </span>
                    )}
                    {!isLoading && <span>Enviar contrato assinado</span>}
                  </Form.Label>
                  <Form.Control type="file" className="input-upload" onChange={handleFile4Change} />
                </Form.Group>
              </Form>
            )}
            {contract && (
              <div class="document-send">
                <Form.Label className="label-upload send-ok">Contrato já enviado</Form.Label>
              </div>
            )}
          </div>
        )}

        <a className="label-upload " target="_blank" href={generateContract} hidden={!proof_of_address || process.env.REACT_APP_ZAPSIGN == "false"}>
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
