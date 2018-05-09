<template>
  <div class="main flex-col flex-x-center flex-y-center ">
      <div class="afterLoginIndex  wrapper" ref="wrapper" style="position:relative;overflow:hidden;">
        <div class="content flex-col flex-x-center flex-y-center">
          <!-- <my-cephalosome/> -->
          <!-- 广告位 -->
          <div class="banner">
            <mt-swipe :auto="3000" class="flex-col flex-x-center flex-y-center">
              <mt-swipe-item class="bannerItem flex-row flex-x-center flex-y-center">
                <div>
                  <img src="../../../static/img/car1.jpg" alt="">
                </div>
              </mt-swipe-item>
              <mt-swipe-item class="bannerItem flex-row flex-x-center flex-y-center">
                <div>
                  <img src="../../../static/img/car2.jpg" alt="">
                </div>
              </mt-swipe-item>
              <mt-swipe-item class="bannerItem flex-row flex-x-center flex-y-center">
                <div>
                  <img src="../../../static/img/car3.jpg" alt="">
                </div>
              </mt-swipe-item>
            </mt-swipe>
          </div>
          <!-- 应缴费用提醒 -->
          <div class="rentReminding" v-if="userId">
            <mt-swipe :auto="4000" class="flex-col flex-x-center flex-y-center">
              <mt-swipe-item class="flex-row flex-x-center flex-y-center" v-for="item in payList" :key="item.id">
                <div class="textDate flex-col flex-left flex-y-center">
                  <div class="text flex-col flex-left flex-y-center">
                    <p>本月应缴纳费用提醒 ! 期限日期内缴纳当月费用喔</p>
                  </div>
                  <div class="date flex-col flex-left flex-y-center">
                    <p class="flex-row flex-left flex-y-center">
                      <span>2018</span>年
                      <span>3</span>月
                      <span>30</span>号</p>
                  </div>
                </div>
                <div class="Money flex-row flex-x-center flex-y-center">
                  <div class="money flex-row flex-x-center flex-y-center">
                    <router-link :to="'/paymentRecordPayY?id='+item.id" class="flex-row flex-left flex-y-center">
                      <div>
                        <p class="flex-row flex-x-center flex-bottom">
                          <span>{{item.rent}}</span>元</p>
                      </div>
                    </router-link>
                  </div>
                </div>
              </mt-swipe-item>
            </mt-swipe>
          </div>
          <!-- 社区服务 -->
          <div class="communityService flex-col flex-left flex-y-center">
            <p>社区服务</p>
            <div class="communityService-item flex-row flex-left flex-y-center">
              <router-link :to="{path:'/'}" class="intelligentLock flex-col flex-x-center flex-y-center">
                <p class="flex-col flex-x-center flex-y-center">智能
                  <br/>开锁</p>
              </router-link>
              <router-link :to="{path:'/paymentRecord'}" class="online-pay flex-col flex-x-center flex-y-center">
                <p class="flex-col flex-x-center flex-y-center">在线
                  <br/>缴费</p>
              </router-link>
            </div>
          </div>
          <!-- 口号标题 -->
          <div class="alloutside flex-col flex-x-center flex-y-center">
            <div class="afterLoginIndex-title flex-col flex-left flex-y-center">
              <div class="top flex-row flex-left flex-y-center">
                <p>300+个公寓房源</p>
                <div class="index-tag-icon"></div>
              </div>
              <div class="bom flex-row flex-left flex-y-center">
                <p>用最真诚的服务保证提供品质和舒适的房源</p>
              </div>
            </div>
          </div>
          <!-- 套房列表 -->
          <div class="room-outside flex-col flex-x-center flex-y-center">
            <div class="room-list flex-col flex-left flex-y-center">
              <router-link :to="'/roomDetail?id='+item.id" class="room-item flex-col flex-x-center flex-y-center" v-for="item in roomList"
                :key="item.id">
                <div class="item-img flex-col flex-x-center flex-y-center">
                  <img :src="item.imageId" alt="">
                </div>
                <div class="item-content flex-row flex-space-between flex-y-center">
                  <p>{{item.roomtype}}</p>
                  <p>{{item.area}}平方</p>
                  <p>楼层：{{item.floor}}</p>
                  <p class="flex-row flex-x-center flex-y-center"> {{item.rent}}
                    <span>¥ /月</span>
                  </p>
                </div>
              </router-link>
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
  import Vue from "vue";
  import { Loadmore } from "mint-ui";
  Vue.component(Loadmore.name, Loadmore);

  import store from "@/vuex/store";
  import BScroll from "better-scroll";
  export default {
    name: "afterLoginIndex",
    data() {
      return {
        list: [{ text: "1" }, { text: "2" }, { text: "3" }],
        itemImg: "../../../static/img/p1.png",
        roomList: [],
        payList: [],
        userId: "",
        allLoaded:"",
        topStatus: '',
      };
    },
    store,
    created() {
      let self = this;
      self.loadData();
    },
    methods: {
      loadTop() {
        this.loadData();
      },
      loadData() {
        let self = this;
        //获取房源列表
        self.$axios
          .get("/pms/room_api/list?keyword=")
          .then(function (response) {
            self.roomList = response.data[0].roomlist;
            // console.log(self.roomList);
            // console.log(self.roomList);
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
          .catch(function (error) {
            console.log(error);
          });
        //localStorage全局读取数据
        var storage = window.localStorage;
        var userId = storage.getItem("userId");
        // console.log(userId);
        self.userId = userId;
        var userPhone = storage.getItem("userPhone");
        //获取缴费相关
        self.$axios
          .get("/pms/room_api/getRooms?id=" + userId)
          .then(function (response) {
            self.payList = response.data.data[0].bill;
            if (!self.payList) {
              return (self.userId = false);
            }
            // console.log(self.payList);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };
</script>