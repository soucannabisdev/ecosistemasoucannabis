import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import User from '../../modules/User'
import directusRequestUpload from '../../modules/directusRequestUpload'
import apiRequest from "../../modules/apiRequest";

function Prescription() {
  useEffect(() => {
    (async () => {
      const userData = await User();
      setUser(userData);
    })()

  }, []);

  const [user, setUser] = useState({});
  const [file, setFile] = useState(null);

  const handleFileChange = async (event) => {
    setFile(event.target.files[0]);
  };

  if(user.associate_status == 6){
    window.location.assign("/cadastro-aprovado");
  }

  const submit = async (event) => {
    event.preventDefault();

    const userFolder = localStorage.getItem("user_folder")

    file.storage = "local"
    file.filename_download = file.name

    console.log(userFolder)

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

    const bodyRequest = { medical_prescription: fileId }
    await apiRequest("/api/directus/update", { "userId": user.id, "formData": bodyRequest }, "POST")

      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.error(error);
      });

      
     window.location.reload()
  }

  const approve = async (event) => {
    event.preventDefault();

    const nameAssociate = user.name_associate + " " + user.lastname_associate
    console.log(user)

    const description = "<ul> <li style='list-style:none'><span style='font-size: 14px;'>Nome do Associado:  </span><b style='font-size:16px;padding-bottom:5px'>"+user.name_associate+"</b></li> <li style='list-style:none'><span style='font-size: 14px;'>Sobrenome do Associado: </span><b style='font-size:16px;padding-bottom:5px'>"+user.lastname_associate+"</b></li> <li style='list-style:none'><span style='font-size: 14px;'>Data de Nascimento: </span><b style='font-size:16px;padding-bottom:5px'>"+user.birthday_associate+"</b></li> <li style='list-style:none'><span style='font-size: 14px;'>Gênero: </span><b style='font-size:16px;padding-bottom:5px'>"+user.gender+"</b></li> <li style='list-style:none'><span style='font-size: 14px;'>Nacionalidade: </span><b style='font-size:16px;padding-bottom:5px'>"+user.nationality+"</b></li> <li style='list-style:none'><span style='font-size: 14px;'>Estado Civil: </span><b style='font-size:16px;padding-bottom:5px'>"+user.marital_status+"</b></li> </ul><ul><li style='list-style:none'><span style='font-size: 14px;'>CPF do Associado: </span><b style='font-size:16px;padding-bottom:5px'>"+user.cpf_associate+"</b></li> <li style='list-style:none'><span style='font-size: 14px;'>RG do Associado: </span><b style='font-size:16px;padding-bottom:5px'>"+user.rg_associate+"</b></li> </ul><ul><li style='list-style:none'><span style='font-size: 14px;'>Email: </span><b style='font-size:16px;padding-bottom:5px'>"+user.email+"</b></li> <li style='list-style:none'><span style='font-size: 14px;'>Número de Celular: </span><b style='font-size:16px;padding-bottom:5px'>"+user.mobile_number+"</b></li> <li style='list-style:none'><span style='font-size: 14px;'>Número Secundário: </span><b style='font-size:16px;padding-bottom:5px'>"+user.secundary_number+"</b></li> </ul><ul><li style='list-style:none'><span style='font-size: 14px;'>Rua: </span><b style='font-size:16px;padding-bottom:5px'>"+user.street+"</b></li> <li style='list-style:none'><span style='font-size: 14px;'>Número: </span><b style='font-size:16px;padding-bottom:5px'>"+user.number+"</b></li> <li style='list-style:none'><span style='font-size: 14px;'>Complemento: </span><b style='font-size:16px;padding-bottom:5px'>"+user.complement+"</b></li> <li style='list-style:none'><span style='font-size: 14px;'>Bairro: </span><b style='font-size:16px;padding-bottom:5px'>"+user.neighborhood+"</b></li> </ul><ul><li style='list-style:none'><span style='font-size: 14px;'>Comprovante de Endereço: </span><b style='font-size:16px;padding-bottom:5px'>"+user.proof_of_address+"</b></li> <li style='list-style:none'><span style='font-size: 14px;'>Motivo de Tratamento: </span><b style='font-size:16px;padding-bottom:5px'>"+user.reason_treatment+"</b></li> <li style='list-style:none'><span style='font-size: 14px;'>Texto do Motivo de Tratamento: </span><b style='font-size:16px;padding-bottom:5px'>"+user.reason_treatment_text+"</b></li> <li style='list-style:none'><span style='font-size: 14px;'>Documento de Identidade: </span><b style='font-size:16px;padding-bottom:5px'>"+user.rg_proof+"</b></li></ul><ul> <li style='list-style:none'><span style='font-size: 14px;'>Tipo de Responsável: </span><b style='font-size:16px;padding-bottom:5px'>"+user.responsable_type+"</b></li> </ul>"

  console.log(process.env.REACT_APP_WEKAN_AUTHOR_ID)    
    
    const body = {
      "authorId": process.env.REACT_APP_WEKAN_AUTHOR_ID,
      "title": nameAssociate,
      "description": description,
      "swimlaneId": process.env.REACT_APP_WEKAN_ASSOCIATES_SWINLANE_ID,
      "customFields": [
        {
          "_id": process.env.REACT_APP_WEKAN_ASSOCIATES_CUSTOMFIELD_ID,
          "name": "cod_user",
          "value": user.user_code
      }
      ]
    }

    await apiRequest('/wekan/create-card', body, 'POST')
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.error(error);
      });

  }

  return (
    <div className="form-container">
      <h1 className="sub-title">Envie sua receita médica abaixo: </h1>
      {!user.medical_prescription && (
        <Form onSubmit={submit}>
          <Form.Group controlId="formFile">
            <Form.Label>Receita Médica</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </Form>
      )}
      {user.medical_prescription && (
        <div>
          Receita Médica Enviada
        </div>
      )}
      <button onClick={approve} type="button" class="btn btn-success" disabled={!user.medical_prescription}>Solicitar aprovação do cadastro</button>
    </div>

  );
}

export default Prescription;
