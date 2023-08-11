const axios = require('axios')
const express = require('express');
const router = express.Router();
const wekanRequest = require('./modules/wekanRequest');
const directusRequest = require('./modules/directusRequest');

router.post('/create-card', async (req, res) => {

    const token = req.headers.authorization

    if (token == "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwiaWF0IjoxNjg4ODU0MDQ3fQ.rouBF2M_r2UCJfUcUrlhggINHuyJnfCK7IqmO35p5bk") {

        const userData = await wekanRequest("boards/pxg4ZXFfNMDJjN8EB/lists/qqWz6usyZR3oXzMMn/cards", req.body, "POST")
        //    console.log(userData)

        await wekanRequest("boards/pxg4ZXFfNMDJjN8EB/lists/qqWz6usyZR3oXzMMn/cards/" + userData._id, { "customFields": req.body.customFields }, "PUT")

        res.send("Card created!")
        res.status(200)
    } else {
        res.status(401).json({ mensagem: 'Credenciais inválidas' });
        res.status(401)
    }
});

router.post('/webhook-approve-associate', async (req, res) => {

    console.log(req.body)
    let cod_user

    await wekanRequest("boards/pxg4ZXFfNMDJjN8EB/lists/" + req.body.listId + "/cards/" + req.body.cardId, {}, "GET")
        .then(response => {
            console.log(response.customFields)


            const fields = response.customFields

            for (const obj of fields) {
                if (obj._id === "R6pT2kypZDRA6ELtt") {
                    cod_user = obj.value;
                    break;
                }
            }
            return cod_user

        })
        .catch(error => {
            console.error(error);
        });

    let data = JSON.stringify({
        "code_user": cod_user
    });

    console.log(cod_user)

    const userData = await directusRequest("/items/Users?filter[user_code][_eq]=" + cod_user + "", '', "GET")
    console.log(userData)

    await directusRequest("/items/Users/" + userData.id, { "associate_status": 6 }, "PATCH")


    res.status(200).send('OK');
});




module.exports = router;
