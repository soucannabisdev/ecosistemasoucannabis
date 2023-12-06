import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import User from "../../modules/User";
import apiRequest from "../../modules/apiRequest";
import MultipleFiles from "./elements/multipleFiles";
import ContactModal from "../../components/pages/modals/contact";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import directusRequestUpload from "../../modules/directusRequestUpload";

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
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (user.associate_status > 5) {
    window.location.assign("/");
  }

  const handleFileChange = async event => {
    setIsLoading(true);
    setFile(event.target.files[0]);

    const userFolder = localStorage.getItem("user_folder");

    const file = event.target.files[0];

    file.storage = "local";
    file.filename_download = file.name;

    var fileName = file.name
    fileName = fileName.split(".")
    const nameFile = "Laudo-Medico-01."+fileName[1]

    var formData = new FormData();
    formData.append("folder", userFolder);
    formData.append("file", file, nameFile);

    var fileId = "";

    await directusRequestUpload("/files", formData, "POST", { "Content-Type": "multipart/form-data" })
      .then(response => {
        fileId = response.id;
        return fileId;
      })
      .catch(error => {
        console.error(error);
      });

    if (user.associate_status > 6) {
      window.location.assign("/");
    }

    await apiRequest("/api/directus/update", { userId: user.id, formData: { medical_prescription: fileId, status: "prescription" } }, "POST")
      .then(response => {
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
    await apiRequest("/api/directus/upload-files", { userId: user.id, fileId: fileId }, "POST");

    setMedicalPrescrption(true)
  };

  const medicalAppointmentYes = async () => {
    setPrescription(true);
  };

  return (
    <div>
      <form className="form-container">
        <h1 className="sub-title">Você ja tem uma Prescrição Médica?</h1>
        <br></br>
        <div className="form-control options-container">
          <input type="radio" className="btn-check" onClick={medicalAppointmentYes} name="resposable" id="btnradio1" value="yes"></input>
          <label className="btn btn-outline-primary radio-input" htmlFor="btnradio1">
            Sim, já realizei uma consulta médica e tenho minha receita.
          </label>
          <ContactModal redirect="/cadastro" type="appointment" />
          <label className="btn btn-outline-primary radio-input" htmlFor="btnradio2">
            Não, gostaria de agendar uma consulta médica.
          </label>
        </div>
      </form>

      {prescription && (
        <div>
          <h1 className="sub-title">Envie sua receita médica aqui: </h1>
          <Form>
            <Form.Group controlId="formFile1">
              <Form.Label className="label-upload">
                {isLoading && (
                  <span class="loading-text">
                    <img class="animated-icon" width="40" src="/icons/data-cloud.gif" /> Carregando documento... <img class="animated-icon" width="40" src="/icons/data-cloud.gif" />
                  </span>
                )}
                {!isLoading && !medicalPrescrption && <span>Enviar receita médica</span>}
                {medicalPrescrption && <div>
                  <Form.Label className="label-upload send-ok">Receita médica enviada</Form.Label>
                </div>}
              </Form.Label>
              <br></br>
              <p style={{ color: "#fff", textAlign: "center", fontSize: "20px", padding:"0 20%" }}>Abaixo você pode enviar arquivos que complementem a sua receita como, laudos médicos, exames e outras receitas.</p>
              <Form.Control className="input-upload" type="file" onChange={handleFileChange} />
            </Form.Group>
          </Form>
          <MultipleFiles />
          <br></br>
          <br></br>
        </div>
      )}
    </div>
  );
}

export default MedicalAppointment;
