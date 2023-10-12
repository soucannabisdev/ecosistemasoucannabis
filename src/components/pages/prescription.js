import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import User from "../../modules/User";
import directusRequestUpload from "../../modules/directusRequestUpload";
import apiRequest from "../../modules/apiRequest";

function Prescription() {
  useEffect(() => {
    (async () => {
      const userData = await User();
      setUser(userData);
    })();
  }, []);

  const [user, setUser] = useState({});
  const [file, setFile] = useState(null);

  if (user.associate_status == 6) {
    window.location.assign("/cadastro");
  }

  const handleFileChange = async event => {
    setFile(event.target.files[0]);

    const userFolder = localStorage.getItem("user_folder");

    const file = event.target.files[0];

    file.storage = "local";
    file.filename_download = file.name;

    var formData = new FormData();
    formData.append("folder", userFolder);
    formData.append("file", file);

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

    const bodyRequest = { medical_prescription: fileId };
    await apiRequest("/api/directus/update", { userId: user.id, formData: bodyRequest }, "POST");
    await apiRequest("/api/directus/update", { userId: user.id, formData: { associate_status: 6 } }, "POST");

    window.location.assign("/cadastro");
  };

  return (
    <div className="">
      <div className="form-container">
        <h1 className="sub-title">Envie sua receita médica abaixo: </h1>
        {!user.medical_prescription && (
          <Form>
            <Form.Group controlId="formFile1">
              <Form.Label className="label-upload">Receita Médica</Form.Label>
              <Form.Control className="input-upload" type="file" onChange={handleFileChange} />
            </Form.Group>
          </Form>
        )}
      </div>
    </div>
  );
}

export default Prescription;
