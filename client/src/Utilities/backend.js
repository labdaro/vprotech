import axios from "axios";
import cookie from "./cookie";
// const baseURL = "http://192.168.7.142:3000";
// const baseURL = "http://localhost:3000/api";
const baseURL ="api/"
export const signin = async (signinUser) => {
  console.log(signinUser);
  const response = await axios.post(`${baseURL}/user/login`, signinUser);
  if (response.status == 200) {
    cookie.setCookie("auth-token", response.data.token, 30); //window.localStorage.setItem("auth-token",token)
    localStorage.setItem("LastLogged", Date.now());
    window.location.replace("/");
  } else {
    alert("G");
  }
  return;
};

export const signout = () => {
  cookie.setCookie("auth-token", "", 30);
  localStorage.setItem("LastLogged", Date.now());
  window.location.reload();
};

export const getUser = async () => {
  const data = await makeGetRequest("/user");
  return data;
};

//use these when u need to use Authorization Bearer (access private routes)
export const makeGetRequest = async (route) => {
  const token = cookie.getCookie("auth-token");
  //concat the route and the baseURL together for example, our baseURL is http://localhost:3000 and route is /user => we get http://localhost:3000/user
  const url = baseURL + route;
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
export const makePostRequest = async (route, data) => {
  const token = cookie.getCookie("auth-token");
  const url = baseURL + route;
  const response = await axios.post(url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const makeDeleteRequest = async (route) => {
  const token = cookie.getCookie("auth-token");
  const url = baseURL + route;
  const response = await axios.delete(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const makeEditRequest = async (route, data) => {
  const token = cookie.getCookie("auth-token");
  const url = baseURL + route;
  const response = await axios.patch(url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
