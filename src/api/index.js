import axios from "axios";

let request = axios.create({
  timeout: 60000,
  baseURL: "/api",
});

export default {
  //用户登录
  login(user) {
    return request.get(`/users?id=${user.username}&password=${user.password}`);
  },

  // 获取当前id用户的好友列表
  getFriends(id) {
    return request.get(`/users`);
  },
};
