<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  components: {},
  beforeCreate() {
    document
      .querySelector("html")
      .setAttribute("style", "height:100%;margin:0;padding:0;");
    document
      .querySelector("body")
      .setAttribute("style", "height:100%;margin:0");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
