<template>
  <div class="main flex-x-center flex-y-center flex-col">
      <div class="forgetPassword flex-x-left flex-y-center flex-col">
          <div class="title flex-x-center flex-y-center flex-col">
              <p>忘记密码？</p>
          </div>
          <!-- 手机号 -->
          <div class="telephone flex-x-center flex-y-center flex-col">
              <div class="smallhead">
                  <p>手机号</p>
              </div>
              <div class="content flex-space-between flex-y-center flex-row">
                  <div class="content-main flex-x-center flex-y-center flex-row">
                    <p class="flex-x-center flex-y-center flex-row">
                        <span class="flex-x-center flex-y-center flex-row">+86</span>
                    </p>
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
                      <div class="tip-img flex-x-center flex-y-center flex-row" v-else>
                          
                      </div>
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
let self;
export default {
  name: "forgetPassword",
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
      codeText: "获取"
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
      if (self.clickCode) {
        var second = 59;
        self.clickCode = false;
        self.$axios
          .post("/pms/api_login/r_sent_message?mobile=" + self.phoneNumber, {})
          .then(function(response) {
            var data = response.data;
            var code = data.filter(function(item) {
              self.checkCode = item.verifyMessage;
              // console.log(self.checkCode);
              return item.verifyMessage;
            });
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
      var test = "1234";
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
    //跳转到重置密码
    checkReady() {
      if (!self.codeState && !self.phoneNumberState) {
        self.$router.push("/resetPassword");
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
