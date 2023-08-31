import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import directusRequestUpload from '../../modules/directusRequestUpload'
import apiRequest from "../../modules/apiRequest";
import User from '../../modules/User'
import { Link } from 'react-router-dom';



const FileUploadComponent = () => {

    if (!localStorage.getItem("user_code")) {
        console.log(window.location.assign("/login"))
    }



    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file3, setFile3] = useState(null);
    const [file4, setFile4] = useState(null);
    const [user, setUser] = useState({});
    const [rgProof, setRgProof] = useState(false);
    const [rg_patient_proof, setRg_patient_proof] = useState(false);
    const [proof_of_address, setProof_of_address] = useState(false);
    const [contract, setcontract] = useState(false);
    const [generateContract, setGenerateContract] = useState(false);


    useEffect(() => {
        (async function () {
            const userData = await User();
            setUser(userData);

            if (userData.rg_proof == null) {
                setRgProof(false)
            }

            if (userData.rg_patient_proof == null) {
                setRg_patient_proof(false)
            }

            if (userData.proof_of_address == null) {
                setProof_of_address(false)
            }
            if (userData.contract == null) {
                setcontract(false)
            }

        })();
    }, []);


    const handleFile1Change = async (event) => {
        setFile1(event.target.files[0]);

        console.log(event.target.files[0])

        const file1 = event.target.files[0]

        const createFolder = await apiRequest("/directus/create-folder", { "name": user.user_code }, "POST")
        var userFolder = createFolder.id
        console.log("User Folder: " + userFolder)
        localStorage.setItem("user_folder", userFolder)

        file1.storage = "local"
        file1.filename_download = file1.name

        var formData = new FormData();
        formData.append("folder", userFolder)
        formData.append("file", file1)

        var fileId = ""

        await directusRequestUpload("/files", formData, "POST", { "Content-Type": "multipart/form-data" })
            .then(response => {
                fileId = response.id
                console.log(response)
                return fileId
            })
            .catch(error => {
                console.error(error);
            })

        const bodyRequest = { rg_proof: fileId }
        await apiRequest("/directus/update", { "userId": user.id, "formData": bodyRequest }, "POST")

            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.error(error);
            });

        setRgProof(true)
    };

    const handleFile2Change = async (event) => {
        setFile2(event.target.files[0]);

        const file2 = event.target.files[0]

        var userFolder = localStorage.getItem("user_folder")

        file2.storage = "local"
        file2.filename_download = file2.name

        var formData = new FormData();
        formData.append("folder", userFolder)
        formData.append("file", file2)

        var fileId = ""

        console.log(formData)

        await directusRequestUpload("/files", formData, "POST", { "Content-Type": "multipart/form-data" })
            .then(response => {
                fileId = response.id
                return fileId
            })
            .catch(error => {
                console.error(error);
            })

        const bodyRequest = { proof_of_address: fileId }
        await apiRequest("/directus/update", { "userId": user.id, "formData": bodyRequest }, "POST")

            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.error(error);
            });

        setProof_of_address(true)


    };

    const handleFile3Change = async (event) => {
        setFile3(event.target.files[0]);

        const file3 = event.target.files[0]

        var userFolder = localStorage.getItem("user_folder")

        file3.storage = "local"
        file3.filename_download = file3.name

        var formData = new FormData();
        formData.append("folder", userFolder)
        formData.append("file", file3)

        var fileId = ""

        await directusRequestUpload("/files", formData, "POST", { "Content-Type": "multipart/form-data" })
            .then(response => {
                fileId = response.id
                return fileId
            })
            .catch(error => {
                console.error(error);
            })

        const bodyRequest = { rg_patient_proof: fileId }
        await apiRequest("/directus/update", { "userId": user.id, "formData": bodyRequest }, "POST")

            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.error(error);
            });

        setRg_patient_proof(true)
    };

    const handleFile4Change = async (event) => {
        setFile4(event.target.files[0]);

        const file4 = event.target.files[0]

        var userFolder = localStorage.getItem("user_folder")

        file4.storage = "local"
        file4.filename_download = file4.name

        var formData = new FormData();
        formData.append("folder", userFolder)
        formData.append("file", file4)

        var fileId = ""

        await directusRequestUpload("/files", formData, "POST", { "Content-Type": "multipart/form-data" })
            .then(response => {
                fileId = response.ids
                return fileId
            })
            .catch(error => {
                console.error(error);
            })

       /* const bodyRequest = { contract: fileId, associate_status: 4 }
        await apiRequest("/directus/update", { "userId": user.id, "formData": bodyRequest }, "POST")

            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.error(error);
            });*/

        setcontract(true)
        window.location.assign("/consulta");
    };

    const zapsign = async (event) => {

        var fields = [
            "name_associate",
            "lastname_associate",
            "nacionality",
            "marital_status",
            "rg_associate",
            "cpf_associate",
            "emiiter_rg_associate",
            "email",
            "street",
            "number",
            "neighborhood",
            "city",
            "cep", 
            "date"
        ]

        const months = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ];

        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        const monthName = months[month];
        const formattedDate = `${day} de ${monthName} de ${year}`;

        user.date = formattedDate

        var userData = []
        const templateInfo = await apiRequest("/zapsign/template-info", "", "GET")

        var inputs = templateInfo.inputs
        inputs.forEach(async function (input, i) {
            
            userData.push({
                "de": input.variable,
                "para": await user[fields[i]]
            })
        })
       
        console.log(await userData)

       const createContract = await apiRequest("/zapsign/create-contract", {"userData":userData, "cod_id":user.id}, "POST")
        console.log(createContract.signers[0].sign_url)
        setGenerateContract(createContract.signers[0].sign_url)
    }


    return (
        <div class="justify-content-center">
            <h1 class="sub-title">Envie os documentos citados abaixo para comprovar seu RG e Residência.</h1>

            <div class="">
                {!rgProof && (
                    <Form>
                        <Form.Group controlId="formFile1">
                            <Form.Label className="label-upload">Comprovante de Identidade do Associado</Form.Label>
                            <Form.Control className="input-upload" type="file" onChange={handleFile1Change} />
                        </Form.Group>
                    </Form>
                )}

                {rgProof && (
                    <div>
                        <Form.Label className="label-upload send-ok">Comprovante de identidade enviado</Form.Label>
                    </div>
                )}

                {!proof_of_address && (
                    <Form>
                        <Form.Group controlId="formFile2">
                            <Form.Label className="label-upload">Comprovante de residência</Form.Label>
                            <Form.Control className="input-upload" type="file" onChange={handleFile2Change} disabled={!rgProof} />
                        </Form.Group>
                    </Form>
                )}
                {proof_of_address && (
                    <div class="document-send">
                        <Form.Label className="label-upload send-ok">Comprovante de endereço já enviado</Form.Label>
                    </div>
                )}

                {user.responsable_type == "another" && !rg_patient_proof && (

                    <Form>
                        <Form.Group controlId="formFile3">
                            <Form.Label className="label-upload">Comprovante de identidade do paciente</Form.Label>
                            <Form.Control className="input-upload" type="file" onChange={handleFile3Change} disabled={!proof_of_address} />
                        </Form.Group>
                    </Form>
                )}

                {rg_patient_proof && user.responsable_type == "another" && (
                    <div class="document-send">
                        <Form.Label className="label-upload send-ok">Rg do Paciente já enviado</Form.Label>
                    </div>
                )}

                {!contract && (
                    <Form>
                        <Form.Group controlId="formFile4">
                            <Form.Label className="label-upload">Contrato assinado</Form.Label>
                            <Form.Control type="file" className="input-upload" onChange={handleFile4Change} disabled={!proof_of_address} />
                        </Form.Group>
                    </Form>
                )}
                {contract && (
                    <div class="document-send">
                        <Form.Label className="label-upload send-ok">Contrato já enviado</Form.Label>

                    </div>
                )}

                <Form>
                    <Form.Group controlId="formFile4">
                        <Form.Label onClick={zapsign} className="label-upload" disabled={generateContract}>Gerar um contrato com Zapsign</Form.Label>
                    </Form.Group>
                </Form>

                {generateContract && (
                    <a  className="label-upload" target="_blank" href={generateContract}>                   
                             Assinar Contrato Online                     
                     </a>
                )}
            </div>
        </div>

    );
};

export default FileUploadComponent;
