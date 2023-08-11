const axios = require('axios')
const express = require('express');
const router = express.Router();
const chatWootRequest = require('./modules/chatWootRequest')


router.post('/send-message-api', async (req, res) => {

    const token = req.headers.authorization
    console.log(req.body)

    const phone = req.body.phone
    const phoneMask = phone.split("+").join("")

    if (token == "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwiaWF0IjoxNjg4ODU0MDQ3fQ.rouBF2M_r2UCJfUcUrlhggINHuyJnfCK7IqmO35p5bk") {

        await chatWootRequest(phoneMask, "Olá, " + req.body.name + ".\nSua solicitação de contato foi recebida, você entá em nossa lista de espera!\nAguarde para ser etendido.\nObrigado.")

    } else {
        res.status(401)
    }
});

router.post('/send-message-chat', async (req, res) => {

    const token = req.headers.authorization
    console.log(req.body)

    if (token == "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwiaWF0IjoxNjg4ODU0MDQ3fQ.rouBF2M_r2UCJfUcUrlhggINHuyJnfCK7IqmO35p5bk") {

        var sourceId = 0
        var conversationId = 0

        const url = "https://atendimento.ecosistemasoucannabis.ong.br/public/api/v1/inboxes/U1fZCx8kvMv8TLFFQB5ZHZqh/contacts"
        
        let config = {
            method: 'POST',
            maxBodyLength: Infinity,
            url: url,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json; charset=utf-8',
            },
            data: JSON.stringify({
                "email": req.body.email,
                "name": req.body.name,
                "phone_number": req.body.phone_number
            })
        };


        await axios.request(config)
            .then((response) => {
                sourceId = response.data.source_id
                console.log(response.data)
                return sourceId
            })
            .catch((error) => {
                console.log(error);
            });


        await axios.request({
            method: 'POST',
            maxBodyLength: Infinity,
            url: url + "/" + sourceId + "/conversations",
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json; charset=utf-8',
            }
        })
            .then((response) => {
                conversationId = response.data.id
                return conversationId
            })
            .catch((error) => {
                console.log(error);
            });


        await axios.request({
            method: 'POST',
            maxBodyLength: Infinity,
            url: url + "/" + sourceId + "/conversations/" + conversationId + "/messages",
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json; charset=utf-8',
            },
            data: JSON.stringify({
                "content": "Contato em Fila de Espera - Nome: "+req.body.name,
            })
        })
            .then((response) => {
                console.log(response.data)
                res.send(response.data)
            })
            .catch((error) => {
                console.log(error);
            });

           

    } else {
        res.status(401)
    }
});


module.exports = router;
