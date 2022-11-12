<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="loginContainer">
    <div class="formContainer">
      <el-form>
        <el-form-item label="Username">
          <el-input v-model="user.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Confirm">
          <el-input
            v-model="user.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import "animate.css";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      // 这里只是接收一下表单数据
      user: {
        username: "",
        password: "",
      },
    };
  },
  created() {},
  methods: {
    //用户登录
    login() {
      this.$http
        .login(this.user)
        .then((res) => {
          console.log(res.data);
          this.$store.dispatch("login", res.data.userInfo);
          localStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));
          localStorage.setItem("token", res.data.token);
          this.$router.push({ path: "/home" });
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.loginContainer {
  background-color: rgba(60, 147, 173, 0.2);
  height: 100%;
  .formContainer {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background-color: rgba(170, 205, 219, 0.4);
    padding: 80px 90px 70px 70px;
    border-radius: 20px;
  }
}
</style>
