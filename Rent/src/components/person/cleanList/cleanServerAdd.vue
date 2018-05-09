<template>
  <div class="main flex-x-center flex-y-center flex-col">
      <!-- 保洁预约 -->
      <div class="cleanServerAdd flex-x-center flex-y-center flex-col">
          <!-- 标题 -->
        <div class="title flex-col flex-left flex-y-center">
            <p>服务预约</p>
            <p>填写您的需要保洁的房间信息</p>
        </div>
        <!-- 楼号 -->
        <div class="HouseNumber flex-space-between flex-y-center flex-row">
            <p>楼号</p>
            <select class="flex-col flex-right flex-y-center" v-model="floorValue" @change="changeRoom(floorValue)">
                <option value="0">请选择楼号</option>
                <option :value="floorDetails" v-for="floorDetails in floorList" :key="floorDetails">{{floorDetails}}</option>
            </select>
        </div>
        <!-- 房号 -->
        <div class="HouseNumber2 flex-space-between flex-y-center flex-row">
            <p>房号</p>
            <select class="flex-col flex-right flex-y-center" v-model="roomValue" >
                <option value="0">请选择房号</option>
                <option :value="roomDetails" v-for="roomDetails in roomList" :key="roomDetails">{{roomDetails}}</option>
            </select>
        </div>
        <!-- 选择保洁时间 -->
        <div class="chooseCleanTime flex-space-between flex-y-center flex-col">
            <div class="chooseCleanTime-txt flex-space-between flex-y-center flex-row">
                <p>选择服务时间</p>           
            </div>
            <div class="chooseCleanTime-btn flex-left flex-y-center flex-row">
                <input v-model="dateValue1" type="date" placeholder="请选择日期">
                <input v-model="dateValue2" type="time" placeholder="请选择时间">              
            </div>
        </div>        
        <!-- 选择服务类型 -->
        <div class="chooseCleanType flex-space-between flex-y-center flex-col">
            <div class="chooseCleanType-txt flex-space-between flex-y-center flex-row">
                <p>保洁描述</p>           
            </div>
            <div class="chooseCleanType-btn flex-left flex-y-center flex-row">
                <select name="" id="" v-model="serverType">
                    <option value="0">请选择服务类型</option>
                    <option value="8a84824d6252ee74016252f241b40002">保洁服务</option>
                    <option value="8a84824d6252ee74016252f20f060001">维修服务</option>
                </select>            
            </div>
        </div>        
        <!-- 保洁描述 -->
        <div class="cleanDescription flex-space-between flex-y-center flex-col">
            <div class="cleanDescription-txt flex-space-between flex-y-center flex-row">
                <p>保洁描述</p>           
            </div>
            <div class="cleanDescription-textarea flex-left flex-y-center flex-row">
              <textarea name="" id="" cols="30" rows="5" v-model="description" placeholder="简单描述需要的服务"></textarea>
            </div>
        </div>        
        <!-- 价目表-->
        <div class="cleanPriceList flex-space-between flex-top flex-col">
            <div class="cleanPriceList-txt flex-left flex-y-center flex-col">
                <p>保洁价目表</p>                   
            </div>
            <div class="cleanPriceList-table flex-x-center flex-top flex-row" >
                <table>
                  <tr>
                    <td>项目</td>
                    <td>价格</td>
                  </tr>
                  <tr v-for="left in cleanListLeft" :key="left.id">
                    <td>{{left.typename}}</td>
                    <td>{{left.fee}}</td>
                  </tr>
                </table>                                                                                                            
                <table>
                  <tr>
                    <td>项目</td>
                    <td>价格</td>
                  </tr>
                  <tr v-for="right in cleanListRight" :key="right.id">
                    <td>{{right.typename}}</td>
                    <td>{{right.fee}}</td>
                  </tr>
                </table>                                                                                                            
            </div>
        </div> 
        <!-- 提交 -->
        <div class="submitClean flex-col flex-x-center flex-y-center" @click="submitServer">
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
  name: "cleanServerAdd",
  data() {
    return {
      isHide: true,
      cleanCommentsContent: "",
      dateValue1: "1999-01-01",
      dateValue2: "00:00",
      floorValue: "",
      roomValue: "",
      serverItemName: [],
      itemList: [],
      roomList: [],
      floorList: [],
      floorRoomList: [],
      cleanListLeft: [],
      cleanListRight: [],
      serverType: 0,
      description: ""
    };
  },
  created() {
    self = this;
    self.loadData();
  },
  methods: {
    loadData() {
      var storage = window.localStorage;
      var userId = storage.getItem("userId");
      //获取当前时间
      var da = new Date();
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
      self.dateValue1 = [year, month, date].join("-");
      self.dateValue2 = [hour, minute].join(":");
      //获取楼房
      self.$axios
        .get("/pms/room_api/selectRooms?id=" + userId)
        .then(function(response) {
          self.floorRoomList = response.data.data[0];
          var floorArray = self.floorRoomList;
          //获取数组的属性
          var keys = [];
          for (var property in floorArray) {
            keys.push(property);
          }
          self.floorList = keys;
        })
        .catch(function(error) {
          console.log(error);
        });

      // 获取价格表
      self.$axios
        .get("/pms/order_api/pricelist")
        .then(function(response) {
          var priceList = response.data.data[0].expense;
          var result1 = [];
          var result2 = [];
          var len = priceList.length;
          result1.push(priceList.slice(0, len / 2));
          result2.push(priceList.slice(len / 2, len));
          self.cleanListLeft = result1[0];
          self.cleanListRight = result2[0];
          //获取节目表的价格与项目名称
          var cleanNameList = [];
          var cleanNamePrice = [];
          for (var i = 0; i < priceList.length; i++) {
            cleanNameList.push(priceList[i].typename);
            cleanNamePrice.push(priceList[i].fee);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //获取服务的项目
    getServerItem(item) {
      self.$axios
        .get("/pms/room_api/getItems?id=" + item)
        .then(function(response) {
          self.itemList = response.data[0].items;
          //获取checkbox的name
          var names = [];
          var arrayList = self.itemList;
          for (var i in arrayList) {
            for (var j in arrayList[i]) {
              names.push(arrayList[i].name);
            }
          }
          //去重
          var nameResult = [];
          for (var i = 0; i < names.length; i++) {
            for (var j = i + 1; j < names.length; j++) {
              if (names[i] === names[j]) {
                j = ++i;
              }
            }
            nameResult.push(names[i]);
          }
          self.serverItemName = nameResult;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //楼层房间联动
    changeRoom(item) {
      var itemArray = self.floorRoomList;
      var values = [];
      for (var property in itemArray) {
        if (property == item) {
          values.push(itemArray[property]);
        }
      }
      self.roomList = values[0];
    },
    //submitServer服务提交
    submitServer() {
      //获取当前时间
      var now = new Date();
      var old = new Date(self.dateValue1 + " " + self.dateValue2);
      if (!self.floorValue) {
        Toast({
          className: "toast",
          message: "请选择楼号",
          position: "top",
          duration: 2000
        });
        return false;
      } else if (!self.roomValue) {
        Toast({
          className: "toast",
          message: "请选择房间号",
          position: "top",
          duration: 2000
        });
        return false;
      } else if (!self.serverType) {
        Toast({
          className: "toast",
          message: "请选择服务类型",
          position: "top",
          duration: 2000
        });
      }

      //获取时间
      var storage = window.localStorage;
      var phone = storage.getItem("userPhone");
      var userId = storage.getItem("userId");

      //设置服务项目
      var itemString = "";
      var itemTarget = self.serverItemName;
      for (var i in itemTarget) {
        itemString += itemTarget[i] + ",";
      }
      self
        .$axios({
          url: "/pms/room_api/addorder",
          method: "post",
          data: {
            userId: userId,
            roomNum: self.roomValue,
            orderType: self.serverType,
            phone: phone,
            time: self.dateValue1 + " " + self.dateValue2,
            remark: self.description
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
          self.$router.push("/cleanList");
        })
        .catch(function(error) {
          alert(error);
          console.log(error);
        });
    }
  }
};
</script>

