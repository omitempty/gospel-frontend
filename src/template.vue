<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <p>login</p>
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

<style lang="scss" scoped></style>
