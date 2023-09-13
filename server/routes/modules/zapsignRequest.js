const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config()

var requestData = []

async function zapsignRequest(query, data, method) {
  console.log(JSON.stringify(data))
     let config = {
        method: method,
        headers: {
          'Content-Type': 'application/json'
      },
        redirect: 'follow',
        url: process.env.ZAPSIGN_URL+query+'?api_token='+process.env.ZAPSIGN_API_TOKEN,
        data : JSON.stringify(data)
      };
      
      await axios.request(config)
      .then((response) => {
        requestData = response.data
      })
      .catch((error) => {
        console.log(error);
      });

      return requestData
}

module.exports = zapsignRequest;
