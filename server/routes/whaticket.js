const axios = require('axios')
const express = require('express');
const router = express.Router();
const whatciketRequest = require('./modules/whatciketRequest')


router.post('/send-message', async (req, res) => {

    const token = req.headers.authorization
    console.log(req.body)

    if (token == "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwiaWF0IjoxNjg4ODU0MDQ3fQ.rouBF2M_r2UCJfUcUrlhggINHuyJnfCK7IqmO35p5bk") {

         await whatciketRequest(JSON.stringify({
           "number": req.body.phone,
           "body": "Olá "+req.body.name+", mensagem da API"
         }))

    } else {
        res.status(401).json({ mensagem: 'Credenciais inválidas' });
        res.status(401)
    }
});


module.exports = router;
