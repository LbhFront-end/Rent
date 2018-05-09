<template>
  <div class="main flex-x-center flex-y-center flex-col">
      <div class="resetPassword flex-x-left flex-y-center flex-col">
          <div class="title flex-x-center flex-y-center flex-col">
              <p>重置密码</p>
          </div>
          <!-- 设置密码 -->
          <div class="password flex-x-center flex-y-center flex-col">
              <div class="smallhead">
                  <p>新密码</p>
              </div>
              <div class="content flex-space-between flex-y-center flex-row">
                  <div class="content-main flex-x-center flex-y-center flex-row">
                    <input type="text" class="phonepassword" v-model="phonepassword" placeholder="请输入您的密码" @blur="phonePassword()">
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
          <!-- 确认密码 -->
          <div class="comfirmpassword flex-x-center flex-y-center flex-col">
              <div class="smallhead">
                  <p>再次输入</p>
              </div>
              <div class="content flex-space-between flex-y-center flex-row">
                  <div class="content-main flex-x-center flex-y-center flex-row">
                    <input type="text" class="comfirmpassword" v-model="comfirmpassword" placeholder="请输入您的密码" @blur="comfirmPassword()">
                  </div>
                  <div class="content-tip flex-x-center flex-y-center flex-row">
                      <div class="tip-text flex-x-center flex-y-center flex-row" v-if="comfirmpasswordState">
                          <p>{{comfirmpasswordErrorText}}</p>
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
let self;
import { Toast } from "mint-ui";
export default {
  name: "register",
  data() {
    return {
      //设置密码
      phonepassword: "",
      passwordState: true,
      passwordErrorText: "",
      //确认密码
      comfirmpassword: "",
      comfirmpasswordState: true,
      comfirmpasswordErrorText: ""
    };
  },
  created() {
    self = this;
  },
  methods: {
    // 密码校验
    phonePassword() {
      self.passwordState = true;
      if (!self.phonepassword) {
        self.passwordErrorText = "密码不可以为空";
        return;
      } else if (self.phonepassword.length < 6) {
        self.passwordErrorText = "密码不可少于6位";
        return;
      } else {
        self.passwordState = false;
      }
    },
    // 确认密码
    comfirmPassword() {
      self.comfirmpasswordState = true;
      if (!self.phonepassword) {
        self.comfirmpasswordErrorText = "请先设置密码";
        return;
      } else if (self.phonepassword != self.comfirmpassword) {
        self.comfirmpasswordErrorText = "两次密码不匹配";
        return;
      } else {
        self.comfirmpasswordState = false;
        return;
      }
    },
    //跳转到实名认证
    checkReady() {
      if (!self.passwordState && !self.comfirmpasswordState) {
        self.$axios
          .post("/pms/api_login/r_password?password=" + self.phonepassword, {})
          .then(function(response) {
            self.$router.push("/changePasswordSuccess");
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        Toast({
          className: "toast",
          message: "请检查您的信息是否缺漏或者有误！",
          position: "top",
          duration: 3000
        });
      }
    }
  }
};
</script>
