<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <!-- <img src="../assets/zhicheng.svg" alt="gospel" /> -->
    <!-- <img src="../assets/fzu.png" style="width: 200px" alt="gospel" /> -->
    <img src="../assets/fzu-detail.jpg" style="width: 400px" alt="gospel" />
    <!-- <img
      src="http://localhost:8081/fzu-detail.jpg"
      style="width: 400px"
      alt="gospel"
    /> -->
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
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
  border-left: solid 1px lightgray;
  background-color: white;
  flex: 1;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
