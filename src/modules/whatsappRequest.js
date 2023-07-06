import axios from 'axios'

async function whatsappRequest(data){
var requestData = []
let config = {
  method: "POST",
  headers:{
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':'Content-Type,Authorization,Access-Control-Allow-Origin,Access-Control-Allow-Headers',
    'Content-Type': 'application/json', 
    'Authorization': process.env.REACT_APP_WHATSAPP_TOKEN,
   },
  maxBodyLength: Infinity,
  url: process.env.REACT_APP_WHATSAPP_URL,
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

export default whatsappRequest