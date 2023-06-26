import directusRequest from './directusRequest'

async function User(){
  const userCode = localStorage.getItem('user_code')
  const userData = await directusRequest("/items/Users?filter[user_code][_eq]=" + userCode + "&", '', "GET")

  return userData.data[0]
}

export default User