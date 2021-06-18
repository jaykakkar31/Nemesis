import axios from "axios";
const url="http://localhost:9000"

export async function login(data) {
  const response = 
  axios({
    method: "post",
    url: "/login",
    data,
  });
  return await response;
}

export async function userDetails(data) {
  const response = axios({
    method: "post",
    url:  "/",
    data,
  });
  return await response;
}

export async function showDetails() {
  const response = axios({
    method: "get",
    url:  "/showDetails",
  });
  return await response;
}

export async function deleteUserDetail(id, value,name) {

  const response = axios({
    method: "patch",
    url: "/patch",
    data:{id:id,value:value,name:name},
  });
  return await response;
}