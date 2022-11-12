<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="bg">
    <div class="main-container">
      <left-nav-bar class="sider"></left-nav-bar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import LeftNavBar from "@/components/LeftNavBar.vue";
export default {
  components: { LeftNavBar },
  // eslint-disable-next-line vue/multi-word-component-names
  name: "",
  data() {
    return {
      loginUser: {
        name: "null",
        password: "null",
      },
    };
  },
  created() {},
  methods: {
    UserLogin() {
      console.log(this.loginUser);
    },
  },
};
</script>

<style lang="scss" scoped>
.bg {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-container {
  height: 80%;
  width: 75%;
  display: flex;
  background: #fdfdfd;

  /* border-top-right-radius: 15px;
  border-bottom-right-radius: 15px; */
  border-radius: 15px;
  overflow: hidden;
  .sider {
    width: 100px;
    height: 100%;
  }
  .content {
    flex: 1;
    height: 100%;
  }
}
</style>
