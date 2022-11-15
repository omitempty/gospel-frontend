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
    console.log(user);
    return request.post(`/user/login`, {
      account: user.username,
      password: user.password,
    });
  },

  // 获取当前id用户的好友列表
  getFriends() {
    return request.get(`/friend/getFriendAndMessage`);
  },

  // 获取和某个好友的聊天记录
  getSingleMessages(param) {
    // tmd 路径写错了，参数似乎也只能传一个对象
    // console.log(param);
    return request.post(`/singleMessage/getRecentSingleMessages`, param);
  },

  // 获取当前id用户的群列表
  getGroups() {
    return request.get(`/group/getMyGroup`);
  },

  // 获取某个群的聊天记录
  // 这里get请求还带params参数了，不知道会不会有问题
  getGroupMessages(param) {
    return request.get(
      `groupMessage/getRecentGroupMessages?groupId=${param.groupId}&myselfId=${param.myselfId}`
    );
  },

  // 获取某个群聊的成员列表
  getGroupMembers(param) {
    return request.post("/group/getAllMembers", param);
  },

  // 关键词搜索好友
  searchUsers(keyword) {
    return request.get(`/user/search/${keyword}`);
  },

  // 关键词搜索群聊
  searchGroups(param) {
    return request.post(`/group/search`, {
      nameOrNumber: param,
    });
  },

  // 查看好友请求列表, 返回所有状态的请求
  getFriendRequestsToMe() {
    return request.get("/friend/request/list");
  },

  // 获取我发送的好友请求
  getFriendRequestsFromMe() {
    return request.get("/friend/getSelfRequest");
  },

  // 获取加群请求
  getGroupRequestsToMe() {
    return request.get("/group/get/requestList");
  },

  // 获取我发送的加群请求
  getGroupRequestsFromMe() {
    return request.get("/group/get/myRequest");
  },

  // 发送好友请求
  sendFriendRequest(param) {
    // 原来是路径忘改了...
    return request.post(`/friend/send`, {
      sendTime: param.sendTime,
      userFrom: param.userFrom,
      userTo: param.userTo,
    });
  },

  // 其实只有通过post status一个接口，但是这边封装一下，内部逻辑对视图透明
  // 通过好友请求
  passFriendRequest() {
    return request.get();
  },

  // 拒绝好友请求

  // 获取导师列表
  getTutors(major) {
    return request.get(`/user/searchTeacher?major=${major}`);
  },
};
