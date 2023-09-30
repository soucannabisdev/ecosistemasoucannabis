const axios = require('axios')
const express = require('express');
const router = express.Router();
const sendEmail = require('./modules/sendEmail');
const directusRequest = require('./modules/directusRequest');
const dotenv = require('dotenv');
const CryptoJS = require('crypto-js');
dotenv.config();

router.post('/lost-password', async (req, res) => {

    const token = req.headers.authorization

    const verToken = await directusRequest("/items/Users_Api?filter[token][_eq]=" + token + "", '', "GET")
    if (verToken) {

        const userData = await directusRequest("/items/Users?filter[email_account][_eq]=" + req.body.email + "", '', "GET")

        if (userData == undefined) {
            console.log("email nao existe")
            res.send(false)
        } else (
            res.send(true)
        )

        function encrypt(encrypt, secretKey) {
            const encrypted = CryptoJS.AES.encrypt(encrypt, secretKey).toString();
            return encrypted;
        }

        const secretKey = process.env.REACT_APP_PASS_ENCRYPT

        var id = userData.id
        id = id.toString()

        const date = new Date().getTime()

        const timestamp = encrypt(date.toString(), secretKey);
        const userId = encrypt(id.toString(), secretKey);

        sendEmail(req.body.email, 'Recuperação de senha', '<a href="' + process.env.REACT_APP_URL + '/nova-senha?' + timestamp + '?' + userId + '">Clique aqui para redefinir sua senha</a>')


    }

});


module.exports = router;
