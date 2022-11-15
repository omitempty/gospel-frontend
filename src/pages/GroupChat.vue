<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <div class="list">
      <!-- 搜索，先做个样式 -->
      <div class="search">
        <input type="text" placeholder="搜索群组" />
      </div>
      <div class="friend-list">
        <div
          class="friend"
          v-for="friend in groups"
          :key="friend.fzuGroup.id"
          @click="setChat(friend.fzuGroup)"
        >
          <div class="avatar">
            <img :src="friend.fzuGroup.photo" />
          </div>
          <div class="detail">
            <p class="name">{{ friend.fzuGroup.groupName }}</p>
            <div class="lastMessage">
              <p class="content">
                {{ friend.groupMessageVo ? friend.groupMessageVo.message : "" }}
              </p>
              <p class="time">
                {{
                  friend.groupMessageVo
                    ? timeFormatter(friend.groupMessageVo.sendTime)
                    : ""
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="showcase">
      <Empty v-if="!currentGroup"></Empty>
      <template v-else>
        <div class="header">
          <p>{{ currentGroup.groupName }}</p>
        </div>
        <div class="members">
          <div class="member" v-for="member in members" :key="member.id">
            <div class="avatar">
              <img :src="member.photo" />
            </div>
            <div class="member-info">
              <p class="name">{{ member.name }}</p>
              <p class="role" v-if="member.member_type == 'admin'">群主</p>
            </div>
          </div>
        </div>
        <!-- <div class="chatarea"> -->
        <div id="msgbox" class="messages">
          <div
            class="message"
            v-for="message in messages"
            :class="message.userFrom == user?.id ? 'my-message' : ''"
            :key="message.id"
          >
            <div class="avatar">
              <img :src="message.senderPhoto" />
            </div>
            <div class="detail">
              <p class="content">{{ message.message }}</p>
            </div>
            <p class="time">{{ timeFormatter(message.sendTime) }}</p>
          </div>
        </div>
        <!-- </div> -->
        <div class="input">
          <input
            @keyup.enter="sendMessage"
            type="text"
            v-model="message"
            placeholder="请输入消息..."
          />
          <el-button
            type="primary"
            circle
            size="large"
            icon="el-icon-s-promotion"
            @click="sendMessage"
          ></el-button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Empty from "./Empty.vue";
import { formatTime } from "@/util";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "GroupChat",
  data() {
    return {
      message: "",
      members: [],
    };
  },
  created() {
    this.$store.dispatch("getGroups");
  },
  methods: {
    timeFormatter(time) {
      return formatTime(time);
    },
    sendMessage() {
      //   console.log(this.message);
      // test
      this.$socket.emit(
        "Group_Message",
        JSON.stringify({
          id: "",
          userFrom: this.user.id,
          groupId: this.currentGroup.id,
          senderNickname: this.user.name,
          senderPhoto: this.user.photo,
          sendTime: new Date(),
          fileRawName: "",
          messageType: "text",
          message: this.message,
          isRead: "0",
        })
      );

      this.message = "";

      this.$store.dispatch("getGroupMessages", {
        groupId: this.currentGroup.id,
        myselfId: this.user.id,
      });

      // 记得把列表也更新了
      this.$store.dispatch("getGroups");
    },
    // 其实是setGroup, 工期太赶，懒得改了
    setChat(group) {
      //   console.log(group);
      this.$http
        .getGroupMembers({ groupId: group.id })
        .then((res) => {
          res.data.AllMembers.sort((a, b) => {
            if (a.member_type == "admin") return -1;
            else if (b.member_type == "admin") return 1;
            else return a.id - b.id;
          });
          this.members = res.data.AllMembers;
          //   console.log(this.members);
        })
        .catch((error) => console.log(error));
      //   console.log(group);
      this.$store.dispatch("setCurrentGroup", group);

      this.$store.dispatch("getGroupMessages", {
        groupId: group.id,
        myselfId: this.user.id,
      });
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.user.userInfo,
      groups: (state) => state.groups.list,
      messages: (state) => state.groupMessages.list,
      // 这里写错会直接造成组件渲染失败，但是没有任何报错信息
      currentGroup: (state) => state.groupMessages.currentGroup,
    }),
  },
  sockets: {
    Group_Message: function () {
      this.$store.dispatch("getGroups");
      if (this.currentGroup) {
        this.$store.dispatch("getGroupMessages", {
          groupId: this.currentGroup.id,
          myselfId: this.user.id,
        });
      }
    },
  },
  components: { Empty },
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

    .friend-list {
      width: 100%;
      flex: 1;
      /* height: calc(100% - 45px); */
      overflow-y: auto;
      .friend {
        width: 100%;
        height: 80px;
        border-top: solid 1px lightgray;
        display: flex;
        align-items: center;

        .avatar {
          img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            margin: 15px;
          }
        }
        .detail {
          width: 100%;
          .name {
            margin-bottom: 5px;
          }

          .lastMessage {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .content {
              width: 100px;
              color: gray;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              line-height: 100%;
            }
            .time {
              align-self: center;
              font-size: 12px;
              color: gray;
              line-height: 100%;
              padding-right: 12px;
            }
          }
        }
      }
    }
  }
  .showcase {
    position: relative;
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
      font-size: 19px;
      font-weight: 550;

      align-items: center;
      justify-content: center;
      height: 65px;
    }

    .members {
      border: 2px dashed black;
      width: 20%;
      height: calc(100% - 185px);
      position: absolute;
      top: 65px;
      right: 0;
      z-index: 100;
      overflow-y: auto;
      .member {
        display: flex;
        align-items: center;
        .avatar {
          img {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            margin: 5px;
          }
        }
        .member-info {
          display: flex;
          .name {
            padding-left: 2px;
            font-size: 10px;
          }
          .role {
            font-size: 8px;
            padding-left: 2px;
            color: gray;
          }
        }
      }
    }

    .messages {
      flex: 1;
      width: 80%;
      border: solid 2px blue;
      overflow-y: auto;

      .message {
        width: 100%;
        display: flex;
        align-items: center;
        .avatar {
          img {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            margin: 15px;
          }
        }

        .detail {
          border-radius: 5px;
          background-color: white;
          box-shadow: 1px 1px 1px 1px lightgray;
          padding: 5px 10px;
        }

        .time {
          font-size: 10px;
          padding: 10px;
          color: gray;
        }
      }
      .my-message {
        flex-direction: row-reverse;
        .detail {
          border-radius: 5px;
          background-color: skyblue;
          box-shadow: 1px 1px 1px 1px lightgray;
          padding: 5px 10px;
        }
      }
    }

    .input {
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(241, 237, 237, 0.4);
      border-radius: 24px;
      margin: 10px;
      padding: 0 30px;
      input {
        width: 100%;
        height: 100px;
        border: none;
        background: none;
        color: #181c2f;
        font-size: 16px;
        display: block;
        &::placeholder {
          color: rgba(24, 28, 47, 0.3);
        }
      }
    }
  }
}
</style>
