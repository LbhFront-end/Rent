<template>
    <div class="main">
        <div class="maintenanceMRListDetails flex-col flex-x-center flex-y-center">
            <div class="title flex-col flex-left flex-y-center">
                <p>A203</p>
            </div>
            <div class="elec flex-col flex-x-center flex-y-center">
                <div class="serverItem flex-space-between flex-top flex-row">
                    <div class="serverItem-txt flex-x-center flex-y-center flex-col">
                        <p>电表</p>
                    </div>
                    <div class="serverItem-btn flex-right flex-y-center flex-col">
                        <div v-if="eleHide">
                            <img src="../../../../static/img/signUp-right1.png" alt="" class="rr"  @click="triggerEle()">
                        </div>
                        <div v-else>
                            <img src="../../../../static/img/signUp-left1.png" alt="" class="ll"  @click="triggerEle()">
                        </div>
                        <div :class="{hide:eleHide}" class="content">
                            <div class="line flex-space-between flex-y-center flex-row">
                                <p>电表编号</p>
                                <p>{{eOrderNum}}</p>
                            </div>
                            <div class="line flex-space-between flex-y-center flex-row">
                                <p>上次年检时间</p>
                                <p>{{getTime(yCheckTime)}}</p>
                            </div>
                            <div class="line flex-space-between flex-y-center flex-row">
                                <p>上次维修时间</p>
                                <p>{{getTime(lRepairTime)}}</p>
                            </div>
                            <div class="line flex-space-between flex-y-center flex-row">
                                <p>上月度数</p>
                                <p>{{lastReading}} 度</p>
                            </div>
                            <div class="line flex-space-between flex-y-center flex-row">
                                <p>本月度数</p>
                                <p><input type="number" v-model="elec"> 度</p>
                            </div>
                            <div class="total flex-space-between flex-y-center flex-row">
                                <p>实用度数</p>
                                <p>{{elec-lastReading}}度</p>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="water flex-col flex-x-center flex-y-center" :class="{height:!eleHide}">
                <div class="serverItem flex-space-between flex-top flex-row">
                    <div class="serverItem-txt flex-x-center flex-y-center flex-col">
                        <p>水表</p>
                    </div>
                    <div class="serverItem-btn flex-right flex-y-center flex-col">
                        <div v-if="waterHide">
                            <img src="../../../../static/img/signUp-right1.png" alt="" class="rr"  @click="triggerWater()">
                        </div>
                        <div v-else>
                            <img src="../../../../static/img/signUp-left1.png" alt="" class="ll"  @click="triggerWater()">
                        </div>
                        <div :class="{hide:waterHide}" class="content">
                            <div class="line flex-space-between flex-y-center flex-row">
                                <p>水表编号</p>
                                <p>{{wOrderNum}}</p>
                            </div>
                            <div class="line flex-space-between flex-y-center flex-row">
                                <p>上次年检时间</p>
                                <p>{{getTime(wyCheckTime)}}</p>
                            </div>
                            <div class="line flex-space-between flex-y-center flex-row">
                                <p>上次维修时间</p>
                                <p>{{getTime(wlRepairTime)}}</p>
                            </div>
                            <div class="line flex-space-between flex-y-center flex-row">
                                <p>上月方数</p>
                                <p>{{wlastReading}} 方</p>
                            </div>
                            <div class="line flex-space-between flex-y-center flex-row">
                                <p>本月方数</p>
                                <p><input type="number" v-model="water"> 方</p>
                            </div>
                            <div class="total flex-space-between flex-y-center flex-row">
                                <p>实用方数</p>
                                 <p>{{water-wlastReading}}方</p>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="submitClean flex-col flex-x-center flex-y-center" @click="submitMeter" :class="{height:!waterHide}">
                <p>提交</p>
            </div>
        </div>
    </div>
</template>
<style scoped>
.hide {
  display: none;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
<script>
let self;
export default {
  name: "",
  data() {
    return {
      eleHide: false,
      waterHide: false,
      elec: "",
      water: "",
      waterData: "",
      gasData:"",
      eleData: "",
      eOrderNum: "",
      yCheckTime: "",
      lRepairTime: "",
      lastReading: "",
      wOrderNum: "",
      wyCheckTime: "",
      wlRepairTime: "",
      wlastReading: "",
      gOrderNum: "",
      gyCheckTime: "",
      glRepairTime: "",
      glastReading: "",
      wOrderId: "",
      eOrderId: "",
      gOrderId: "",
    };
  },
  created() {
    self = this;
    self.loadData();
  },
  methods: {
    //隐藏显示详情
    triggerEle: function() {
      self.eleHide = !self.eleHide;
    },
    triggerWater: function() {
      self.waterHide = !self.waterHide;
    },
    submitMeter: function() {
      self
        .$axios({
          url: "/pms/api_repair/finish_order",
          method: "post",
          data: {
            roomNum: this.$route.query.id,
            waterReading: self.water,
            elecReading: self.elec,
            gasReading: 100,
            wOrderId: self.wOrderId,
            eOrderId: self.eOrderId,
            gOrderId: self.gOrderId
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
          // console.log(response);
        //   self.$router.push("/maintenanceMRList");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    loadData() {
      self.$axios
        .get("/pms/api_write/orderdetail?roomNum=" + this.$route.query.id)
        .then(function(response) {
          //电
          self.eleData = response.data.data[0].elec;
          self.eOrderId = response.data.data[0].elec.id;
          self.eOrderNum = response.data.data[0].elec.eOrderNum;
          self.lastReading = response.data.data[0].elec.lastReading;
          self.yCheckTime = response.data.data[0].elec.yCheckTime.time;
          self.lRepairTime = response.data.data[0].elec.lRepairTime.time;
          //水
          self.waterData = response.data.data[0].water;
          self.wOrderId = response.data.data[0].water.id;
          self.wOrderNum = response.data.data[0].water.wOrderNum;
          self.wlastReading = response.data.data[0].water.lastReading;
          self.wyCheckTime = response.data.data[0].water.yCheckTime.time;
          self.wlRepairTime = response.data.data[0].water.lRepairTime.time;
          //气
          self.gasData = response.data.data[0].gas;
          self.gOrderId = response.data.data[0].gas.id;
          self.gOrderNum = response.data.data[0].gas.wOrderNum;
          self.glastReading = response.data.data[0].gas.lastReading;
          self.gyCheckTime = response.data.data[0].gas.yCheckTime.time;
          self.glRepairTime = response.data.data[0].gas.lRepairTime.time;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getTime(item) {
      var da = new Date(item);
      var year = da.getFullYear();
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
      return [year, month, date].join("-");
    }
  }
};
</script>