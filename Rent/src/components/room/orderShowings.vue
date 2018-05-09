<template>
  <div class="main flex-col flex-x-center flex-y-center">
      <!-- 预约看房 -->
      <div class="orderShowings flex-col flex-x-center flex-y-center">
        <!-- 标题 -->
        <div class="title flex-col flex-left flex-y-center">
            <p>填写您的信息</p>
            <p>房间号：<span>{{roomnum}}</span></p>
        </div>
        <!-- 姓名  -->
        <div class="name flex-col flex-left flex-y-center">
            <p>姓名</p>
            <input type="text" v-model="name" placeholder="请输入您的中文姓名">
        </div>
        <!-- 手机号码  -->
        <div class="phone flex-col flex-left flex-y-center">
            <p>手机号码</p>
            <input type="number" v-model="phone" placeholder="请输入您的手机号码">
        </div>
        <!-- 选择看房时间  -->
        <div class="time flex-col flex-left flex-y-center">
            <p>选择看房时间</p>
            <div class="timeInputs flex-row flex-x-center flex-y-center">
                <input v-model="dateValue1" type="date" placeholder="请选择日期">
            </div>
        </div>
        <!-- 确认预约 -->
        <div class="ConfireOrder flex-col flex-x-center flex-y-center" @click="checkReady">
        <p>确认预约</p>
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
  name: "orderShowings",
  data() {
    return {
      name: "",
      phone: "",
      dateValue1: "1999-01-01",
      roomId: "",
      roomnum: "",
      userId:""
    };
  },
  created() {
    self = this;
    var storage = window.localStorage;
    var userId = storage.getItem("userId");
    var phone = storage.getItem("userPhone");
    //获取当前时间
    var da = new Date();
    var year = da.getFullYear();
    var month = da.getMonth() + 1;
    var date = da.getDate();
    var hour = da.getHours();
    var minute = da.getMinutes();
    if (date < 10) {
      date = "0" + date;
    }
    if (month < 10) {
      month = "0" + month;
    }
    self.dateValue1 = [year, month, date].join("-");
    self.userId = userId;
    self.roomId = this.$route.query.roomId;
    self.roomnum = this.$route.query.roomnum;
    self.phone = phone;
  },
  methods: {
    //预约前校验
    checkReady: function() {
      var phoneReg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
      if (!self.name) {
        Toast({
          className: "toast",
          message: "姓名不可以为空！",
          position: "top",
          duration: 2000
        });
        return;
      } else if (!self.phone) {
        Toast({
          className: "toast",
          message: "手机号码不可以为空！",
          position: "top",
          duration: 2000
        });
        return;
      } else if (self.phone.length !== 11) {
        Toast({
          className: "toast",
          message: "请输入11位手机号",
          position: "top",
          duration: 2000
        });
        return;
      } else if (!phoneReg.test(self.phone)) {
        Toast({
          className: "toast",
          message: "请正确格式的手机号",
          position: "top",
          duration: 2000
        });
        return;
      } else {
        self
          .$axios({
            url: "/pms/reserve_api/reserve",
            method: "post",
            data: {
              userId: self.userId,
              userMobile: self.phone,
              roomId: self.roomId,
              datename: self.name,
              appointment: self.dateValue1,
            },
            transformRequest: [
              function(data) {
                // Do whatever you want to transform the data
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
           console.log(response);
           self.$router.push("/orderSuccess");
          })
          .catch(function(error) {
            console.log(error);
          });        
        return;
      }
    }
  }
};
</script>