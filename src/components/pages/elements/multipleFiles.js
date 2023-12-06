import React, { useState, useEffect } from "react";
import apiRequest from "../../../modules/apiRequest";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import User from "../../../modules/User";
import AlertError from "../../forms/AlertError";
import directusRequestUpload from "../../../modules/directusRequestUpload";

function MultipleFiles() {

  const [user, setUser] = useState({});
  const [errorNamefile, setErrorNamefile] = useState(false);
  const [fileName, setFileName] = useState(false);
  const [isLoadingButton, setisLoadingButton] = useState(false);
  const [attachment, isAttachment] = useState(false);


  useEffect(() => {
    (async () => {
      const userData = await User();
      setUser(userData);
    })();
  }, []);

  const handleFile = async event => {

    if (fileName) {
      setisLoadingButton(true);
  
      const userFolder = localStorage.getItem("user_folder");
  
      const file = event.target.files[0];

      if(file){
  
      file.storage = "local";
      file.filename_download = file.name;
 
  
      var formData = new FormData();
      formData.append("folder", userFolder);
      formData.append("file", file, fileName);
  
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

      document.querySelector("#nameDocument").value = "";
      setFileName(false)
      }

    }else{
      document.querySelector("#nameDocument").className = "col-12 d-flex  select-namefile input-empty";
      setErrorNamefile(true)

      setTimeout(() => {
        setErrorNamefile(false)
      }, 5000);
    }
  };

  const nameFile = async event => {
    setFileName(event.target.value)

  }

  async function nextPage() {
    await apiRequest("/api/directus/update", { userId: user.id, formData: { associate_status: 6 } }, "POST")
    window.location.assign("/cadastro");
  }


  return (
    <div>
      <div>
        <div className="col-12 d-flex justify-content-center">
          <select class="form-input input-login select-namefile" id="nameDocument" name="nameDocument" onChange={nameFile}>
            <option value="">Selecione o tipo do documento </option>
            <option value="Laudo">Laudo Médico</option>
            <option value="Exame">Exame</option>
            <option value="Receita">Outra Receita</option>
          </select>
        </div>

        <Form>
          <Form.Group controlId="formFile2">
            <Form.Label className="label-upload">
              {isLoadingButton && (
                <span class="loading-text">
                  <img class="animated-icon" width="40" src="/icons/data-cloud.gif" /> Carregando documento... <img class="animated-icon" width="40" src="/icons/data-cloud.gif" />
                </span>
              )}
              {!isLoadingButton && !attachment && <span>Anexar outros arquivos</span>}
              {!isLoadingButton && attachment && <span>Anexar mais um arquivo</span>}
            </Form.Label>
            <div class="col-12 d-flex justify-content-center align-items-center" style={{ marginTop: "70px" }}><a onClick={(nextPage)} class="btn btn-primary btn-lg btn-signup">Já enviei todos os arquivos</a></div>
            <Form.Control className="input-upload" type="file" onChange={handleFile} />
          </Form.Group>
        </Form>

      </div>
      {errorNamefile && (
          <div class="alert3">
            <AlertError message="Você precisa selecionar o tipo do documento" />
          </div>
        )}
    </div>

    

    
  );
}

export default MultipleFiles;
