const axios = require('axios')
const express = require('express');
const router = express.Router();
const directusRequest = require('./modules/directusRequest');


router.post('/auth', (req, res) => {

    const { login, senha } = req.body;

    if (login === 'admin' && senha === 'pass') {
        const token = jwt.sign({ login }, chaveSecreta);
        res.json({ token });
    } else {
        res.status(401).json({ mensagem: 'Credenciais inválidas' });
    }
    res.status(200)
});


router.post('/user', async (req, res) => {

    const token = req.headers.authorization
    console.log(req.body)

    if (token == "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwiaWF0IjoxNjg4ODU0MDQ3fQ.rouBF2M_r2UCJfUcUrlhggINHuyJnfCK7IqmO35p5bk") {

        const userData = await directusRequest("/items/Users?filter[user_code][_eq]=" + req.body.code_user + "", '', "GET")
       
        if (userData) {
            delete userData.status
            delete userData.sort
            delete userData.user_created
            delete userData.user_updated
            delete userData.emiiter_rg_associate
        }
        res.send(userData)
        res.status(200)
    } else {
        res.status(401).json({ mensagem: 'Credenciais inválidas' });
        res.status(401)
    }
});

router.post('/user-appointment', async (req, res) => {

    const token = req.headers.authorization
    console.log(req.body)

    if (token == "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwiaWF0IjoxNjg4ODU0MDQ3fQ.rouBF2M_r2UCJfUcUrlhggINHuyJnfCK7IqmO35p5bk") {

        const userData = await directusRequest("/items/Users?filter[user_code][_eq]=" + req.body.code_user + "", '', "GET")
       
        if (userData) {
           delete userData.status
           delete userData.sort
           delete userData.user_created
           delete userData.user_updated
           delete userData.emiiter_rg_associate
           delete userData.associate_status
           delete userData.birthday_associate
           delete userData.birthday_patient
           //delete userData.cep
           //delete userData.city
           delete userData.complement
           delete userData.contract
           //delete userData.cpf_associate
           delete userData.cpf_patient
           delete userData.date_created
           delete userData.date_updated
           delete userData.email
           //delete userData.email_account
           delete userData.gender
           //delete userData.lastname_associate
           delete userData.lastname_patient
           delete userData.marital_status
           //delete userData.mobile_number
           //delete userData.name_associate
           delete userData.name_patient
           delete userData.nationality
           //delete userData.neighborhood
           //delete userData.number
           delete userData.pass_account
           delete userData.proof_of_address
           delete userData.reason_treatment
           delete userData.reason_treatment_text
           delete userData.responsable_type
           delete userData.rg_associate
           delete userData.rg_patient
           delete userData.rg_patient_proof
           delete userData.rg_proof
           delete userData.secundary_number
           //delete userData.state
           //delete userData.street
           delete userData.user_code
        }
        res.send(userData)
        res.status(200)
    } else {
        res.status(401).json({ mensagem: 'Credenciais inválidas' });
        res.status(401)
    }
});

router.post('/login', async (req, res) => {

    const token = req.headers.authorization

    if (token == "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwiaWF0IjoxNjg4ODU0MDQ3fQ.rouBF2M_r2UCJfUcUrlhggINHuyJnfCK7IqmO35p5bk") {

        const userData = await directusRequest("/items/Users?filter[email_account][_eq]=" + req.body.email + "", '', "GET")
       
        res.send(userData)
        res.status(200)
    } else {
        res.status(401).json({ mensagem: 'Credenciais inválidas' });
        res.status(401)
    }
});

router.post('/create-user', async (req, res) => {

    const token = req.headers.authorization

    console.log(req.body)

    if (token == "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwiaWF0IjoxNjg4ODU0MDQ3fQ.rouBF2M_r2UCJfUcUrlhggINHuyJnfCK7IqmO35p5bk") {

        const userData = await directusRequest("/items/Users", req.body, "POST")       
        res.send(userData)
        res.status(200)
    } else {
        res.status(401).json({ mensagem: 'Credenciais inválidas' });
        res.status(401)
    }
});

router.post('/update', async (req, res) => {

    const token = req.headers.authorization

    console.log(req.body)

    if (token == "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwiaWF0IjoxNjg4ODU0MDQ3fQ.rouBF2M_r2UCJfUcUrlhggINHuyJnfCK7IqmO35p5bk") {
  
       const userData = await directusRequest("/items/Users/"+req.body.userId, req.body.formData, "PATCH")
       
       res.send(userData)
        res.status(200)
    } else {
        res.status(401).json({ mensagem: 'Credenciais inválidas' });
        res.status(401)
    }
});

router.post('/files', async (req, res) => {

    const token = req.headers.authorization

    if (!req.body.file) {
        console.log("Nenhum Arquivo")
      }   

    if (token == "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwiaWF0IjoxNjg4ODU0MDQ3fQ.rouBF2M_r2UCJfUcUrlhggINHuyJnfCK7IqmO35p5bk") {
      
       const userData = await directusRequest("/files", req.body.file, "POST",{"Content-Type": "multipart/form-data"})
        res.send(userData)
        res.status(200)
    } else {
        res.status(401).json({ mensagem: 'Credenciais inválidas' });
        res.status(401)
    }
});

module.exports = router;
