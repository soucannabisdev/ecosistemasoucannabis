const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config()

var requestData = []

async function zapsignRequest(query, data, method) {
  console.log(JSON.stringify(data))
     let config = {
        method: method,
        headers: {
          "X-Auth-Token": "Z3sy7javjUGmuGSdthKaUf",
          "content-type": "application/json"
      },
        redirect: 'follow',
        url: "https://assinatura.ecosistemasoucannabis.ong.br/api"+query,
        data : data
      };
      
      await axios.request(config)
      .then((response) => {
        requestData = response.data
        console.log(requestData)
      })
      .catch((error) => {
        console.log(error);
      });

      return requestData
}

module.exports = zapsignRequest;
