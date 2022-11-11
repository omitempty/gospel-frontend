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
            <img :src="friend.avatar" />
          </div>
          <div class="lastMessage">
            <span>{{ friend.address }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="showcase">
      <Empty v-if="!currentFriend"></Empty>
      <div v-else>
        <div class="header">
          <p>{{ currentFriend.username }}</p>
        </div>
        <div class="chatarea">
          <div class="message"></div>
          <div class="input"></div>
          <button @click="handleClick">点我</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Empty from "./Empty.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "",
  data() {
    return {
      currentFriend: null,
      messages: null,
    };
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
      this.currentFriend = { ...friend };

      console.log(this.currentFriend);
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.user.userInfo,
      friends: (state) => state.friends.list,
      messages: (state) => state.messages.singleMessages,
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
        .lastMessage {
          span {
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

    .header {
      border: solid 2px black;
      height: 65px;
      background-color: #f5f7f9;
      color: gray;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
