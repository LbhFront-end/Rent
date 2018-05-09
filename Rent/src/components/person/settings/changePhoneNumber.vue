<template>
  <div class="main flex-x-center flex-y-center flex-col">
      <div class="changePhoneNumber2 flex-x-left flex-y-center flex-col">
          <div class="title flex-left flex-y-center flex-col">
              <p>修改手机号码</p>
          </div>
          <!-- 原手机号码 -->
          <div class="originPhone flex-left flex-y-center flex-col">
            <p>原手机号码</p>
            <input type="number" v-model="originPhone">
          </div>
          <!-- 修改手机号码 -->
          <div class="changeOriginPhone flex-left flex-y-center flex-col">
            <p>修改手机号码</p>
            <input type="number" v-model="newPhone" placeholder="输入您的新的手机号码">
          </div>
          <!-- 验证码 -->
          <div class="phoneCode flex-left flex-y-center flex-col">            
            <p>手机验证码</p>
            <div class="flex-space-between flex-y-center flex-row oo">
                <input type="number" v-model="phoneCode" placeholder="输入手机验证吗">
                <a @click="getCode()" class="flex-x-center flex-y-center flex-row">
                    {{codeText}}
                </a>                
            </div>            
          </div>
          <!-- 提交-->
          <div class="submit flex-col flex-x-center flex-y-center" @click="checkReady()">
            <p>提交</p>
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
import { Toast } from "mint-ui";
let self;
export default {
  name: "changePhoneNumber",
  data() {
    return {
      // 手机号码
      originPhone: "",
      newPhone: "",
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
    var storage = window.localStorage;
    this.originPhone = storage.getItem("userPhone");
  },
  methods: {
    getCode() {
      if (self.clickCode) {
        var second = 59;
        self.clickCode = false;
        self.$axios
          .post(
            "/pms/api_login/c_m_sendmessage?oldPhone=" + self.originPhone,
            {}
          )
          .then(function(response) {
            self.checkCode = response.data[0].VMessageUtil;
            // console.log(response);
            // console.log(self.checkCode);
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
    //跳转到修改手机号码成功
    checkReady() {
      //手机校验
      var phoneReg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
      if (!self.newPhone) {
        Toast({
          className: "toast",
          message: "新手机号码不可为空",
          position: "top",
          duration: 2000
        });
        return;
      } else if (self.newPhone.length !== 11) {
        Toast({
          className: "toast",
          message: "请输入11位手机号",
          position: "top",
          duration: 2000
        });
        return;
      } else if (!phoneReg.test(self.newPhone)) {
        Toast({
          className: "toast",
          message: "请正确格式的手机号",
          position: "top",
          duration: 2000
        });
        return;
      } else if (self.newPhone == self.originPhone) {
        Toast({
          className: "toast",
          message: "手机号码不可以与原来的相同",
          position: "top",
          duration: 2000
        });
        return;
      } else if (!self.phoneCode) {
        //验证码校验
        Toast({
          className: "toast",
          message: "验证码不为空",
          position: "top",
          duration: 2000
        });
        return;
      } else if (self.phoneCode != self.checkCode) {
        Toast({
          className: "toast",
          message: "验证码不匹配",
          position: "top",
          duration: 2000
        });
        return;
      } else {
        self.$axios
          .post("/pms/api_login/c_mobile?newPhone=" + self.newPhone, {})
          .then(function(response) {
            //清除原来的设置新的
            var storage = window.localStorage;
            storage.removeItem("userPhone");
            storage.setItem("userPhone", self.newPhone);
            self.$router.push("/changePhoneNumberSuccess");
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  }
};
</script>
