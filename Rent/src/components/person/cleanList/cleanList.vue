<template>
  <div class="main">
    <div class="wrapper cleanListOutside" ref="wrapper" style="position:relative;overflow:hidden;">
      <!-- 历史服务（保洁）列表 -->
      <div class="content">
        <div class="cleanList2 flex-col flex-x-center flex-y-center ">
          <!-- 标题 -->
          <div class="cleanListHead flex-space-between flex-top flex-row">
            <div class="title flex-left flex-y-center flex-col">
              <p>历史服务列表</p>
              <p>包含所有服务涉及的项目列表</p>
            </div>
            <div class="cleanAddBtn flex-x-center flex-y-center flex-row">
              <router-link :to="{path:'/cleanServerAdd'}" class="flex-x-center flex-y-center flex-row">
                <p>+增值服务</p>
              </router-link>
            </div>
          </div>
          <!-- 保洁列表订单详情集 -->
          <div class="cleanListDetails flex-x-center flex-y-center flex-col">
            <!-- 单个详情 -->
            <div class="cleanListDetailsItem flex-x-center flex-y-center flex-col" v-for="repairItem in repairList" :key="repairItem.id">
              <!-- 保洁信息 -->
              <div class="cleanListDetailsItem-text flex-space-between flex-bottom flex-row">
                <div class="cleanPersonTime flex-left flex-y-center flex-col">
                  <p>
                    <span>{{getMan(repairItem.repairmanId,repairItem.status)}}</span>
                  </p>
                  <p>维修上门时间：
                    <span>{{getTime(repairItem.repairTime)}}</span>
                  </p>
                </div>
                <div class="cleanHouseState flex-right flex-y-center flex-col">
                  <p>{{repairItem.roomNum}}</p>
                  <p>{{getRepairStatus(repairItem.status)}}</p>
                </div>
              </div>
              <!-- 保洁按钮操作  -->
              <div class="cleanListDetailsItem-Btns flex-right flex-y-center flex-row">
                <div class="cleanN flex-right flex-y-center flex-row" v-if="repairItem.status == 0">
                  <a class="notice flex-x-center flex-y-center flex-col" @click="tip(repairItem.id)">提 醒</a>
                  <a class="cancel flex-x-center flex-y-center flex-col" @click="cancelOrder(repairItem.id)">取 消</a>
                </div>
                <div class="cleanY flex-right flex-y-center flex-row" v-else-if="repairItem.status == 1 ">
                  <router-link :to="'/repairComment?id='+repairItem.id" class="comment flex-x-center flex-y-center flex-row" style="margin-right:0;background:#00a699;">
                    详 情
                  </router-link>
                </div>
                <div class="cleanY flex-right flex-y-center flex-row" v-else-if="repairItem.status == 3">
                  <router-link :to="'/repairComment?id='+repairItem.id" class="comment flex-x-center flex-y-center flex-row">
                    详 情
                  </router-link>
                  <a class="delete flex-x-center flex-y-center flex-col" @click="deleteOrder(repairItem.id)">删 除</a>
                </div>
                <div class="cleanY flex-right flex-y-center flex-row" v-else-if="repairItem.status == 4">
                  <router-link :to="'/repairComment?id='+repairItem.id" class="comment flex-x-center flex-y-center flex-row">
                    详 情
                  </router-link>
                  <a class="delete flex-x-center flex-y-center flex-col" @click="deleteOrder(repairItem.id)">删 除</a>
                </div>
                <div class="cleanY flex-x-center flex-y-center flex-row" v-else-if="repairItem.status == 2">
                  <router-link :to="'/repairComment?id='+repairItem.id" class="comment flex-x-center flex-y-center flex-row">
                    评 价
                  </router-link>
                  <a class="delete flex-x-center flex-y-center flex-col" @click="deleteOrder(repairItem.id)">删 除</a>
                </div>
              </div>
            </div>
            <!-- 单个详情 -->
            <div class="cleanListDetailsItem flex-x-center flex-y-center flex-col" v-for="cleanItem in cleanList" :key="cleanItem.id">
              <!-- 保洁信息 -->
              <div class="cleanListDetailsItem-text flex-space-between flex-bottom flex-row">
                <div class="cleanPersonTime flex-left flex-y-center flex-col">
                  <p>分配保洁员：
                    <span>{{getMan(cleanItem.cleanmanId,cleanItem.status)}}</span>
                  </p>
                  <p>保洁上门时间：
                    <span>{{getTime(cleanItem.cleanTime)}}</span>
                  </p>
                </div>
                <div class="cleanHouseState flex-right flex-y-center flex-col">
                  <p>{{cleanItem.roomNum}}</p>
                  <p>{{getCleanStatus(cleanItem.status)}}</p>
                </div>
              </div>
              <!-- 保洁按钮操作  -->
              <div class="cleanListDetailsItem-Btns flex-right flex-y-center flex-row">
                <div class="cleanN flex-right flex-y-center flex-row" v-if="cleanItem.status == 0">
                  <a class="notice flex-x-center flex-y-center flex-col" @click="tip(cleanItem.id)">提 醒</a>
                  <a class="cancel flex-x-center flex-y-center flex-col" @click="cancelOrder(cleanItem.id)">取 消</a>
                </div>
                <div class="cleanY flex-right flex-y-center flex-row" v-else-if="cleanItem.status == 1">
                  <router-link :to="'/cleanComment?id='+cleanItem.id" class="comment flex-x-center flex-y-center flex-row" style="margin-right:0;background:#00a699;">
                    详 情
                  </router-link>
                </div>
                <div class="cleanY flex-right flex-y-center flex-row" v-else-if="cleanItem.status == 3">
                  <router-link :to="'/cleanComment?id='+cleanItem.id" class="comment flex-x-center flex-y-center flex-row">
                    详 情
                  </router-link>
                  <a class="delete flex-x-center flex-y-center flex-col" @click="deleteOrder(cleanItem.id)">删 除</a>
                </div>
                <div class="cleanY flex-right flex-y-center flex-row" v-else-if="cleanItem.status == 4">
                  <router-link :to="'/cleanComment?id='+cleanItem.id" class="comment flex-x-center flex-y-center flex-row">
                    详 情
                  </router-link>
                  <a class="delete flex-x-center flex-y-center flex-col" @click="deleteOrder(cleanItem.id)">删 除</a>
                </div>
                <div class="cleanY flex-right flex-y-center flex-row" v-else-if="cleanItem.status == 2">
                  <router-link :to="'/cleanComment?id='+cleanItem.id" class="comment flex-x-center flex-y-center flex-row">
                    评 价
                  </router-link>
                  <a class="delete flex-x-center flex-y-center flex-col" @click="deleteOrder(cleanItem.id)">删 除</a>
                </div>
              </div>
            </div>
          </div>
        </div>
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
import BScroll from "better-scroll";
import { Toast } from "mint-ui";
let self;
export default {
  name: "cleanList",
  data() {
    return {
      //清洗状态
      cleanState1: true,
      cleanState2: false,
      repairList: [],
      cleanList: []
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
      self.$axios
        .get("/pms/order_api/orderlist?id=" + userId)
        .then(function(response) {
          self.repairList = response.data.data[0].repair;
          self.cleanList = response.data.data[0].clean;
          self.$nextTick(() => {
            if (!self.scroll) {
              self.scroll = new BScroll(self.$refs.wrapper, {
                startX: 0,
                click: true,
                scrollX: false,
                scrollY: true
              });
            } else {
              self.scroll.refresh();
            }
            // console.log(self.scroll);
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //时间戳转化
    getTime(item) {
      var da = new Date(item);
      var year = da.getFullYear();
      var month = da.getMonth() + 1;
      var date = da.getDate();
      var hour = da.getHours();
      var minute = da.getMinutes();
      return [year, month, date].join(".") + " " + [hour, minute].join(":");
    },
    //订单状态
    getRepairStatus(item) {
      if (item == 0) {
        return "待维修";
      } else if (item == 1) {
        return "进行中";
      } else if (item == 2) {
        return "已保修";
      } else if (item == 4) {
        return "已取消";
      } else {
        return "已结单";
      }
    },
    getCleanStatus(item) {
      if (item == 0) {
        return "待保洁";
      } else if (item == 1) {
        return "进行中";
      } else if (item == 2) {
        return "已保洁";
      } else if (item == 4) {
        return "已取消";
      } else {
        return "已结单";
      }
    },
    getMan(a, b) {
      if (b == 4) {
        return "已取消";
      } else if (a) {
        return a;
      } else {
        return "服务人员正在分配中";
      }
    },
    deleteOrder(item) {
      self.$axios
        .post("/pms/order_api/delete/" + item)
        .then(function(response) {
          var storage = window.localStorage;
          var userId = storage.getItem("userId");
          self.$axios
            .get("/pms/order_api/orderlist?id=" + userId)
            .then(function(response) {
              window.scrollTo(0, 0);
              self.repairList = response.data.data[0].repair;
              self.cleanList = response.data.data[0].clean;
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    cancelOrder(item) {
      self
        .$axios({
          url: "/pms/order_api/cancel",
          method: "post",
          data: {
            id: item
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
          var storage = window.localStorage;
          var userId = storage.getItem("userId");
          self.$axios
            .get("/pms/order_api/orderlist?id=" + userId)
            .then(function(response) {
              window.scrollTo(0, 0);
              self.repairList = response.data.data[0].repair;
              self.cleanList = response.data.data[0].clean;
              Toast({
                className: "toast",
                message: "取消成功",
                position: "top",
                duration: 2000
              });
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //提醒
    tip(item) {
      self
        .$axios({
          url: "/pms/order_api/warn",
          method: "post",
          data: {
            id: item
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
          // console.log(response.data);
          var tip = response.data.message
          Toast({
            className: "toast",
            message: tip,
            position: "top",
            duration: 2000
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>