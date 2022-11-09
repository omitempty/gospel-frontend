<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <p>Gospel</p>
  </div>
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
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
