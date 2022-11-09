<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <div class="list"></div>
    <div class="showcase"></div>
  </div>
</template>

<script>
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

  .list {
    height: 100%;
    width: 250px;
    border: solid 2px red;
  }
  .showcase {
    height: 100%;
    flex: 1;
    border: solid 2px red;
  }
}
</style>
