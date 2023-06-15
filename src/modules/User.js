import directusRequest from './directusRequest'

async function User(){//
  console.log(localStorage.getItem('user_code'))
  const userCode = localStorage.getItem('user_code')
  const userData = await directusRequest("/items/Users?filter[user_code][_eq]=" + userCode + "&", '', "GET")

  return userData
}

export default User