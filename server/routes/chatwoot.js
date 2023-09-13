const axios = require('axios')
const express = require('express');
const router = express.Router();
const chatWootRequest = require('./modules/chatWootRequest')
const directusRequest = require('./modules/directusRequest');
const dotenv = require('dotenv');
dotenv.config();

router.post('/send-message-api', async (req, res) => {

    const token = req.headers.authorization

    const phone = req.body.phone

    const verToken = await directusRequest("/items/Users_Api?filter[token][_eq]=" + token + "", '', "GET")
    if (verToken) {     
        await chatWootRequest(phone, "Olá, " + req.body.name + ".\nSua solicitação de contato foi recebida, você entá em nossa lista de espera!\nAguarde para ser etendido.\nObrigado.")
        .then((response) => {
            res.send(response)
        })
        .catch((error) => {
            console.log(error);
        });

    } else {
        res.status(401)
    }
});

router.post('/send-message-chat', async (req, res) => {

    const token = req.headers.authorization

    const verToken = await directusRequest("/items/Users_Api?filter[token][_eq]=" + token + "", '', "GET")
    if (verToken) {     
        var sourceId = 0
        var conversationId = 0

        const url = process.env.CHATWOOT_URL+"/public/api/v1/inboxes/"+process.env.CHANNEL_ID+"/contacts"
        
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
