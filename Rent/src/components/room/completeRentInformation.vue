<template>
  <div class="main flex-x-center flex-y-center flex-col">
      <!-- 保洁预约 -->
      <div class="cleanServerAdd completeRentInformation flex-x-center flex-y-center flex-col">
          <!-- 标题 -->
        <div class="title flex-col flex-left flex-y-center">
            <p>租房信息</p>
            <p>填写您的需要的租房相关信息</p>
        </div>
        <!-- 您的姓名 -->
        <div class="name flex-left flex-y-center flex-col">
            <p>您的姓名</p>
            <input type="text" v-model="name" disabled>
        </div>
        <!-- 身份证 -->
        <div class="idcard flex-left flex-y-center flex-col">
            <p>您的身份证</p>
           <input type="number" v-model="idcard" disabled>
        </div>
        <!-- 选择保洁时间 -->
        <div class="chooseCleanTime flex-space-between flex-y-center flex-col">
            <div class="chooseCleanTime-txt flex-space-between flex-y-center flex-row">
                <p>开始租房日期</p>           
            </div>
            <div class="chooseCleanTime-btn flex-left flex-y-center flex-row">
                <input v-model="startDate" type="date" placeholder="请选择日期">                    
            </div>
        </div>               
        <!-- 选择保洁时间 -->
        <div class="chooseCleanTime flex-space-between flex-y-center flex-col">
            <div class="chooseCleanTime-txt flex-space-between flex-y-center flex-row">
                <p>结束租房日期</p>           
            </div>
            <div class="chooseCleanTime-btn flex-left flex-y-center flex-row">
                <input v-model="stopDate" type="date" placeholder="请选择日期">                    
            </div>
        </div>               

        <!-- 提交 -->
        <div class="submitClean flex-col flex-x-center flex-y-center" @click="submitInformation">
            <p>提交</p>
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
import { Toast } from "mint-ui";
let self;
export default {
  name: "completeRentInformation",
  data() {
    return {
      isHide: true,
      name: "",
      username: "",
      startDate: "",
      stopDate: "",
      idcard: "",
      useridcard: "",
      id: "",
      serial: "",
      billId: ""
    };
  },
  created() {
    self = this;
    var storage = window.localStorage;
    var userId = storage.getItem("userId");
    self.username = storage.getItem("userName");
    self.useridcard = storage.getItem("userPersonId");
    self.getTime();
    self.loadData();
  },
  methods: {
    //获取当前时间
    getTime() {
      var da = new Date();
      var year = da.getFullYear();
      var year2 = da.getFullYear() + 1;
      var month = da.getMonth() + 1;
      var date = da.getDate();
      var hour = da.getHours();
      var minute = da.getMinutes();
      if (month < 10) {
        month = "0" + month;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      self.startDate = [year, month, date].join("-");
      self.stopDate = [year2, month, date].join("-");
    },
    loadData() {
      self.name = self.$route.query.name;
      self.idcard = self.$route.query.idcard;
      self.id = self.$route.query.id;
      if (!self.idcard) {
        self.idcard = self.useridcard;
      }
      if (!self.name) {
        self.name = self.username;
      }
    },
    submitInformation() {
      self
        .$axios({
          url: "/pms/contract_api/contractsign?id=" + self.id,
          method: "post",
          data: {
            tenants: self.name,
            idcard2: self.idcard,
            begin_rent: self.startDate,
            end_rent: self.stopDate
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
          Toast({
            className: "successMessage",
            message: "提交成功",
            iconClass: "icon icon-success",
            duration: 2000
          });
          self.billId = response.data.data[0].billId;
          self.serial = response.data.data[0].serial;
          self.$router.push({
            path: "/signUp",
            query: { id: self.billId, serial: self.serial }
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

