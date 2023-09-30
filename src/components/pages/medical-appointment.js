import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import User from '../../modules/User'
import apiRequest from '../../modules/apiRequest';
import ContactModal from '../../components/pages/modals/contact';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import directusRequestUpload from '../../modules/directusRequestUpload'

function Contact() {
  useEffect(() => {
    (async () => {
      const userData = await User();
      setUser(userData);
    })()

  }, []);


  const [user, setUser] = useState({});
  const [prescription, setPrescription] = useState(false);
  const [file, setFile] = useState(null);

  if (user.associate_status > 5) {
    window.location.assign("/")
  }

  const handleFileChange = async (event) => {
    setFile(event.target.files[0]);

    const userFolder = localStorage.getItem("user_folder")

    const file = event.target.files[0]

    file.storage = "local"
    file.filename_download = file.name

    var formData = new FormData();
    formData.append("folder", userFolder)
    formData.append("file", file)

    console.log(formData)

    var fileId = ""

    await directusRequestUpload("/files", formData, "POST", { "Content-Type": "multipart/form-data" })
      .then(response => {
        console.log(response.id)
        fileId = response.id
        return fileId
      })
      .catch(error => {
        console.error(error);
      });

    if (user.associate_status > 6) {
      window.location.assign("/")
    }

    const bodyRequest = { medical_prescription: fileId }
    await apiRequest("/api/directus/update", { "userId": user.id, "formData": bodyRequest }, "POST")
    await apiRequest("/api/directus/update", { "userId": user.id, "formData": { associate_status: 6 } }, "POST")

      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.error(error);
      });


   window.location.assign("/cadastro")
  };

  const medicalAppointmentYes = async () => {

    // await apiRequest("/api/directus/update", {"userId":user.id, "formData":{"associate_status": 5} }, "POST")

    setPrescription(true)


  }

  const medicalAppointmentYNo = async () => {
   
  }


  return (
    <div>

      <form className="form-container">
        <h1 className="sub-title">Você ja tem uma Prescrição Médica?</h1>
        <br></br>
        <div className="form-control input-login" id="responsable_type">
          <input type="radio" className="btn-check" onClick={medicalAppointmentYes} name="resposable" id="btnradio1" value="yes" ></input>
          <label className="btn btn-outline-primary radio-input" htmlFor="btnradio1">
            Sim, já realizei uma consulta médica e tenho minha receita.
          </label>
          <ContactModal redirect="/cadastro" onClick={medicalAppointmentYNo} type="appointment" />
          <label className="btn btn-outline-primary radio-input" htmlFor="btnradio2">
            Não, gostaria de agendar uma consulta médica.
          </label>
        </div>
      </form>
      
      {prescription && (
        <div>
          <h1 className="sub-title">Envie sua receita médica abaixo: </h1>
        <Form >
          <Form.Group controlId="formFile1">
            <Form.Label className="label-upload">Receita Médica</Form.Label>
            <Form.Control className="input-upload" type="file" onChange={handleFileChange} />
          </Form.Group>
        </Form>
        </div>
      )}

    </div>
  );
}

export default Contact;
