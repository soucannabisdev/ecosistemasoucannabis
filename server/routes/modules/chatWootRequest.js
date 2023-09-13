const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

var requestData = []

async function chatWootRequest(phone, mensage) {
    let data = JSON.stringify({
        "number": phone,
        "options": {
          "delay": 1200
        },
        "textMessage": {
          "text": mensage
        }
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: process.env.CHATWOOT_API_URL+'/message/sendText/'+process.env.CHATWOOT_INSTANCE_NAME,
        headers: { 
          'Content-Type': 'application/json', 
          'apikey': process.env.CHATWOOT_API_KEY
        },
        data : data
      };
      
      await axios.request(config)
      .then((response) => {
        console.log(response)
        requestData = response.data
      })
      .catch((error) => {
        console.log(error);
      });

      return requestData
}

module.exports = chatWootRequest;
