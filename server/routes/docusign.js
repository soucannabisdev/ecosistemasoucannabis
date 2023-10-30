const axios = require('axios')
const express = require('express');
const router = express.Router();
const docusignRequest = require('./modules/docusignRequest');
const directusRequest = require('./modules/directusRequest');


router.post('/create-contract', async (req, res) => {

    const token = req.headers.authorization
    const verToken = await directusRequest("/items/Users_Api?filter[token][_eq]=" + token + "", '', "GET")

    if (verToken) {
        console.log(req.body)

        var body = JSON.stringify({
            "template_id": 1,
            "submission": [
                {
                    "submitters": [
                        {
                            "name": req.body[1].default_value,
                            "role": "First Submitter",
                            "email": "john.doe@example.com",
                            "phone": "+1234567890",
                            "values": "",
                            "fields": req.body
                        }
                    ]
                }
            ]
        });

        const docusignContract = await docusignRequest("/submissions", body, "POST")
        res.send(docusignContract)
        res.status(200)
    } else {
        res.status(401).json({ mensagem: 'Credenciais inválidas' });
        res.status(401)
    }
});

router.post('/assign-contracts', async (req, res) => {
    if (req.body.event_type == "form.completed") {
        await directusRequest("/items/Users/" + req.body.data.values[0].value, { associate_status: 4, contract: req.body.data.documents[0].url }, "PATCH")
    }
    res.status(200).send("OK")
});

module.exports = router;
