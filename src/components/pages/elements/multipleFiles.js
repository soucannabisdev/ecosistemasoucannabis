import React, { useState, useEffect } from "react";
import apiRequest from "../../../modules/apiRequest";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import User from "../../../modules/User";
import directusRequestUpload from "../../../modules/directusRequestUpload";

function MultipleFiles() {

  const [user, setUser] = useState({});
  const [prescription, setPrescription] = useState(false);
  const [file, setFile] = useState(null);
  const [isLoadingButton, setisLoadingButton] = useState(false);
  const [attachment, isAttachment] = useState(false);


  useEffect(() => {
    (async () => {
      const userData = await User();
      setUser(userData);
    })();
  }, []);

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

    await apiRequest("/api/directus/upload-files", { userId: user.id, fileId: fileId }, "POST");
    isAttachment(true)
    setisLoadingButton(false)
  };

  async function nextPage() {
    await apiRequest("/api/directus/update", { userId: user.id, formData: { associate_status: 6 } }, "POST")
    window.location.assign("/cadastro");
  }


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
              {!isLoadingButton && !attachment && <span>Anexar outros arquivos</span>}
              {!isLoadingButton && attachment && <span>Anexar mais um arquivo</span>}
            </Form.Label>
            <div class="col-12 d-flex justify-content-center align-items-center" style={{ marginTop: "30px" }}><a onClick={(nextPage)} class="btn btn-primary btn-lg btn-signup">Já enviei todos os arquivos</a></div>
            <Form.Control className="input-upload" type="file" onChange={handleFile} />
          </Form.Group>
        </Form>

      </div>
    </div>
  );
}

export default MultipleFiles;
