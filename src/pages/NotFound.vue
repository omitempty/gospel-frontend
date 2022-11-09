<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container"><b>404 NOT FOUND</b></div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import axios from "axios";
export default {
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
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  b {
    font-size: 30px;
  }
}
</style>
