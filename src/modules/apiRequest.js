import axios from 'axios'

async function apiRequest(query, body, method, headers) {
  var requestData = []

  let config = {
    method: method,
    maxBodyLength: Infinity,
    url: 'http://localhost:3005' + query,
    headers: {
      'Authorization': '7ebbfd8f63600b172dc430f9e8884af5f04496b4bbb0d3d33c946a93f3d88b80'
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