<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <div class="list">
      <!-- 搜索，先做个样式 -->
      <div class="search">
        <input type="text" placeholder="搜索好友" />
      </div>
      <div class="friend-list">
        <div
          class="friend"
          v-for="friend in friends"
          :key="friend.id"
          @click="setChat(friend)"
        >
          <div class="avatar">
            <img :src="friend.photo" />
          </div>
          <div class="detail">
            <p class="name">{{ friend.name }}</p>
            <p class="lastMessage">你好</p>
          </div>
        </div>
      </div>
    </div>
    <div class="showcase">
      <Empty v-if="!currentFriend"></Empty>
      <template v-else>
        <div class="header">
          <p>{{ currentFriend.name }}</p>
        </div>
        <div class="chatarea">
          <div class="messages">占个位置</div>
          <div class="input">
            <input type="text" placeholder="请输入消息..." />
            <button @click="handleClick">点我</button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Empty from "./Empty.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "SingleChat",
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("getFriends");
  },
  methods: {
    handleClick() {
      console.log(this.user);
      console.log(this.friends);
    },
    setChat(friend) {
      console.log(friend);
      this.$store.dispatch("setCurrentFriend", friend);
      this.$store.dispatch("getSingleMessages", friend.id, this.user.id);
      console.log(this.currentFriend);
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.user.userInfo,
      friends: (state) => state.friends.list,
      messages: (state) => state.singleMessages.list,
      // 这里写错会直接造成组件渲染失败，但是没有任何报错信息
      currentFriend: (state) => state.singleMessages.currentFriend,
    }),
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
          .name {
            margin-bottom: 5px;
          }
          .lastMessage {
            color: gray;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
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
      height: 65px;
      background-color: #f5f7f9;
      color: gray;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .chatarea {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .messages {
        flex: 1;
        border: solid 2px blue;
      }
      .input {
        height: 75px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(241, 237, 237, 0.4);
        border-radius: 24px;
        margin: 10px;
        padding: 0 30px;
        input {
          width: 100%;
          height: 70px;
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
}
</style>
