const axios = require('axios');

async function wekanRequest(query, data, method) {
  //console.log(data)
    const config = {
        method: method,
        maxBodyLength: Infinity,
        url: 'http://216.238.102.44/api/'+query,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer VyNRj1niaZDoJpKveM5Q-Ww5LIYQ7SuKpuoZHhd9XSR'
        },
        data: data
      }
    
    const response = await axios.request(config);
    
    return response.data;
   
}

module.exports = wekanRequest;
