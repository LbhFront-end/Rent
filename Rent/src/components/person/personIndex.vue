<template>
  <div class="main">
      <!-- 个人中心首页 -->
      <div class="personIndex flex-x-center flex-y-center flex-col">
          <!-- 个人昵称与头像 -->
          <div class="personNameHeadImg flex-space-between flex-y-center flex-row">
              <div class="personName flex-left flex-y-center flex-col">
                  <p>{{userName||userLoginName}}</p>
                  <p>查看并编辑个人资料</p>
              </div>
              <div class="headImg flex-x-center flex-y-center flex-row">
                  <input type="file" accept="image/*;" capture="camera" @change="getImg($event)" >
                  <img :src="userAvatarSrc||ImgUrl" alt="">
              </div>
          </div>
          <!-- 缴费记录 -->
          <div class="paymentRecord flex-x-center flex-y-center flex-row">
              <router-link :to="{path:'/paymentRecord'}" class="flex-space-between flex-y-center flex-row">
                  <p>缴费记录</p>
                  <div class="person-right"></div>
              </router-link>
          </div>
          <!-- 保洁订单 -->
          <div class="cleanList flex-x-center flex-y-center flex-row">
              <router-link :to="{path:'/cleanList'}" class="flex-space-between flex-y-center flex-row">
                  <p>服务订单</p>
                  <div class="person-cleanList"></div>
              </router-link>
          </div>
          <!-- 我的消息 -->
          <div class="myMessage flex-x-center flex-y-center flex-row">
              <router-link :to="{path:'/myMessage'}" class="flex-space-between flex-y-center flex-row">
                  <p>我的消息</p>
                  <div class="person-message"></div>
              </router-link>
          </div>
          <!-- 实名认证 -->
          <div class="personCertification flex-x-center flex-y-center flex-row">
              <router-link :to="{path:'/certification'}" class="flex-space-between flex-y-center flex-row">
                  <p>实名认证</p>
                  <div class="person-certification"></div>
              </router-link>
          </div>
          <!-- 设置 -->
          <div class="setting flex-x-center flex-y-center flex-row">
              <router-link :to="{path:'/setting'}" class="flex-space-between flex-y-center flex-row">
                  <p>设置</p>
                  <div class="person-setting"></div>
              </router-link>
          </div>
      </div>
      <my-footer/>
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
  name: "personIndex",
  data() {
    return {
      //头像
      ImgUrl: "../../../static/img/person-head.png",
      userLoginName: "",
      userName: "",
      userAvatarSrc: "",
      userId: ""
    };
  },
  created() {
    self = this;
    var storage = window.localStorage;
    self.userLoginName = storage.getItem("userLoginName");
    self.userName = storage.getItem("userName");
    self.userId = storage.getItem("userId");
    self.userAvatarSrc = storage.getItem("userAvatarSrc");
  },
  methods: {
    //获取头像
    getImg(e) {
      var file = e.target.files[0];
      var r = new FileReader();
      r.onload = function(e) {
        self.ImgUrl = e.target.result;
        self
          .$axios({
            url: "/pms/api_user/upload_imghead",
            method: "post",
            data: {
              userId: self.userId,
              base64: self.ImgUrl
            },
            transformRequest: [
              function(data) {
                let ret = "";
                for (let it in data) {
                  ret +=
                    encodeURIComponent(it) +
                    "=" +
                    encodeURIComponent(data[it]) +
                    "&";
                }
                return ret;
              }
            ]
          })
          .then(function(response) {
            Toast({
              className: "successMessage",
              message: "上传成功",
              iconClass: "icon icon-success",
              duration: 2000
            });
          })
          .catch(function(error) {
            Toast({
              className: error,
              message: "上传失败",
              position: "top",
              duration: 2000
            });
            alert(error);
            console.log(error);
          });
      };
      r.readAsDataURL(file);
    }
  }
};
</script>