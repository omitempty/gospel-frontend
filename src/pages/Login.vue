<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="loginContainer">
    <div class="formContainer">
      <el-form>
        <el-form-item label="Username">
          <el-input v-model="loginUser.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Confirm">
          <el-input
            v-model="loginUser.password"
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
// eslint-disable-next-line no-unused-vars
import axios from "axios";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      //看看用不用转成用户对象
      loginUser: {
        name: "",
        password: "",
      },
    };
  },
  created() {},
  methods: {
    //用户登录
    login() {
      console.log(this.loginUser);
      this.$http
        .login(this.loginUser)
        .then((res) => {
          console.log(res.data);
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
