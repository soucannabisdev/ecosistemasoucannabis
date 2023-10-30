import apiRequest from "./apiRequest";

async function User() {
  let requestData = [];

  try {
    requestData = await apiRequest("/api/directus/products", "", "GET");
  } catch (error) {
    console.log(error);
  }

  return requestData;
}

export default User;
