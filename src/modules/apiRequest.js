import axios from 'axios'

async function apiRequest(query, body, method, headers) {
  var requestData = []

 /* if(body.formData){
    const formData = new FormData();
    formData.append('file', body.formData);
    formData.append('storage', 'local');
    formData.append('filename_download', 'name');
    body = formData
  }*/

  let config = {
    method: method,
    maxBodyLength: Infinity,
    url: 'http://localhost:3005' + query,
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwiaWF0IjoxNjg4ODU0MDQ3fQ.rouBF2M_r2UCJfUcUrlhggINHuyJnfCK7IqmO35p5bk'
    },
    data: body
  };  


  if (!headers) {
    config.headers = { ...config.headers, 'Content-Type': 'application/json' };
  } else {
    config.headers = { ...config.headers, ...headers };
  }


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