<template>
  <div class="main">
      <!-- 设置 -->
      <div class="setting flex-x-center flex-y-center flex-col">
          <!-- 标题 -->
          <div class="title flex-left flex-y-center flex-row">
            <p>设定</p>
          </div>
          <!-- 修改手机号码 -->
          <div class="changePhoneNumber flex-x-center flex-y-center flex-row">
              <router-link :to="{path:'/changePhoneNumber'}" class="flex-space-between flex-y-center flex-row">
                  <p>修改手机号码</p>
                  <div class="pointer-right"/>
              </router-link>
          </div>
          <!-- 修改登录密码 -->
          <div class="changeloginPassword flex-x-center flex-y-center flex-row">
              <router-link :to="{path:'/resetPassword'}" class="flex-space-between flex-y-center flex-row">
                  <p>修改登录密码</p>
                  <div class="pointer-right"/>
              </router-link>
          </div>
          <!-- 常见问题 -->
          <div class="commonProblems flex-x-center flex-y-center flex-row">
              <router-link :to="{path:'/commonProblems'}" class="flex-space-between flex-y-center flex-row">
                  <p>常见问题</p>
                  <div class="pointer-right"/>
              </router-link>
          </div>
          <!-- 意见反馈 -->
          <div class="feedback flex-x-center flex-y-center flex-row">
              <router-link :to="{path:'/feedback'}" class="flex-space-between flex-y-center flex-row">
                  <p>意见反馈</p>
                  <div class="pointer-right"/>
              </router-link>
          </div>
          <!-- 关于我们 -->
          <div class="aboutUs flex-x-center flex-y-center flex-row">
              <router-link :to="{path:'/aboutUs'}" class="flex-space-between flex-y-center flex-row">
                  <p>关于我们</p>
                  <div class="pointer-right"/>
              </router-link>
          </div>
          <!-- 客服热线 -->
          <div class="customerServicHotline flex-space-between flex-y-center flex-row">
            <p>客服热线</p>
            <p>400-000-000</p>
          </div>
          <!-- 登出-->
          <div class="logout flex-col flex-x-center flex-y-center" @click="logout">
            <p>登出</p>
          </div>          
      </div>
  </div>
</template>
<style scoped>
.main {
  background: #fff;
}
</style>
<script>
let self;
import { Toast } from "mint-ui";
export default {
  name: "setting",
  data() {
    return {
      //头像
      ImgUrl: "../../../static/img/person-head.png"
    };
  },
  created() {
    self = this;
  },
  methods: {
    logout: function() {
      self.$axios
        .get("/pms/api_login/quit_login", {})
        .then(function(response) {
          //清除localStorage
          var storage = window.localStorage;
          storage.clear();
          Toast({
            className: "successMessage",
            message: "退出成功",
            iconClass: "icon icon-success"
          });
          self.$router.push("/");
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>