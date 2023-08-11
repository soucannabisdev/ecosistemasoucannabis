const axios = require('axios');

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
        url: 'http://216.238.106.135:8083/message/sendText/API',
        headers: { 
          'Content-Type': 'application/json', 
          'apikey': 'zYzP7ocstxh3SJ23D4FZTCu4ehnM8v4hu'
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
}

module.exports = chatWootRequest;
