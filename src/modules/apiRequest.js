import axios from 'axios'

async function apiRequest(query, body, method){
var requestData = []

let config = {
  method: method,
  maxBodyLength: Infinity,
  url: 'http://localhost:3005'+query,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwiaWF0IjoxNjg4ODU0MDQ3fQ.rouBF2M_r2UCJfUcUrlhggINHuyJnfCK7IqmO35p5bk'
  },
  data: body
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

export default apiRequest