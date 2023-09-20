const axios = require('axios')
const express = require('express');
const router = express.Router();
const wekanRequest = require('./modules/wekanRequest');
const directusRequest = require('./modules/directusRequest');

router.post('/create-card', async (req, res) => {

    const token = req.headers.authorization

    const verToken = await directusRequest("/items/Users_Api?filter[token][_eq]=" + token + "", '', "GET")
    if (verToken) {
        console.log("OK")
      const userData = await wekanRequest("/boards/"+WEKAN_ASSOCIATES_BOARD_ID+"/lists/"+WEKAN_ASSOCIATES_LIST_ID+"/cards", req.body, "POST")
           console.log(userData)
        await wekanRequest("boards/"+WEKAN_ASSOCIATES_BOARD_ID+"/lists/"+WEKAN_ASSOCIATES_LIST_ID+"/cards/" + userData._id, { "customFields": req.body.customFields }, "PUT")

        res.send({message:"Card created!"})
        res.status(200)
    } else {
        res.status(401).json({ mensagem: 'Credenciais inválidas' });
        res.status(401)
    }
});

router.post('/webhook-approve-associate', async (req, res) => {

    console.log(req.body)
    let cod_user

    await wekanRequest("/api/boards/"+WEKAN_MEDICAL_BOARD_ID+"/lists/" + req.body.listId + "/cards/" + req.body.cardId, {}, "GET")
        .then(response => {
        //    console.log(response.customFields)

        console.log(response)

            const fields = response.customFields

       /*     for (const obj of fields) {
                if (obj._id === "KmW28whGveR7G7SM2") {
                    cod_user = obj.value;
                    break;
                }
            }
            return cod_user*/

        })
        .catch(error => {
            console.error(error);
        });

    let data = JSON.stringify({
        "code_user": cod_user
    });

  //  console.log(cod_user)

/*    const userData = await directusRequest("/items/Users?filter[user_code][_eq]=" + cod_user + "", '', "GET")
    console.log(userData)

    await directusRequest("/items/Users/" + userData.id, { "associate_status": 6 }, "PATCH")

*/
    res.status(200).send('OK');
});




module.exports = router;
