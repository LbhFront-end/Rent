<template>
  <div class="main flex-col flex-x-center flex-y-center">
      <div class="maintenance-cleanerOrder flex-col flex-x-center flex-y-center">
          <div class="title flex-col flex-left flex-y-center">
              <p>{{title}}</p>
          </div>
          <div class="orderLists flex-col flex-x-center flex-y-center">
              <div :class="setClass(item.status)" v-for="item in cleanOrderList" :key="item.id">
                  <div class="redPoint flex-row flex-x-center flex-y-center" :class="setPoint(item.status)"></div>
                  <div class="itemContent flex-row flex-space-around flex-y-center">
                      <p>{{item.roomNum}}</p>
                      <p>{{item.uname}}</p>
                      <p>{{item.phone}}</p>
                      <p>{{getTime(item.cleanTime,item.repairTime)}}</p>
                      <router-link :to="'/maintenanceCleanerOrderDetails?id='+item.id" class="flex-row flex-x-center flex-y-center">
                          {{getTxt(item.status)}}
                      </router-link>
                  </div>
              </div>
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
export default {
  name: "maintenance-cleanerOrder",
  data() {
    return {
      title: "",
      cleanOrderList: []
    };
  },
  created() {
    let self = this;
    self.loadData();
  },
  methods: {
    //样式判断
    setClass(item) {
      if (item == 0) {
        return "listItem0 flex-row flex-x-center flex-y-center";
      } else if (item == 1) {
        return "listItem0 listItem1 flex-row flex-x-center flex-y-center";
      } else {
        return "listItem0 listItem2 flex-row flex-x-center flex-y-center";
      }
    },
    getTxt(item) {
      if (item == 0) {
        return "接单";
      } else if (item == 1) {
        return "进行中";
      } else {
        return "详情";
      }
    },
    //红点判断
    setPoint(item) {
      if (item == 0) {
        return "";
      } else if (item == 1) {
        return "";
      } else {
        return "hidePoint";
      }
    },
    getTime(a, b) {
      if (a) {
        var da = new Date(a);
        var year = da.getFullYear();
        var month = da.getMonth() + 1;
        var date = da.getDate();
        var hour = da.getHours();
        var minute = da.getMinutes();
        return [month, date].join("-") + " " + [hour, minute].join(":");
      } else {
        var da = new Date(b);
        var year = da.getFullYear();
        var month = da.getMonth() + 1;
        var date = da.getDate();
        var hour = da.getHours();
        var minute = da.getMinutes();
        return [month, date].join("-") + " " + [hour, minute].join(":");
      }
    },
    loadData() {
      let self = this;
      var storage = window.localStorage;
      var userId = storage.getItem("userId");
      var userRole = storage.getItem("userRole");
      if (userRole == "保洁员") {
        self.title = "保洁订单";
        self.$axios
          .get("/pms/api_clean/cleaner_orderlist?userId=" + userId)
          .then(function(response) {
            self.cleanOrderList = response.data.data[0].clean;
            // console.log(response.data.data[0].clean);
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        self.title = "维修订单";
        self.$axios
          .get("/pms/api_repair/repairman_orderlist?userId=" + userId)
          .then(function(response) {
            self.cleanOrderList = response.data.data[0].repair;
            // console.log(response.data.data[0].clean);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  }
};
</script>
