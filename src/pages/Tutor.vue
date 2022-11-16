<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <div class="list">
      <!-- 搜索，先做个样式 -->
      <div class="search">
        <input
          type="text"
          v-model="searchInput"
          :placeholder="user.flag == 1 ? '搜索学生' : '搜索导师'"
        />
      </div>
      <div v-if="isTeacher" class="friend-list">
        <div
          class="friend"
          v-for="friend in students"
          :key="friend.id"
          @click="showStudentHomepage(friend)"
        >
          <div class="avatar">
            <img :src="friend.photo" />
          </div>
          <div class="detail">
            <div class="tutor-info">
              <span class="name">{{ friend.name }}</span>
              <span class="major">{{ friend.major }}</span>
            </div>
            <div class="status" v-if="friend.status != 0">
              <el-button
                type="primary"
                circle
                plain
                size="mini"
                icon="el-icon-plus"
                @click.stop="sendFriendRequest(friend.id)"
              ></el-button>
              <span>{{ mapStatus(friend.status) }}</span>
            </div>
            <div v-else class="options">
              <el-button
                type="primary"
                circle
                plain
                size="mini"
                icon="el-icon-plus"
                @click.stop="sendFriendRequest(friend.id)"
              ></el-button>
              <el-button
                type="primary"
                circle
                size="mini"
                icon="el-icon-check"
                @click.stop="passTutorRequest(friend.id)"
              ></el-button>
              <el-button
                type="danger"
                circle
                size="mini"
                icon="el-icon-close"
                @click.stop="rejectTutorRequest(friend.id)"
              ></el-button>
            </div>
          </div>
        </div>
      </div>
      <!-- student page -->
      <div v-else class="friend-list">
        <div
          class="friend"
          v-for="friend in teachers"
          :key="friend.id"
          @click="showTutorHomepage(friend)"
        >
          <div class="avatar">
            <img :src="friend.photo" />
          </div>
          <div class="detail">
            <div class="tutor-info">
              <p class="name">{{ friend.name }}</p>
              <p class="major">{{ friend.major }}</p>
            </div>
            <div class="options">
              <el-button
                type="primary"
                plain
                circle
                size="mini"
                icon="el-icon-plus"
                @click.stop="sendFriendRequest(friend.id)"
              ></el-button>
              <el-button
                type="primary"
                circle
                size="mini"
                icon="el-icon-sort"
                @click.stop="sendTutorRequest(friend.id)"
              ></el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="showcase">
      <div class="header">
        <p>{{ this.header }}</p>
      </div>
      <div v-if="!isTeacher" class="search-switch">
        <span @click="switchMine">我的申请</span>
        <span> | </span>
        <span @click="switchHomepage">导师主页</span>
      </div>
      <template v-if="isTeacher">
        <iframe
          v-if="currentStudent"
          class="homepage-frame"
          :src="currentStudent.profile"
          frameborder="0"
        ></iframe>
      </template>
      <template v-else>
        <!-- 我的申请 -->
        <div v-if="toMe" class="friend-list">
          <div class="friend" v-for="friend in requests" :key="friend.id">
            <div class="avatar">
              <img :src="friend.photo" />
            </div>
            <div class="detail">
              <div class="description">
                <span class="name">{{ friend.name }}</span>
                <span class="time">{{ timeFormatter(friend.send_time) }}</span>
              </div>
              <p class="status">
                {{ mapStatus(friend.status) }}
              </p>
            </div>
          </div>
        </div>
        <!-- <div v-else class="friend-list">

        </div> -->
        <iframe
          v-else
          class="homepage-frame"
          :src="currentTutor.profile"
          frameborder="0"
        ></iframe>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { formatTime } from "@/util";
import moment from "moment";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Tutor",
  data() {
    return {
      isFriend: true,
      toMe: true,
      searchInput: "",
      friends: [],
      friendRequests: [],
      myFriendRequests: [],
      groups: [],
      groupRequests: [],
      myGroupRequests: [],

      students: [],
      teachers: [],
      requests: [],
      applications: [],
      currentTutor: null,
      currentStudent: null,
    };
  },
  created() {
    this.getTeachers();
    this.getRequests();
    this.getApplications();
  },
  methods: {
    showTutorHomepage(tutor) {
      console.log("click tutor");
      this.currentTutor = tutor;
      this.switchHomepage();
    },
    showStudentHomepage(student) {
      console.log("click student");
      this.currentStudent = student;
    },
    // handle button click
    getTeachers() {
      this.$http
        .getTutors()
        .then((res) => {
          //   console.log(res.data);
          this.teachers = res.data.teachers;
        })
        .catch((error) => console.log(error));
    },
    sendFriendRequest(friendId) {
      //   console.log("发送好友请求", friendId);
      var param = {
        sendTime: moment().format("yyyy-MM-DD HH:mm:SS"),
        userFrom: this.user.id,
        userTo: friendId,
      };
      //   console.log(param);
      this.$http
        .sendFriendRequest(param)
        .then(() => {})
        .catch((error) => console.log(error));
    },
    // 发送导师申请
    sendTutorRequest(teacherId) {
      this.$http
        .sendTutorRequest(teacherId)
        .then((res) => {
          console.log(res);
          // update
          this.getRequests();
        })
        .catch((error) => console.log(error));
    },
    // 获取我的导师申请
    getRequests() {
      this.$http
        .getTutorRequestsFromMe()
        .then((res) => {
          //   console.log(res.data);
          this.requests = res.data.requestList;
        })
        .catch((error) => console.log(error));
    },
    // 获取申请我当导师的，我是导师
    getApplications() {
      this.$http
        .getTutorRequestsToMe()
        .then((res) => {
          console.log(res.data);
          this.students = res.data.requestList;
        })
        .catch((error) => console.log(error));
    },
    // 通过导师申请，我是导师
    passTutorRequest(studentId) {
      this.$http
        .passTutorRequest(studentId)
        .then((res) => {
          console.log(res);
          this.getApplications();
        })
        .catch((error) => console.log(error));
    },
    // 拒绝导师申请，我是导师
    rejectTutorRequest(studentId) {
      this.$http
        .rejectTutorRequest(studentId)
        .then((res) => {
          console.log(res);
          this.getApplications();
        })
        .catch((error) => console.log(error));
    },
    switchMine() {
      // console.log("我收到的");
      this.toMe = true;
    },
    switchHomepage() {
      // console.log("我发出的");
      if (this.currentTutor == null) return;
      this.toMe = false;
    },
    timeFormatter(time) {
      return formatTime(time);
    },
    mapStatus(status) {
      switch (status) {
        case 1:
          return "已通过";
        case 2:
          return "已拒绝";
        case 0:
          return "待验证";
        default:
          return "出错了";
      }
    },
  },

  computed: {
    ...mapState({
      user: (state) => state.user.userInfo,
    }),
    isTeacher: function () {
      return this.user.flag == 1;
    },
    header: function () {
      if (!this.isTeacher) {
        return "导师申请";
      } else {
        return "学生详情";
      }
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

  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  overflow: hidden;

  .list {
    height: 100%;
    width: 270px;
    /* border: solid 2px red; */

    display: flex;
    flex-direction: column;

    .search {
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(241, 237, 237, 0.4);
      border-radius: 24px;
      margin: 10px;
      padding: 0 30px;
      input {
        width: 100%;
        height: 45px;
        border: none;
        background: none;
        color: #181c2f;
        font-size: 14px;
        display: block;
        &::placeholder {
          color: rgba(24, 28, 47, 0.3);
        }
      }
    }

    .search-switch {
      width: 100%;
      height: 20px;
      display: flex;
      justify-content: center;
      gap: 45px;
      margin-bottom: 10px;
      span {
        cursor: pointer;
        font-size: 14px;
        color: gray;
      }
    }

    .friend-list {
      width: 100%;
      flex: 1;
      /* height: calc(100% - 45px); */
      overflow-y: auto;
      .friend {
        width: 100%;
        height: 65px;
        border-top: solid 1px lightgray;
        display: flex;
        align-items: center;

        .avatar {
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin: 15px;
          }
        }
        .detail {
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding-right: 15px;
          .tutor-info {
            .name {
              line-height: 100%;
              font-size: 15px;
            }
            .major {
              padding-top: 4px;
              line-height: 100%;
              font-size: 10px;
              color: gray;
            }
          }
          .status {
            color: gray;
            font-size: 14px;
            line-height: 100%;

            span {
              padding-left: 5px;
            }
          }
          .options {
          }
        }
      }
    }
  }
  .showcase {
    height: 100%;
    flex: 1;
    /* border: solid 2px red; */

    display: flex;
    flex-direction: column;

    .header {
      /* border: solid 2px black; */
      /* background-color: #f5f7f9; */
      background-color: lightblue;
      display: flex;
      font-size: 15px;
      color: gray;

      align-items: center;
      justify-content: center;
      height: 65px;
    }
    background-color: #fafafa;
    .search-switch {
      width: 100%;
      height: 20px;
      display: flex;
      justify-content: center;
      gap: 70px;
      margin: 5px auto;
      span {
        cursor: pointer;
        font-size: 14px;
        color: gray;
      }
    }
    .homepage-frame {
      width: 100%;
      height: 100%;
      flex: 1;
    }
    .friend-list {
      width: 100%;
      flex: 1;
      /* height: calc(100% - 45px); */
      overflow-y: auto;

      .friend {
        width: 100%;
        height: 65px;
        border-top: solid 1px lightgray;
        display: flex;
        align-items: center;

        .avatar {
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin: 15px;
          }
        }
        .detail {
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding-right: 15px;
          .description {
            span {
              line-height: 100%;
            }
            .join {
              color: gray;
              font-size: 14px;
            }
            .time {
              line-height: 100%;
              color: gray;
              font-size: 14px;
              padding-left: 10px;
            }
          }
          .lastMessage {
            color: gray;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .status {
            color: gray;
            font-size: 14px;
            line-height: 100%;
          }
          .options {
            .tobeverified {
              color: gray;
              font-size: 14px;
              line-height: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
