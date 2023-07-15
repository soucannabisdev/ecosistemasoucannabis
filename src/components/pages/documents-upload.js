import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import directusRequest from '../../modules/apiRequest'
import apiRequest from "../../modules/apiRequest";
import User from '../../modules/User'



const FileUploadComponent = () => {
    
    if(!localStorage.getItem("user_code")){
        console.log(window.location.assign("/login"))
      }
      

    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file3, setFile3] = useState(null);
    const [file4, setFile4] = useState(null);
    const [user, setUser] = useState({});
    const [rgProof, setRgProof] = useState(true);
    const [rg_patient_proof, setRg_patient_proof] = useState(true);
    const [proof_of_address, setProof_of_address] = useState(true);
    const [contract, setcontract] = useState(true);


    useEffect(() => {
        (async function () {
            const userData = await User();
            setUser(userData);

            
            if (userData.rg_proof == null) {
                setRgProof(true)
            } else {
                setRgProof(false)
            }

            if (userData.rg_patient_proof == null) {
                setRg_patient_proof(true)
            } else {
                setRg_patient_proof(false)
            }

            if (userData.proof_of_address == null) {
                setProof_of_address(true)
            } else {
                setProof_of_address(false)
            }

            if (userData.contract == null) {
                setcontract(true)
            } else {
                setcontract(false)
            }

        })();
    }, []);


    const handleFile1Change = async (event) => {
        setFile1(event.target.files[0]);
    };

    const handleFile2Change = (event) => {
        setFile2(event.target.files[0]);
    };

    const handleFile3Change = (event) => {
        setFile3(event.target.files[0]);
    };

    const handleFile4Change = (event) => {
        setFile4(event.target.files[0]);
    };



    const rgProofSubmit = async (event) => {
        event.preventDefault();

        file1.storage = "local"
        file1.filename_download = file1.name

        var formData = new FormData();
        formData.append("file", file1)

        var fileId = ""

        await apiRequest("/files", formData, "POST")
            .then(response => {
                console.log(response)
                fileId = response.data.id
                return fileId
            })
            .catch(error => {
                console.error(error);
            });

        if (user.proof_of_address && user.rg_patient_proof && user.contract) {
            var status = 4
        } 
        const bodyRequest = { rg_proof: fileId, associate_status: status }
        
        await apiRequest("/directus/update", {"userId":user.id, "formData":bodyRequest}, "POST")
            .then(response => {
                
            })
            .catch(error => {
                console.error(error);
            });

            window.location.reload()

    };

    const proofAdressSubmit = async (event) => {
        event.preventDefault();

        file2.storage = "local"
        file2.filename_download = file2.name

        var formData = new FormData();
        formData.append("file", file2)

        var fileId = ""

        await apiRequest("/files", formData, "POST")
            .then(response => {
                console.log(response)
                fileId = response.data.id
                return fileId
            })
            .catch(error => {
                console.error(error);
            });

            if (user.rg_proof && user.rg_patient_proof && user.contract) {
            var status = 4
        } 

        const bodyRequest = { proof_of_address: fileId, associate_status: status }

        await apiRequest("/directus/update", {"userId":user.id, "formData":bodyRequest}, "POST")
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.error(error);
            });

            window.location.reload()

    };

    const rgProofPatientSubmit = async (event) => {
        event.preventDefault();

        file3.storage = "local"
        file3.filename_download = file3.name

        var formData = new FormData();
        formData.append("file", file3)

        var fileId = ""

        await apiRequest("/files", formData, "POST")
            .then(response => {
                console.log(response)
                fileId = response.data.id
                return fileId
            })
            .catch(error => {
                console.error(error);
            });

        console.log(user)

        if (user.proof_of_address && user.rg_patient_proof && user.contract) {
            var status = 4
        } 

       const bodyRequest =  { rg_patient_proof: fileId, associate_status: status }

       await apiRequest("/directus/update", {"userId":user.id, "formData":bodyRequest}, "POST")
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.error(error);
            });

            window.location.reload()

    };

    const contractSubmit = async (event) => {
        event.preventDefault();

        file4.storage = "local"
        file4.filename_download = file4.name

        var formData = new FormData();
        formData.append("file", file4)

        var fileId = ""

        await apiRequest("/files", formData, "POST")
            .then(response => {
                console.log(response)
                fileId = response.data.id
                return fileId
            })
            .catch(error => {
                console.error(error);
            });

        console.log(user)

        if (user.proof_of_address && user.rg_patient_proof && user.rg_proof) {
            var status = 4
        } 
        
        const bodyRequest = { contract: fileId, associate_status: status }
        await apiRequest("/directus/update", {"userId":user.id, "formData":bodyRequest}, "POST")

            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.error(error);
            });

            window.location.reload()

    };


    return (
        <Container>
            <Row>
                <Col md={6}>
                    {rgProof && (
                        <Form onSubmit={rgProofSubmit}>
                            <Form.Group controlId="formFile1">
                                <Form.Label>Arquivo 1</Form.Label>
                                <Form.Control type="file" onChange={handleFile1Change} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Enviar
                            </Button>
                        </Form>
                    )}

                    {!rgProof && (
                        <div>
                            RG já enviado
                        </div>
                    )}
                </Col>
                <Col md={6}>
                    {proof_of_address && (
                        <Form onSubmit={proofAdressSubmit}>
                            <Form.Group controlId="formFile2">
                                <Form.Label>Arquivo 2</Form.Label>
                                <Form.Control type="file" onChange={handleFile2Change} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Enviar
                            </Button>
                        </Form>
                    )}
                    {!proof_of_address && (
                        <div>
                            Comprovante de endereço já enviado
                        </div>
                    )}
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    {rg_patient_proof && (
                        <Form onSubmit={rgProofPatientSubmit}>
                            <Form.Group controlId="formFile3">
                                <Form.Label>Arquivo 3</Form.Label>
                                <Form.Control type="file" onChange={handleFile3Change} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Enviar
                            </Button>
                        </Form>
                    )}
                    {!rg_patient_proof && (
                        <div>
                            Rg do Paciente já enviado
                        </div>
                    )}
                </Col>
                <Col md={6}>
                    {contract && (
                        <Form onSubmit={contractSubmit}>
                            <Form.Group controlId="formFile4">
                                <Form.Label>Arquivo 4</Form.Label>
                                <Form.Control type="file" onChange={handleFile4Change} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Enviar
                            </Button>
                        </Form>
                    )}
                    {!contract && (
                        <div>
                            Contrato já enviado
                        </div>
                    )}
                </Col>
            </Row>

        </Container>
    );
};

export default FileUploadComponent;
