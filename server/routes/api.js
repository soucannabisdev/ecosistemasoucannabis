const axios = require('axios')
const express = require('express');
const router = express.Router();
const directusRequest = require('./modules/directusRequest');
const crypto = require('crypto');
const bcrypt = require('bcrypt');


router.post('/login', async (req, res) => {
    console.log(req.body)

    const userData = await directusRequest("/items/Users_Api?filter[email][_eq]=" + req.body.email + "", '', "GET")

    console.log(userData)

    const randomToken = crypto.randomBytes(32).toString('hex');

    console.log('Generated API token:', randomToken);

    await directusRequest("/items/Users_Api/" + userData.id, { token: randomToken }, "PATCH")

    const login = {
        "user_email": req.body.email,
        "token_api": randomToken
    }

    res.status(200).send(login);
});


module.exports = router;
