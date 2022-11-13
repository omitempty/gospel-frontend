<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <div class="list">
      <!-- 搜索，先做个样式 -->
      <div class="search">
        <input type="text" v-model="searchInput" placeholder="搜索好友" />
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
          </div>
        </div>
      </div>
    </div>
    <div class="showcase"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { formatTime } from "@/util";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "SingleChat",
  data() {
    return {
      searchInput: "",
      friends: [],
      requests: [],
    };
  },
  created() {
    this.$http
      .getRequests()
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  },
  methods: {
    timeFormatter(time) {
      return formatTime(time);
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
      /* background-color: #f5f7f9; */
      background-color: lightblue;
      display: flex;
      font-size: 19px;
      font-weight: 550;

      align-items: center;
      justify-content: center;
      height: 65px;
    }

    .messages {
      flex: 1;
      width: 100%;
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
