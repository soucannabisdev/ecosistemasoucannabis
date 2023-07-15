const axios = require('axios')

async function whaticketRequest(data){
var requestData = []
let config = {
  method: "POST",
  headers:{
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':'Content-Type,Authorization,Access-Control-Allow-Origin,Access-Control-Allow-Headers',
    'Content-Type': 'application/json', 
    'Authorization': "Bearer a5cb1e74-82de-4de9-ab22-b76b1c51860a",
   },
  maxBodyLength: Infinity,
  url: "https://sou-atendimento-backend.soucannabis.ong.br/api/messages/send",
  data: data
};

await axios.request(config)
.then((response) => {
  requestData = response.data
  return requestData
})
.catch((error) => {
  console.log(error);
});

return await requestData;
}

module.exports = whaticketRequest