import React, { useState, useEffect } from "react";
import apiRequest from "../../../modules/apiRequest";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import directusRequestUpload from "../../../modules/directusRequestUpload";

function MultipleFiles() {

  const [user, setUser] = useState({});
  const [prescription, setPrescription] = useState(false);
  const [file, setFile] = useState(null);
  const [isLoadingButton, setisLoadingButton] = useState(false);
  const [attachment, isAttachment] = useState(false);

  const handleFile = async event => {
    setisLoadingButton(true);
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

    //await apiRequest("/api/directus/update", { userId: user.id, formData: { medical_prescription: fileId, associate_status: 6, status: "prescription"  } }, "POST")
    await apiRequest("/api/directus/update", { userId: user.id, formData: { medical_prescription: fileId, status: "prescription"  } }, "POST")
      .then(response => {
        setisLoadingButton(false);
       // window.location.assign("/cadastro");
      })
      .catch(error => {
        console.error(error);
      });
    await apiRequest("/api/directus/upload-files", { userId: user.id, fileId: fileId }, "POST");
    isAttachment(true)
  };

  return (
    <div>
        <div>
          <Form>
            <Form.Group controlId="formFile2">
              <Form.Label className="label-upload">
                {isLoadingButton && (
                  <span class="loading-text">
                    <img class="animated-icon" width="40" src="/icons/data-cloud.gif" /> Carregando documento... <img class="animated-icon" width="40" src="/icons/data-cloud.gif" />
                  </span>
                )}
                {!isLoadingButton  && !attachment && <span>Anexar outros arquivos</span>}
                {!isLoadingButton  && attachment && <span>Anexar mais um arquivo</span>}
              </Form.Label>
              <Form.Control className="input-upload" type="file" onChange={handleFile} />
            </Form.Group>
          </Form>
        </div>        
    </div>
  );
}

export default MultipleFiles;
