const axios = require('axios');

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
        url: process.env.REACT_CHATWOOT_API_URL+'/message/sendText/API',
        headers: { 
          'Content-Type': 'application/json', 
          'apikey': 'zYzP7ocstxh3SJ23D4FZTCu4ehnM8v4hu'
        },
        data : data
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

module.exports = chatWootRequest;
