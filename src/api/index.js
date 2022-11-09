import axios from "axios";

let request = axios.create({
  timeout: 60000,
  baseURL: "/api",
});

export default {
  //用户登录
  login(user) {
    return request.get(
      `/users?username=${user.username}&password=${user.password}`
    );
  },

  // 获取当前id用户的好友列表
  getFriends() {
    return request.get(`/users`);
  },
};
