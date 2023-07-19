import axios from "axios";

const getData = (url) => {
  return axios.get(url);
};

const getTodosOfUser = (url, userId) => {
  return axios.get(`${url}${userId}`);
};

export { getData, getTodosOfUser };
