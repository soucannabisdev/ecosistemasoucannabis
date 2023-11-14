import apiRequest from "./apiRequest";

const userCode = localStorage.getItem("user_code");

async function User() {
  let requestData = [];

  try {
    let data = JSON.stringify({
      code_user: userCode,
    });

    requestData = await apiRequest("/api/directus/user", data, "POST");
  } catch (error) {
    console.log(error);
  }
  return requestData;
}

export default User;
