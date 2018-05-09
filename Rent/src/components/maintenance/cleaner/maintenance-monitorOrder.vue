<template>
    <div class="main flex-col flex-x-center flex-y-center">
        <div class="cover flex-col flex-x-center flex-y-center" :class="{showC:showChoices}">
            <div class="choice-outside  flex-x-center flex-col">
                <div class="title flex-left flex-col flex-y-center">
                    <p>重新分配选择</p>
                </div>
                <div class="choice-lists">
                    <div class="choice-item flex-row flex-left flex-y-center" v-for="person in cleanerList" :key="person.id">
                        <input type="checkbox" v-model="a1" :id="person.id"><label :for="person.id" class="flex-row flex-x-center flex-y-center">{{person.name}} <p>{{person.number}}单进行中</p></label>
                    </div>
                </div>
                <div class="choice-button flex-col flex-x-center flex-y-center" @click="sumbitDistribution()">
                    <p>确认提交</p>
                </div>
            </div>
        </div>
        <div class="maintenance-monitorOrder flex-col flex-x-center flex-y-center">
            <div class="title flex-col flex-left flex-y-center">
                <p>{{type}}订单</p>
            </div>
            <div class="orderLists flex-col flex-x-center flex-y-center">
                <div :class="setClass(item.status)" v-for="item in cleanOrderList" :key="item.id">
                    <div class="redPoint flex-row flex-x-center flex-y-center" :class="setPoint(item.status)"></div>
                    <div class="itemContent flex-row flex-space-around flex-y-center">
                        <div class="itemContentLeft flex-col flex-left flex-y-center">
                            <div class="text-top flex-row flex-left flex-y-center">
                                <p>{{item.roomNum}}</p>
                                <p>{{item.uname}}</p>
                                <p>{{item.phone}}</p>
                                <p>{{getTime(item.repairTime,item.cleanTime)}}</p>
                            </div>
                            <div class="text-bottom flex-row flex-left flex-y-center">
                                <p>分配：</p>
                                <p>李阿姨</p>
                                <p :class="{active:!(item.status == 2)}">{{item.txt}}</p>
 
                            </div>
                        </div>
                        <div class="itemContentRight flex-col flex-x-center flex-y-center">
                            <div class="flex-col flex-x-center flex-y-center" v-if="item.status == 0">
                                <a :to="{path:''}" class="distribution flex-row flex-x-center flex-y-center" @click="distribution1()">
                                    分配
                                </a>
                                <router-link :to="{path:''}" class="remind flex-row flex-x-center flex-y-center">
                                    提醒
                                </router-link>
                            </div>
                            <div class="flex-col flex-x-center flex-y-center" v-else-if="item.status == 1">
                                <a :to="{path:''}" class="distributed flex-row flex-x-center flex-y-center">
                                    分配
                                </a>
                                <router-link :to="{path:''}" class="remind flex-row flex-x-center flex-y-center">
                                    详情
                                </router-link>
                            </div>
                            <div class="flex-col flex-x-center flex-y-center" v-else>
                                <a :to="{path:''}" class="distributed flex-row flex-x-center flex-y-center">
                                    分配
                                </a>
                                <router-link :to="{path:''}" class="remind flex-row flex-x-center flex-y-center">
                                    提醒
                                </router-link>
                            </div>
                        </div>
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
      point: true,
      type: "",
      cleanOrderList: [],
      a1: true,
      showChoices: false,
      cleanerList: [
        { name: "张阿姨", number: "2", id: "t1" },
        { name: "钱阿姨", number: "5", id: "t2" },
        { name: "王阿姨", number: "10", id: "t3" },
        { name: "李阿姨", number: "1", id: "t4" },
        { name: "温阿姨", number: "7", id: "t5" },
        { name: "黑阿姨", number: "3", id: "t6" },
        { name: "白阿姨", number: "8", id: "t7" },
        { name: "黄阿姨", number: "2", id: "t8" },
        { name: "温阿姨", number: "7", id: "t5" },
        { name: "黑阿姨", number: "3", id: "t6" },
        { name: "白阿姨", number: "8", id: "t7" },
        { name: "黄阿姨", number: "2", id: "t8" }
      ]
    };
  },
  created() {
    let self = this;
    self.loadData();
  },
  methods: {
    loadData() {
      let self = this;
      var storage = window.localStorage;
      var userId = storage.getItem("userId");
      var userRole = storage.getItem("userRole");
      if (userRole == "保洁队长") {
        self.type = "保洁";
        self.$axios
          .get("/pms/api_clean/captain_orderlist")
          .then(function(response) {
            self.cleanOrderList = response.data.data[0].clean;
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        self.point = false;
        self.type = "维修";
        self.$axios
          .get("/pms/api_repair/captain_orderlist")
          .then(function(response) {
            var storage = window.localStorage;
            console.log(response.data.data[0]);
          })
          .catch(function(error) {
            console.log(error);
          });
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
    //红点判断
    setPoint(item) {
      if (item == 2) {
        return "hidePoint";
      } else {
        return "";
      }
    },
    distribution1() {
      return (this.showChoices = true);
    },
    sumbitDistribution() {
      return (this.showChoices = false);
    }
  }
};
</script>