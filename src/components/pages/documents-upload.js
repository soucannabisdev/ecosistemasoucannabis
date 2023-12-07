import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import directusRequestUpload from "../../modules/directusRequestUpload";
import apiRequest from "../../modules/apiRequest";
import User from "../../modules/User";
import AlertError from "../forms/AlertError";
import Resizer from 'react-image-file-resizer';

const FileUploadComponent = () => {
  const [user, setUser] = useState({});
  const [rgProof, setRgProof] = useState(false);
  const [rg_patient_proof, setRg_patient_proof] = useState(false);
  const [proof_of_address, setProof_of_address] = useState(false);
  const [contract, setContract] = useState(false);
  const [generateContract, setGenerateContract] = useState(false);
  const [docsError, setDocsError] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingB, setIsLoadingB] = useState(false);
  const [isLoadingC, setIsLoadingC] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [buttonMsg, setButtonMsg] = useState("Carregando documento...");

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

    const file1 = event.target.files[0];

    if (file1) {
      const createFolder = await apiRequest("/api/directus/create-folder", { name: user.user_code }, "POST");
      var userFolder = createFolder.id;
      localStorage.setItem("user_folder", userFolder);

      await apiRequest("/api/directus/update", { userId: user.id, formData: { user_path: userFolder } }, "POST");

      file1.storage = "local";

      var fileName = file1.name
      fileName = fileName.split(".")
      const nameFile = "RG." + fileName[1]

      if (fileName[1] == "jpg" || fileName[1] == "jpeg" || fileName[1] == "png" || fileName[1] == "gif" || fileName[1] == "pdf") {
        setIsLoading(true);

        if (fileName[1] != "pdf") {

          const compressedImage = await new Promise((resolve) => {
            Resizer.imageFileResizer(
              file1,
              800,
              600,
              fileName[1],
              70,
              0,
              (uri) => {
                resolve(uri);
              },
              'file'
            );
          });

          var formData = new FormData();
          formData.append("folder", userFolder);
          formData.append("file", compressedImage, nameFile);
        } else {
          var formData = new FormData();
          formData.append("folder", userFolder);
          formData.append("file", file1, nameFile);

        }

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

        await apiRequest("/api/directus/upload-files", { userId: user.id, fileId: fileId }, "POST")

        setRgProof(true);
        setIsLoading(false);
      } else {
        setFileError(true)
        setTimeout(() => {
          setFileError(false)
        }, 5000);
      }
    }
  };

  const handleFile2Change = async event => {

    const file2 = event.target.files[0];
    var userFolder = localStorage.getItem("user_folder");

    if (file2) {

      file2.storage = "local";
      file2.filename_download = file2.name;

      var fileName = file2.name
      fileName = fileName.split(".")
      const nameFile = "COMP-RESIDENCIA." + fileName[1]

      if (fileName[1] == "jpg" || fileName[1] == "jpeg" || fileName[1] == "png" || fileName[1] == "gif" || fileName[1] == "pdf") {
        setIsLoadingB(true);

        if (fileName[1] != "pdf") {

          const compressedImage = await new Promise((resolve) => {
            Resizer.imageFileResizer(
              file2,
              800,
              600,
              fileName[1],
              70,
              0,
              (uri) => {
                resolve(uri);
              },
              'file'
            );
          });

          var formData = new FormData();
          formData.append("folder", userFolder);
          formData.append("file", compressedImage, nameFile);
        } else {
          var formData = new FormData();
          formData.append("folder", userFolder);
          formData.append("file", file2, nameFile);
        }

        var fileId = "";

        await directusRequestUpload("/files", formData, "POST", { "Content-Type": "multipart/form-data" })
          .then(response => {
            fileId = response.id;
            return fileId;
          })
          .catch(error => {
            console.error(error);
          });

        const bodyRequest = { proof_of_address: fileId, status: "proofs" };
        await apiRequest("/api/directus/update", { userId: user.id, formData: bodyRequest }, "POST")
    
        await apiRequest("/api/directus/upload-files", { userId: user.id, fileId: fileId }, "POST")

        setButtonMsg("Gerando termo para assinatura")

        docuseal();

        setProof_of_address(true);
        setIsLoadingB(false);

      } else {
        setFileError(true)
        setTimeout(() => {
          setFileError(false)
        }, 5000);
      }
    }
  };

  const handleFile3Change = async event => {
    const file3 = event.target.files[0];

    var userFolder = localStorage.getItem("user_folder");

    if (file3) {
      file3.storage = "local";
      file3.filename_download = file3.name;

      var fileName = file3.name
      fileName = fileName.split(".")
      const nameFile = "RG-PACIENTE." + fileName[1]

      if (fileName[1] == "jpg" || fileName[1] == "jpeg" || fileName[1] == "png" || fileName[1] == "gif" || fileName[1] == "pdf") {
        setIsLoadingC(true);

        if (fileName[1] != "pdf") {

          const compressedImage = await new Promise((resolve) => {
            Resizer.imageFileResizer(
              file3,
              800,
              600,
              fileName[1],
              70,
              0,
              (uri) => {
                resolve(uri);
              },
              'file'
            );
          });

          var formData = new FormData();
          formData.append("folder", userFolder);
          formData.append("file", compressedImage, nameFile);
        } else {
          var formData = new FormData();
          formData.append("folder", userFolder);
          formData.append("file", file3, nameFile);
        }

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

        await apiRequest("/api/directus/upload-files", { userId: user.id, fileId: fileId }, "POST")

        setRg_patient_proof(true);
        setIsLoadingC(false);
      }

    } else {
      setFileError(true)
      setTimeout(() => {
        setFileError(false)
      }, 5000);
    }
  };

  const docuseal = async () => {
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
        "name": "usercode",
        "default_value": user.id,
        "readonly": true
      },
      {
        "name": "email",
        "default_value": user.email_account,
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

    const createContract = await apiRequest("/api/docuseal/create-contract", userData, "POST");
    setGenerateContract(process.env.REACT_APP_DOCUSEAL_URL + "/s/" + createContract[0].slug);

    const bodyRequest = { contract: process.env.REACT_APP_DOCUSEAL_URL + "/s/" + createContract[0].slug };
    await apiRequest("/api/directus/update", { userId: user.id, formData: bodyRequest }, "POST")

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
                    <img class="animated-icon" width="40" src="/icons/data-cloud.gif" />
                    Carregando documento...
                    <img class="animated-icon" width="40" src="/icons/data-cloud.gif" />
                  </span>
                )}
                {!isLoading && <span>Documento de Identidade</span>}
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
                    <img class="animated-icon" width="40" src="/icons/data-cloud.gif" />  {buttonMsg} <img class="animated-icon" width="40" src="/icons/data-cloud.gif" />
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

        <a className="label-upload " target="_blank" href={generateContract || user.contract} hidden={!proof_of_address}>
          Assinar Termo de Responsabilidade
        </a>
      </div>
      {docsError && (
        <div class="alert1">
          <AlertError message="Você precisa enviar todos os comprovantes antes de enviar o contrato" />
        </div>
      )}
      {fileError && (
        <div class="alert1">
          <AlertError message="Formato do documento inválido, formatos aceitos (JPG, PNG, GIF e PDF)" />
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;
