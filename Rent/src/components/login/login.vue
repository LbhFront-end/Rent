<template>
  <div class="main flex-x-center flex-y-center flex-col">
      <div class="login flex-x-left flex-y-center flex-col">
          <div class="title flex-x-center flex-y-center flex-col">
              <p>密码登录</p>
          </div>
          <!-- 忘记密码 -->
          <router-link :to="{path:'/forgetPassword'}" class="forgetpassword flex-x-center flex-y-center flex-col">
            <p>忘记密码</p>
          </router-link>
          <!-- 手机号码 -->
          <div class="telephone flex-x-center flex-y-center flex-col">
              <div class="smallhead">
                  <p>手机号</p>
              </div>
              <div class="content flex-space-between flex-y-center flex-row">
                  <div class="content-main flex-x-center flex-y-center flex-row">
                      <p class="flex-x-center flex-y-center flex-row">
                          <span class="flex-x-center flex-y-center flex-row">+86</span>
                      </p>
                    <input type="number" class="phone" v-model="phoneNumber" placeholder="请输入您的手机号码" @blur="phone()" @click="focus()">
                  </div>
                  <div class="content-tip flex-x-center flex-y-center flex-row">
                      <div class="tip-text flex-x-center flex-y-center flex-row" v-if="phoneNumberState">
                          <p>{{phoneNumberErrorText}}</p>
                      </div>
                      <div class="tip-img flex-x-center flex-y-center flex-row" v-else>
                          
                      </div>
                  </div>
              </div>
          </div>
          <!-- 密码 -->
          <div class="password flex-x-center flex-y-center flex-col">
              <div class="smallhead">
                  <p>密码</p>
              </div>
              <div class="content flex-space-between flex-y-center flex-row">
                  <div class="content-main flex-x-center flex-y-center flex-row">
                    <input type="password" class="phonepassword" v-model="phonepassword" placeholder="请输入您的密码" @blur="phonePassword()" id="phonepassword">
                  </div>
                  <div class="content-tip flex-x-center flex-y-center flex-row">
                      <div class="tip-text flex-x-center flex-y-center flex-row" v-if="passwordState">
                          <p>{{passwordErrorText}}</p>
                      </div>
                      <div class="tip-img flex-x-center flex-y-center flex-row" v-else>
                          
                      </div>
                  </div>
              </div>
          </div>
          <!-- 下一步 -->
          <div class="next flex-right flex-y-center flex-col">
            <div class="a flex-x-center flex-y-center flex-col" @click="checkReady()">
              <div class="index-enter"></div>
            </div>
          </div>
      </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import { Indicator } from 'mint-ui';
import store from "@/vuex/store";
let self;
export default {
  name: "login",
  data() {
    return {
      // 手机号
      phoneNumber: "",
      phoneNumberErrorText: "",
      phoneNumberState: true,
      //密码
      phonepassword: "",
      passwordState: true,
      passwordErrorText: "",
      //个人数据
      personalData: [],
      userData: [],
      //地址
      userAvatarSrc:""
    };
  },
  store,
  created() {
    self = this;
  },
  methods: {
    //   手机校验
    phone() {
      self.phoneNumberState = true;
      var phoneReg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
      if (!self.phoneNumber) {
        self.phoneNumberErrorText = "手机号码不可为空";
        return;
      } else if (self.phoneNumber.length !== 11) {
        self.phoneNumberErrorText = "请输入11位手机号";
        return;
      } else if (!phoneReg.test(self.phoneNumber)) {
        self.phoneNumberErrorText = "请正确格式的手机号";
        return;
      } else {
        self.phoneNumberState = false;
        return;
      }
    },
    // 密码校验
    phonePassword() {
      self.passwordState = true;
      if (!self.phonepassword) {
        self.passwordErrorText = "密码不可以为空";
        return;
      } else {
        self.passwordState = false;
      }
    },
    focus(){
      let self = this
      setTimeout(function () { 
        let pannel = document.getElementById("phonepassword");
        pannel.scrollIntoView(false);
       },2000);
    },
    //跳转到登录后的首页
    checkReady() {      
      //是否为空
      if (!self.passwordState && !self.phoneNumberState) {
        Indicator.open('登录中...');
        //登录后获取数据
        self.$axios
          .post(
            "/pms/api_login/login_bymobile?mobile=" +
              self.phoneNumber +
              "&password=" +
              self.phonepassword,
            {}
          )
          .then(function(response) {
            Indicator.close();
            // console.log(response);
            self.personalData = response.data[0].data.role;
            self.userData = response.data[0].data.user;
            self.userAvatarSrc = response.data[0].data.userAvatarSrc;
            //Vuex全局存入数据
            self.$store.commit("saveUserId", self.userData.id);
            self.$store.commit("savePhone", self.userData.mobile);
            //localStorage全局存入数据
            var storage = window.localStorage;
            storage.setItem("userId", self.userData.id);
            storage.setItem("userRole", self.personalData.name);
            storage.setItem("userPhone", self.userData.mobile);
            // console.log(self.userData.personId);
            storage.setItem("userPersonId", self.userData.personId);
            storage.setItem("userLoginName", self.userData.loginName);
            storage.setItem("userName", self.userData.name);
            storage.setItem("userAvatarSrc", self.userAvatarSrc);
            if (self.personalData.name == "一般用户") {
              self.$router.push("/afterLoginIndex");
            }else{
              self.$router.push("/maintenanceIndex");
            }
            Toast({
              className: "successMessage",
              message: "登录成功",
              iconClass: "icon icon-success",
              duration: 2000
            });
          })
          .catch(function(error) {
            Toast({
              className: "toast",
              message: "密码或者账号错误，请重新检查输入",
              position: "top",
              duration: 2000
            });
          });
      } else {
        Toast({
          className: "toast",
          message: "请检查您的信息是否缺漏或者有误！",
          position: "top",
          duration: 2000
        });
      }
    }
  }
};
</script>
