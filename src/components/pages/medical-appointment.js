import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import User from "../../modules/User";
import apiRequest from "../../modules/apiRequest";
import MultipleFiles from "./elements/multipleFiles";
import ContactModal from "../../components/pages/modals/contact";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import directusRequestUpload from "../../modules/directusRequestUpload";
import AlertError from "../forms/AlertError";
import Resizer from 'react-image-file-resizer';

function MedicalAppointment() {

  const [medicalPrescrption, setMedicalPrescrption] = useState(false);

  useEffect(() => {
    (async () => {
      const userData = await User();
      setUser(userData);

      if (userData.medical_prescription == null) {
        setMedicalPrescrption(false);
      } else {
        setMedicalPrescrption(true);
      }
    })();
  }, []);

  const [user, setUser] = useState({});
  const [prescription, setPrescription] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signupMessage, setSignupMessage] = useState(false);
  

  if (user.associate_status > 5) {
    window.location.assign("/");
  }

  const handleFileChange = async event => {
    const userFolder = localStorage.getItem("user_folder");

    const file = event.target.files[0]

    file.storage = "local";
    file.filename_download = file.name;

    var fileName = file.name
    fileName = fileName.split(".")
    const nameFile = "receita-medica-" + user.name_associate + "-" + user.lastname_associate + "-" + user.user_code + "." + fileName[1]

    if (fileName[1] == "jpg" || fileName[1] == "jpeg" || fileName[1] == "png" || fileName[1] == "gif" || fileName[1] == "pdf") {
      setIsLoading(true);

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
        formData.append("file", compressedImage, nameFile);
      }
      else {
        var formData = new FormData();
        formData.append("folder", userFolder);
        formData.append("file", file, nameFile);
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

      await apiRequest("/api/directus/update", { userId: user.id, formData: { medical_prescription: fileId, status: "prescription" } }, "POST")
        .then(response => {
          setIsLoading(false);
        })
        .catch(error => {
          console.error(error);
        });


      await apiRequest("/api/directus/upload-files", { userId: user.id, fileId: fileId }, "POST");

      setMedicalPrescrption(true)
    } else {
      setFileError(true)
      setTimeout(() => {
        setFileError(false)
      }, 6000);
    }
  };

  const medicalAppointmentYes = async () => {
    setPrescription(true);
  };

  const medicalAppointmentNo = async () => {
    setSignupMessage(true);
  };

  return (
    <div>
      <form className="form-container">
        <h1>Você ja tem uma Prescrição?</h1>
        <br></br>
        <div className="form-control options-container">
          <input type="radio" className="btn-check" onClick={medicalAppointmentYes} name="resposable" id="btnradio1" value="yes"></input>
          <label className="btn btn-outline-primary radio-input" htmlFor="btnradio1">
            Sim, já realizei uma consulta e tenho minha receita.
          </label>
          <ContactModal redirect="/cadastro" type="appointment" />
          <label className="btn btn-outline-primary radio-input" onClick={medicalAppointmentNo}  htmlFor="btnradio2">
            Não, gostaria de agendar uma consulta.
          </label>
          
        </div> 
        {signupMessage && (
        <h3 style={{padding:"35px 20px",textAlign:"center"}}>Para dar continuidade ao seu cadastro como asssociado, envie sua receita nesta página após a consulta para finalizar seu cadastro como associado.</h3>
      )}   
      </form>
      
   

      {prescription && (
        <div>
          <h1 className="sub-title">Envie sua receita aqui: </h1>
          <Form>
            <Form.Group controlId="formFile1">
              <Form.Label className="label-upload" hidden={medicalPrescrption}>
                {isLoading && (
                  <span class="loading-text">
                    <img class="animated-icon" width="40" src="/icons/data-cloud.gif" /> Carregando documento... <img class="animated-icon" width="40" src="/icons/data-cloud.gif" />
                  </span>
                )}
                {!isLoading && !medicalPrescrption && <span>Enviar receita médica</span>}
              </Form.Label>             

              {medicalPrescrption &&
                <Form.Label className="label-upload send-ok prescription-button">Receita Médica Enviada</Form.Label>
              }             
              <Form.Control className="input-upload" type="file" onChange={handleFileChange} />
            </Form.Group>
          </Form>
          <br></br>
              <p style={{ color: "#fff", textAlign: "center", fontSize: "20px", padding: "0 20%" }}>Após enviar sua receita médica você pode enviar arquivos que complementem a sua receita, como laudos médicos e exames.</p>
        
          {medicalPrescrption &&
                <MultipleFiles/>
              } 

          <br></br>
          <br></br>         
        </div>
      )}
      {fileError && (
        <div class="alert3">
          <AlertError message="Formato do documento inválido, formatos aceitos (JPG, PNG, GIF e PDF)" />
        </div>
      )}
    </div>
  );
}

export default MedicalAppointment;
