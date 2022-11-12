import axios from "axios";

let request = axios.create({
  timeout: 60000,
  baseURL: "/api/chat",
});

request.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token")) {
      config.headers["Authorization"] =
        "Bearer " + localStorage.getItem("token");
    }
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

// 后端包装了一下，这里的code是服务端自定义的返回值
request.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    console.log("err" + error);
    return Promise.reject(error);
  }
);

export default {
  //用户登录
  login(user) {
    console.log(user.password);
    return request.post(`/user/login/`, {
      account: user.username,
      password: user.password,
    });
  },

  // 获取当前id用户的好友列表
  getFriends() {
    return request.get(`/friend/list`);
  },

  // 获取和某个好友的聊天记录
  getSingleMessages(friendId, myId) {
    console.log(friendId, myId);
    return request.post(`/singleMessage/getRecentSingleMessage`, {
      friendId: friendId,
      myselfId: myId,
    });
  },
};
