import React, { useState, useEffect } from "react";
import apiRequest from "../../../modules/apiRequest";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import User from "../../../modules/User";
import AlertError from "../../forms/AlertError";
import directusRequestUpload from "../../../modules/directusRequestUpload";
import Resizer from 'react-image-file-resizer';


function MultipleFiles() {

  const [user, setUser] = useState({});
  const [errorNamefile, setErrorNamefile] = useState(false);
  const [archiveName, setFileName] = useState(false);
  const [isLoadingButton, setisLoadingButton] = useState(false);
  const [attachment, isAttachment] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [fileSuccess, setFileSuccess] = useState(false);
  const [selectInfo, setSelectInfo] = useState(false);

  useEffect(() => {
    (async () => {
      const userData = await User();
      setUser(userData);
    })();
  }, []);



  const handleFile = async event => {

    if (archiveName) {
      const userFolder = localStorage.getItem("user_folder");

      const file = event.target.files[0];

      if (file) {

        file.storage = "local";

        var fileName = file.name
        fileName = fileName.split(".")


        if (fileName[1] == "jpg" || fileName[1] == "jpeg" || fileName[1] == "png" || fileName[1] == "gif" || fileName[1] == "pdf") {
          setisLoadingButton(true);

          if (fileName[1] != "pdf") {

            const compressedImage = await new Promise((resolve) => {
              Resizer.imageFileResizer(
                file,
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
            formData.append("file", compressedImage, archiveName + user.name_associate + "-" + user.lastname_associate + "-" + user.user_code + "." + fileName[1]);
          } else {
            var formData = new FormData();
            formData.append("folder", userFolder);
            formData.append("file", file, archiveName + "." + fileName[1]);

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

          await apiRequest("/api/directus/upload-files", { userId: user.id, fileId: fileId }, "POST");
          isAttachment(true)
          setisLoadingButton(false)

          const optionSelect = document.querySelector("#" + archiveName)
          optionSelect.remove()

          document.querySelector("#nameDocument").value = "";
          setFileName(false)

          document.querySelector("#nameDocument").className = "col-12 d-flex  select-namefile";

          const countOptions = document.querySelector("#nameDocument")

          if (countOptions && countOptions.childNodes.length === 1) {
            setSelectInfo(true);
          }

          setFileSuccess(true)
          setTimeout(() => {
            setFileSuccess(false)
          }, 6000);

        } else {
          setFileError(true)
          setTimeout(() => {
            setFileError(false)
          }, 5000);
        }
      }
    } else {
      document.querySelector("#nameDocument").className = "col-12 d-flex  select-namefile input-empty";
      setErrorNamefile(true)
      setTimeout(() => {
        setErrorNamefile(false)
      }, 6000);
    }
  };

  const nameFile = async event => {
    setFileName(event.target.value)
  }

  async function nextPage() {
    await apiRequest("/api/directus/update", { userId: user.id, formData: { associate_status: 7, status: "aguardando-aprovacao" } }, "POST");
    window.location.assign("/cadastro");
  }

  return (
    <div>
      <div>
        <div className="col-12 d-flex justify-content-center">
          <select class="form-input input-login select-namefile" id="nameDocument" name="nameDocument" onChange={nameFile}>
            <option value="">
              {!selectInfo &&
                "Selecione o tipo do documento"
              }
              {selectInfo &&
                "Você já enviou todos os arquivos"
              }
            </option>

            <option id="laudo-" value="laudo-">Laudo Médico</option>
            <option id="exame-" value="exame-">Exame</option>
          </select>
        </div>

        <Form className={selectInfo ? 'form-desabilitado' : ''}>
          <Form.Group controlId="formFile2">
            <Form.Label className="label-upload"  hidden={selectInfo}>
              {isLoadingButton && (
                <span class="loading-text">
                  <img class="animated-icon" width="40" src="/icons/data-cloud.gif" /> Carregando documento... <img class="animated-icon" width="40" src="/icons/data-cloud.gif" />
                </span>
              )}
              {!isLoadingButton && !attachment && <span>Anexar outros arquivos</span>}
              {!isLoadingButton && attachment && !selectInfo && <span>Anexar mais um arquivo</span>}
              {selectInfo && attachment && <span>Clique abaixo para continuar seu cadastro</span>}
            </Form.Label>
            <Form.Control className="input-upload" type="file" onChange={handleFile} />
          </Form.Group>
        </Form>
        <div class="col-12 d-flex justify-content-center align-items-center" style={{ marginTop: "70px" }}><a onClick={(nextPage)} class="btn btn-success btn-lg btn-signup">Solicitar aprovação do cadastro</a></div>

      </div>
      {errorNamefile && (
        <div class="alert3">
          <AlertError message="Você precisa selecionar o tipo do documento" />
        </div>
      )}
      {fileError && (
        <div class="alert3">
          <AlertError message="Formato do documento inválido, formatos aceitos (JPG, PNG, GIF e PDF)" />
        </div>
      )}
      {fileSuccess && (
        <div class="alert4">
          <AlertError message="Seu arquivo foi enviado com sucesso!" />
        </div>
      )}
    </div>
  );
}

export default MultipleFiles;
