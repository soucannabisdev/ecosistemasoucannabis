import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import directusRequest from '../../modules/directusRequest'
import User from '../../modules/User'

const FileUploadComponent = () => {
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file3, setFile3] = useState(null);
    const [file4, setFile4] = useState(null);
    const [user, setUser] = useState({});
    const [rgProof, setRgProof] = useState(true);

    useEffect(() => {
        (async function () {
            const userData = await User();
            setUser(userData);
            if (userData.rg_proof == null) {
                setRgProof(true)
            } else {
                setRgProof(false)
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



    const handleFormSubmit1 = async (event) => {
        event.preventDefault();

        setRgProof(false)

        file1.storage = "local"
        file1.filename_download = file1.name

        var formData = new FormData();
        formData.append("file", file1)

        var fileId = ""

        await directusRequest("/files", formData, "POST")
            .then(response => {
                console.log(response)
                fileId = response.data.id
                return fileId
            })
            .catch(error => {
                console.error(error);
            });

        console.log(user)

        await directusRequest("/items/Users/" + user.id, { rg_proof: fileId }, "PATCH")
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.error(error);
            });

    };

    const handleFormSubmit2 = async (event) => {
        event.preventDefault();

        file2.storage = "local"
        file2.filename_download = file2.name

        console.log(file2)
        var formData = new FormData();
        formData.append("file", file2)

        await directusRequest("/files", formData, "POST")
    };

    const handleFormSubmit3 = async (event) => {
        event.preventDefault();

        file3.storage = "local"
        file3.filename_download = file3.name

        console.log(file3)
        var formData = new FormData();
        formData.append("file", file3)

        await directusRequest("/files", formData, "POST")
    };

    const handleFormSubmit4 = async (event) => {
        event.preventDefault();

        file4.storage = "local"
        file4.filename_download = file4.name

        console.log(file4)
        var formData = new FormData();
        formData.append("file", file4)

        await directusRequest("/files", formData, "POST")
    };

    return (
        <Container>
            <Row>
                <Col md={6}>
                    {rgProof && (
                        <Form onSubmit={handleFormSubmit1}>
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
                    <Form onSubmit={handleFormSubmit2}>
                        <Form.Group controlId="formFile2">
                            <Form.Label>Arquivo 2</Form.Label>
                            <Form.Control type="file" onChange={handleFile2Change} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Enviar
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form onSubmit={handleFormSubmit3}>
                        <Form.Group controlId="formFile3">
                            <Form.Label>Arquivo 3</Form.Label>
                            <Form.Control type="file" onChange={handleFile3Change} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Enviar
                        </Button>
                    </Form>
                </Col>
                <Col md={6}>
                    <Form onSubmit={handleFormSubmit4}>
                        <Form.Group controlId="formFile4">
                            <Form.Label>Arquivo 4</Form.Label>
                            <Form.Control type="file" onChange={handleFile4Change} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Enviar
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default FileUploadComponent;
