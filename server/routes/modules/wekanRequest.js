const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

async function wekanRequest(query, data, method) {
    const config = {
        method: method,
        maxBodyLength: Infinity,
        url: process.env.WEKAN_URL+query,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': process.env.WEKAN_API_KEY
        },
        data: data
      }
    
   const response = await axios.request(config);
    
    return response.data;
   
}

module.exports = wekanRequest;


