const axios = require('axios')
const express = require('express');
const router = express.Router();
const zapsignRequest = require('./modules/zapsignRequest');
const directusRequest = require('./modules/directusRequest');

router.get('/template-info', async (req, res) => {

    const token = req.headers.authorization
    const verToken = await directusRequest("/items/Users_Api?filter[token][_eq]=" + token + "", '', "GET")

    if (verToken) {
        const templateInfo = await zapsignRequest("/templates/"+process.env.REACT_ZAPSIGN_TEMPLATE_CONTRACT, "", "GET")
        res.send(templateInfo)   
        res.status(200)
    } else {
        res.status(401).json({ mensagem: 'Credenciais inválidas' });
        res.status(401)
    }
});

router.post('/create-contract', async (req, res) => {

    const token = req.headers.authorization
    const verToken = await directusRequest("/items/Users_Api?filter[token][_eq]=" + token + "", '', "GET")

    console.log(req.body)

    if (verToken) {
        const templateInfo = await zapsignRequest("/models/create-doc/" , 
      {
        "sandbox": true,
        "template_id": process.env.REACT_ZAPSIGN_TEMPLATE_CONTRACT,
        "signer_name": "souCannabis",
        "send_automatic_email": true,
        "send_automatic_whatsapp": false,
        "lang": "pt-br",
        "data": req.body.userData,
        "name":"Contrato",
        "external_id":req.body.cod_id
  }, "POST")
        res.send(templateInfo)    
        res.status(200)
    } else {
        res.status(401).json({ mensagem: 'Credenciais inválidas' });
        res.status(401)
    }
});

router.post('/assign-contracts', async (req, res) => {

   await directusRequest("/items/Users/" + req.body.external_id, {associate_status: 4 }, "PATCH")

   res.status(200).send("OK")
});







module.exports = router;
