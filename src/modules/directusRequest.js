import axios from 'axios'

async function directusRequest(query, data, method){
var requestData = []
let config = {
  method: method,
  headers:{
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':'Content-Type,Authorization,Access-Control-Allow-Origin,Access-Control-Allow-Headers',
    'Authorization':process.env.REACT_APP_DIRECTUS_API_TOKEN
  },
  maxBodyLength: Infinity,
  url: process.env.REACT_APP_DIRECTUS_API_URL+query,
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

export default directusRequest