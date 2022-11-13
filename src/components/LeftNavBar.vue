<template>
  <div class="bodyOfManage">
    <div class="leftNavbar" :style="{ width: withOfIconType }">
      <!--            头像区-->
      <div class="profileArea">
        <el-tooltip
          class="item"
          effect="dark"
          content="个人中心"
          placement="bottom"
        >
          <img
            v-if="user.adurl"
            :src="user.adurl"
            @click="personalCenterApper"
          />
          <img
            v-if="!user.adurl"
            src="../assets/logo.png"
            @click="personalCenterApper"
          />
        </el-tooltip>
      </div>
      <!--  导航栏区-->
      <div class="barArea">
        <transition
          name="animate__animated animate__bounce"
          enter-active-class="animate__fadeInUp"
          leave-active-class="animate__zoomOut"
          appear
        >
          <!-- 图标导航栏-->
          <div style="width: 100%">
            <el-tooltip
              class="item"
              effect="dark"
              content="联系人"
              placement="right"
            >
              <router-link
                style="font-size: 20px"
                :to="{ path: 'singlechat' }"
                active-class="active2"
              >
                <li class="el-icon-chat-dot-round"></li>
              </router-link>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="群聊"
              placement="right"
            >
              <router-link
                style="font-size: 20px"
                :to="{ name: 'Home' }"
                active-class="active2"
              >
                <li class="el-icon-user"></li>
              </router-link>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="查找"
              placement="right"
            >
              <router-link
                style="font-size: 20px"
                to="#"
                active-class="active2"
              >
                <li class="el-icon-zoom-in"></li>
              </router-link>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="双选"
              placement="right"
            >
              <router-link
                style="font-size: 20px"
                to="#"
                active-class="active2"
              >
                <li class="el-icon-message"></li>
              </router-link>
            </el-tooltip>
          </div>
        </transition>
      </div>

      <!--           转换格式按钮-->
      <div class="changeArea">
        <el-tooltip class="item" effect="dark" content="登出" placement="right">
          <li class="el-icon-switch-button" @click="logout"></li>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
// import "animate.css";
export default {
  name: "LeftNavBar",
  data() {
    return {
      withOfIconType: "100px",
      flagOfShow: true,
      flagOfPersonalCenter: true,
      user: {},
    };
  },
  methods: {
    personalCenterApper() {
      console.log("hold on");
    },
    logout() {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      this.$router.push({ path: "/login" });
    },
  },

  mounted() {},
  beforeDestroy() {},
};
</script>

<style scoped>
.active {
  background-color: rgba(37, 123, 94, 0.2);
  color: #257b5e;
}

.active2 {
  color: #257b5e;
}

a {
  position: relative;
  text-decoration: none;
  display: block;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: #3c3f41;
}

a::before {
  display: block;
  content: "";
  width: 3px;
  height: 50px;
  position: absolute;
  border-radius: 10px;
}

a:hover::before {
  background-color: #69717a;
}

.bodyOfManage {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.leftNavbar {
  transition: 0.5s linear;
  overflow: hidden;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  height: 650px;
  width: 100px;
  background-color: #f5f7f9;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profileArea {
  width: 100%;
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profileArea:hover img {
  cursor: pointer;
}

.barArea {
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 7;
  font-weight: bold;
  position: relative;
}

.profileArea img {
  border-radius: 10px;
  width: 50px;
  height: 50px;
}

.changeArea {
  flex: 2;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.changeArea li {
  font-size: 18px;
}

.changeArea li:hover {
  color: #257b5e;
  cursor: pointer;
}
</style>
