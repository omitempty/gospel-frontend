import axios from "axios";

let request = axios.create({
  timeout: 60000,
  baseURL: "/api",
});

export default {
  login(user) {
    return request.get(`/users?id=${user.username}&password=${user.password}`);
  },
};
