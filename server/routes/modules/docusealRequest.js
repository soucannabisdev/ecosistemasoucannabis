const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config()

var requestData = []

async function zapsignRequest(query, data, method) {
  console.log(JSON.stringify(data))
     let config = {
        method: method,
        headers: {
          "X-Auth-Token": process.env.DOCUSEAL_API_KEY,
          "content-type": "application/json"
      },
        redirect: 'follow',
        url: process.env.DOCUSEAL_URL_API+query,
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
