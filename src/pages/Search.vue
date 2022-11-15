<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <div class="list">
      <!-- 搜索，先做个样式 -->
      <div class="search">
        <input
          @keyup.enter="isFriend ? searchUsers() : searchGroups()"
          type="text"
          v-model="searchInput"
          :placeholder="holder"
        />
      </div>
      <div class="search-switch">
        <span @click="switchFriend">好友</span>
        <span> | </span>
        <span @click="switchGroup">群聊</span>
      </div>
      <div v-if="isFriend" class="friend-list">
        <div class="friend" v-for="friend in friends" :key="friend.id">
          <div class="avatar">
            <img :src="friend.photo" />
          </div>
          <div class="detail">
            <p class="name">{{ friend.name }}</p>

            <div class="options">
              <el-button
                type="primary"
                circle
                size="mini"
                icon="el-icon-plus"
                @click="sendFriendRequest(friend.id)"
              ></el-button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="friend-list">
        <div class="friend" v-for="friend in groups" :key="friend.id">
          <div class="avatar">
            <img :src="friend.fzuGroup.photo" />
          </div>
          <div class="detail">
            <p class="name">{{ friend.fzuGroup.groupName }}</p>
            <div class="options">
              <el-button
                type="primary"
                circle
                size="mini"
                icon="el-icon-plus"
                @click="sendGroupRequest(friend.id)"
              ></el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="showcase">
      <div class="header">
        <p>{{ this.header }}</p>
      </div>
      <div class="search-switch">
        <span @click="switchTo">我收到的</span>
        <span> | </span>
        <span @click="switchFrom">我发出的</span>
      </div>
      <template v-if="isFriend">
        <div v-if="toMe" class="friend-list">
          <div class="friend" v-for="friend in friendRequests" :key="friend.id">
            <div class="avatar">
              <img :src="friend.photo" />
            </div>
            <div class="detail">
              <p class="name">{{ friend.name }}</p>
              <p class="status" v-if="friend.status != 0">
                {{ mapStatus(friend.status) }}
              </p>
              <div v-if="friend.status == 0" class="options">
                <el-button
                  type="primary"
                  circle
                  size="mini"
                  icon="el-icon-check"
                  @click="sendFriendRequest(friend.id)"
                ></el-button>
                <el-button
                  type="danger"
                  circle
                  size="mini"
                  icon="el-icon-close"
                  @click="sendFriendRequest(friend.id)"
                ></el-button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="friend-list">
          <div
            class="friend"
            v-for="friend in myFriendRequests"
            :key="friend.id"
          >
            <div class="avatar">
              <img :src="friend.photo" />
            </div>
            <div class="detail">
              <p class="name">{{ friend.name }}</p>
              <p class="status" v-if="friend.status != 0">
                {{ mapStatus(friend.status) }}
              </p>
              <div v-if="friend.status == 0" class="options">
                <span class="tobeverified">待验证</span>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div v-if="toMe" class="friend-list">
          <div
            class="friend"
            v-for="friend in groupRequests"
            :key="friend.groupEnterRequest.id"
          >
            <div class="avatar">
              <img :src="friend.applyUser.photo" />
            </div>
            <div class="detail">
              <div class="description">
                <span class="name">{{ friend.applyUser.name }}</span>
                <span class="join"> 申请加入 </span>
                <span>{{ friend.fzuGroup.groupName }}</span>
              </div>
              <p class="status" v-if="friend.groupEnterRequest.status != 0">
                {{ mapStatus(friend.groupEnterRequest.status) }}
              </p>
              <div v-if="friend.groupEnterRequest.status == 0" class="options">
                <button>通过</button>
                <button>拒绝</button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="friend-list">
          <div
            class="friend"
            v-for="friend in myGroupRequests"
            :key="friend.groupEnterRequest.id"
          >
            <div class="avatar">
              <img :src="friend.groupInfo.photo" />
            </div>
            <div class="detail">
              <p class="name">{{ friend.groupInfo.groupName }}</p>
              <p class="status" v-if="friend.groupEnterRequest.status != 0">
                {{ mapStatus(friend.groupEnterRequest.status) }}
              </p>
              <div v-if="friend.groupEnterRequest.status == 0" class="options">
                <span class="tobeverified">待验证</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { formatTime } from "@/util";
import moment from "moment";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "SingleChat",
  data() {
    return {
      header: "好友申请",
      holder: "搜索好友",
      isFriend: true,
      toMe: true,
      searchInput: "",
      friends: [],
      friendRequests: [],
      myFriendRequests: [],
      groups: [],
      groupRequests: [],
      myGroupRequests: [],
    };
  },
  created() {
    this.updateAll();
  },
  methods: {
    // handle button click
    sendFriendRequest(friendId) {
      console.log("发送好友请求", friendId);
      var param = {
        sendTime: moment().format("yyyy-MM-DD HH:mm:SS"),
        userFrom: this.user.id,
        userTo: friendId,
      };
      console.log(param);
      this.$http
        .sendFriendRequest(param)
        .then(() => {
          // 更新一下
          this.getGroupRequestsFromMe();
        })
        .catch((error) => console.log(error));
    },
    sendGroupRequest(groupId) {
      console.log("发送群组请求", groupId);
      // this.$http.
    },
    // qq的好友和群也是分开的，微信压根就只有好友请求
    getFriendRequestsToMe() {
      this.$http
        .getFriendRequestsToMe()
        .then((res) => {
          // console.log(res.data.requestList);
          res.data.requestList.sort((a, b) => {
            if (a.status == 0) return -1;
            else if (b.status == 0) return 1;
            else return 0;
          });
          this.friendRequests = res.data.requestList;
        })
        .catch((error) => console.log(error));
    },
    getFriendRequestsFromMe() {
      this.$http
        .getFriendRequestsFromMe()
        .then((res) => {
          // console.log(res.data.selfRequestList);
          this.myFriendRequests = res.data.selfRequestList;
        })
        .catch((error) => console.log(error));
    },
    getGroupRequestsToMe() {
      this.$http
        .getGroupRequestsToMe()
        .then((res) => {
          // console.log(res.data);
          res.data.RequestList.sort((a, b) => {
            if (a.groupEnterRequest.status == 0) return -1;
            else if (b.groupEnterRequest.status == 0) return 1;
            else return 0;
          });
          this.groupRequests = res.data.RequestList;
        })
        .catch((error) => console.log(error));
    },
    getGroupRequestsFromMe() {
      this.$http
        .getGroupRequestsFromMe()
        .then((res) => {
          console.log(res.data);
          this.myGroupRequests = res.data.myRequestList;
        })
        .catch((error) => console.log(error));
    },
    searchUsers() {
      // console.log("searchUsers");
      if (this.searchInput == "") return;
      this.$http
        .searchUsers(this.searchInput)
        .then((res) => {
          console.log(res.data);
          if (res.data.user_list) {
            this.friends = res.data.user_list;
          } else {
            this.friends = [];
          }
        })
        .catch((error) => console.log(error));
    },
    searchGroups() {
      console.log("searchGroups");
      if (this.searchInput == "") return;
      this.$http
        .searchGroups(this.searchInput)
        .then((res) => {
          console.log(res.data);
          if (res.data.groups) {
            this.groups = res.data.groups;
          } else {
            this.groups = [];
          }
        })
        .catch((error) => console.log(error));
    },
    switchFriend() {
      this.holder = "搜索好友";
      this.header = "好友申请";
      this.isFriend = true;
    },
    switchGroup() {
      this.holder = "搜索群组";
      this.header = "群组申请";
      this.isFriend = false;
    },
    switchTo() {
      // console.log("我收到的");
      this.toMe = true;
    },
    switchFrom() {
      // console.log("我发出的");
      this.toMe = false;
    },
    timeFormatter(time) {
      return formatTime(time);
    },
    mapStatus(status) {
      switch (status) {
        case 1:
          return "已通过";
        case 2:
          return "已拒绝";
        case 0:
          return "待验证";
        default:
          return "出错了";
      }
    },
    updateAll() {
      this.getFriendRequestsToMe();
      this.getFriendRequestsFromMe();
      this.getGroupRequestsToMe();
      this.getGroupRequestsFromMe();
    },
  },

  computed: {
    ...mapState({
      user: (state) => state.user.userInfo,
    }),
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  overflow: hidden;

  .list {
    height: 100%;
    width: 270px;
    border: solid 2px red;

    display: flex;
    flex-direction: column;

    .search {
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(241, 237, 237, 0.4);
      border-radius: 24px;
      margin: 10px;
      padding: 0 30px;
      input {
        width: 100%;
        height: 45px;
        border: none;
        background: none;
        color: #181c2f;
        font-size: 14px;
        display: block;
        &::placeholder {
          color: rgba(24, 28, 47, 0.3);
        }
      }
    }

    .search-switch {
      width: 100%;
      height: 20px;
      display: flex;
      justify-content: center;
      gap: 45px;
      margin-bottom: 10px;
      span {
        cursor: pointer;
        font-size: 14px;
        color: gray;
      }
    }

    .friend-list {
      width: 100%;
      flex: 1;
      /* height: calc(100% - 45px); */
      overflow-y: auto;
      .friend {
        width: 100%;
        height: 65px;
        border-top: solid 1px lightgray;
        display: flex;
        align-items: center;

        .avatar {
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin: 15px;
          }
        }
        .detail {
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding-right: 15px;
          .name {
            line-height: 100%;
          }
          .lastMessage {
            color: gray;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .status {
            color: gray;
            font-size: 14px;
            line-height: 100%;
          }
          .options {
          }
        }
      }
    }
  }
  .showcase {
    height: 100%;
    flex: 1;
    border: solid 2px red;

    display: flex;
    flex-direction: column;

    .header {
      border: solid 2px black;
      /* background-color: #f5f7f9; */
      background-color: lightblue;
      display: flex;
      font-size: 15px;
      color: gray;

      align-items: center;
      justify-content: center;
      height: 65px;
    }

    .search-switch {
      width: 100%;
      height: 20px;
      display: flex;
      justify-content: center;
      gap: 70px;
      margin: 5px auto;
      span {
        cursor: pointer;
        font-size: 14px;
        color: gray;
      }
    }

    .friend-list {
      width: 100%;
      flex: 1;
      /* height: calc(100% - 45px); */
      overflow-y: auto;
      .friend {
        width: 100%;
        height: 65px;
        border-top: solid 1px lightgray;
        display: flex;
        align-items: center;

        .avatar {
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin: 15px;
          }
        }
        .detail {
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding-right: 15px;
          .description {
            span {
              line-height: 100%;
            }
            .join {
              color: gray;
              font-size: 14px;
            }
          }
          .lastMessage {
            color: gray;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .status {
            color: gray;
            font-size: 14px;
            line-height: 100%;
          }
          .options {
            .tobeverified {
              color: gray;
              font-size: 14px;
              line-height: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
