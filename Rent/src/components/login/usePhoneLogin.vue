<template>
  <div class="main flex-x-center flex-y-center flex-col">
      <div class="register usePhoneLogin flex-x-left flex-y-center flex-col">
          <div class="title flex-x-center flex-y-center flex-col">
              <p>手机号码登录</p>
          </div>
          <!-- 手机号码 -->
          <div class="telephone flex-x-center flex-y-center flex-col">
              <div class="smallhead">
                  <p>手机号码</p>
              </div>
              <div class="content flex-space-between flex-y-center flex-row">
                  <div class="content-main flex-x-center flex-y-center flex-row">
                    <input type="number" class="phone" v-model="phoneNumber" placeholder="请输入您的手机号码" @blur="phone()">
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
          <!-- 验证码 -->
          <div class="code flex-x-center flex-y-center flex-col">
              <div class="smallhead">
                  <p>验证码</p>
              </div>
              <div class="content flex-space-between flex-y-center flex-row">
                  <div class="content-main flex-x-center flex-y-center flex-row">
                    <input type="number" class="phonecode" v-model="phoneCode" placeholder="请输入验证码" @blur="codeCheck()">
                  </div>
                  <div class="content-tip flex-x-center flex-y-center flex-row">
                      <div class="tip-text flex-x-center flex-y-center flex-row" v-if="codeState">
                          <p>{{codeErrorText}}</p>
                          <a @click="getCode()" class="flex-x-center flex-y-center flex-row">
                              {{codeText}}
                          </a>
                      </div>
                      <div class="tip-img flex-x-center flex-y-center flex-row" v-else></div>
                  </div>
              </div>
          </div>
          <!-- 下一步 -->
          <div class="next flex-right flex-y-center flex-col">
            <a class="flex-x-center flex-y-center flex-col" @click="checkReady()">
              <div class="next-enter"/>
            </a>
          </div>
      </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import store from "@/vuex/store";
let self;
export default {
  name: "usePhoneLogin",
  data() {
    return {
      // 手机号码
      phoneNumber: "",
      phoneNumberErrorText: "",
      phoneNumberState: true,
      //   验证码
      clickCode: true,
      phoneCode: "",
      checkCode: "",
      codeState: true,
      codeErrorText: "",
      codeText: "获取",
      personalData:[],
      userData:[]
    };
  },
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
    //   获取验证码
    getCode() {
      if (!self.phoneNumber) {
        self.phoneNumberErrorText = "手机号码不可为空";
        return;
      } else if (self.clickCode) {
        var second = 59;
        self.clickCode = false;
        self.$axios
          .post(
            "/pms/api_login/login_textcode?mobile=" + self.phoneNumber,
            {}
          )
          .then(function(response) {
            self.checkCode = response.data[0].verifyMessage;
          })
          .catch(function(error) {
            console.log(error);
          });
        var interval = setInterval(function() {
          if (second > 0) {
            self.codeText = "请" + second + "s后重试";
            second--;
          } else {
            self.codeText = "请重新获取";
            self.clickCode = true;
            clearInterval(interval);
          }
        }, 1000);
      }
    },
    // 验证码校验
    codeCheck() {
      self.codeState = true;
      if (!self.phoneCode) {
        self.codeErrorText = "验证码不为空";
        return;
      } else if (self.phoneCode != self.checkCode) {
        self.codeErrorText = "验证码不匹配";
        return;
      } else {
        self.codeState = false;
        return;
      }
    },
    //跳转到实名认证
    checkReady() {
      if (!(self.phoneNumberState || self.codeState)) {
        //验证是否为空，发送手机跟验证码到后台
        self.$axios
          .post(
            "/pms/api_login/login_mobilecode?mobile=" + self.phoneNumber,
            {}
          )
          .then(function(response) {
            self.personalData = response.data[0].role;
            self.userData = response.data[0].user;
            //localStorage全局存入数据
            var storage = window.localStorage;
            storage.setItem("userId", self.userData.id);
            storage.setItem("userRole", self.personalData.code);
            storage.setItem("userPhone", self.userData.mobile);
            storage.setItem("userLoginName", self.userData.loginName);
            storage.setItem("userName", self.userData.name);
            self.$router.push("/afterLoginIndex");
          })
          .catch(function(error) {
            console.log(error);
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
