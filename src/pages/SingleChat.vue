<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <div class="list">
      <!-- 搜索，先做个样式 -->
      <div class="search">
        <input type="text" placeholder="搜索好友" />
      </div>
      <div class="friend-list">
        <div class="friend" v-for="friend in friends" :key="friend.id">
          {{ friend.username }}
        </div>
      </div>
    </div>
    <div class="showcase"></div>
    <button @click="handleClick">点我</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "",
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
  },
  computed: {
    ...mapState({
      user: (state) => state.user.userInfo,
      friends: (state) => state.friends.list,
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
        border: dashed 1px black;
      }
    }
  }
  .showcase {
    height: 100%;
    flex: 1;
    border: solid 2px red;
  }
}
</style>
