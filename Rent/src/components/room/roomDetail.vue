<template>
    <div class="main flex-col flex-x-center flex-y-center">
        <div class="roomDetail wrapper" ref="wrapper" style="position:relative;overflow:hidden;">
            <div class="content flex-col flex-x-center flex-y-center" v-for="item in roomDatails" :key="item.id">
                <!-- 屋子详图+顶部按钮组 -->
                <div class="pictureBtns flex-row flex-x-center flex-y-center">
                    <div class="picture">
                        <mt-swipe :auto="3000" class="flex-col flex-x-center flex-y-center">
                            <mt-swipe-item class="pictureItem flex-row flex-x-center flex-y-center" v-for="imgs in item.imageId" :key="imgs.id">
                                <div>
                                    <img :src="imgs" alt="">
                                </div>
                            </mt-swipe-item>
                        </mt-swipe>
                    </div>
                    <div class="btns flex-row flex-space-between flex-y-center">
                        <div class="back flex-row flex-x-center flex-y-center">
                            <router-link :to="{path:'/afterLoginIndex'}" class="flex-row flex-x-center flex-y-center">
                                <div class="room-back"></div>
                            </router-link>
                        </div>
                        <div class="sharelike flex-row flex-x-center flex-y-center">
                            <div class="share flex-row flex-x-center flex-y-center">
                                <router-link :to="{path:''}" class="flex-row flex-x-center flex-y-center">
                                    <div class="room-share"></div>
                                </router-link>
                            </div>
                            <div class="like flex-row flex-x-center flex-y-center">
                                <router-link :to="{path:''}" class="flex-row flex-x-center flex-y-center">
                                    <div class="room-like"></div>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 屋子信息详情 -->
                <div class="information flex-col flex-x-center flex-y-center">
                    <!-- 标题 -->
                    <div class="title flex-col flex-left flex-y-center">
                        <p>{{item.roomname}}楼</p>
                        <p>栋数：
                            <span>{{item.building}}</span>
                        </p>
                    </div>
                    <!-- 屋子配置 -->
                    <div class="details flex-row flex-space-around flex-y-center">
                        <div class="rent flex-col flex-x-center flex-y-center">
                            <div class="room-rent" />
                            <div>
                                <p>
                                    <span>{{item.rent}}元</span>/月</p>
                            </div>
                        </div>
                        <div class="room flex-col flex-x-center flex-y-center">
                            <div class="room-rooms" />
                            <div>
                                <p>
                                    <span>{{item.roomquantity}}</span>个房间</p>
                            </div>
                        </div>
                        <div class="bed flex-col flex-x-center flex-y-center">
                            <div class="room-bed" />

                            <div>
                                <p>
                                    <span>{{item.bedquantity}}</span>张床</p>
                            </div>
                        </div>
                        <div class="shower flex-col flex-x-center flex-y-center">
                            <div class="room-shower" />
                            <div>
                                <p>
                                    <span>{{item.showerquantity}}</span>个淋浴间</p>
                            </div>
                        </div>
                    </div>
                    <!-- 房源编码 -->
                    <div class="houseSourceCode flex-col flex-left flex-y-center">
                        <p>房源编码：
                            <span>{{item.roomcode}}</span>
                        </p>
                    </div>
                    <!-- 面积楼层 -->
                    <div class="areaHIgh flex-space-between flex-row flex-y-center">
                        <div class="area flex-row flex-x-center flex-y-center">
                            <p>面积：
                                <span>{{item.area}}</span>平方</p>
                        </div>
                        <div class="high flex-row flex-left flex-y-center">
                            <p>楼层：
                                <span>{{item.floor}}</span>
                            </p>
                        </div>
                    </div>
                    <!-- 朝向装修 -->
                    <div class="directionRenovation flex-space-between flex-row flex-y-center">
                        <div class="direction flex-row flex-x-center flex-y-center">
                            <p>朝向：
                                <span>{{item.toward}}</span>
                            </p>
                        </div>
                        <div class="renovation flex-row flex-left flex-y-center">
                            <p>装修情况：
                                <span>{{item.renovation}}</span>
                            </p>
                        </div>
                    </div>
                    <!-- 房号押付 -->
                    <div class="roomNumberPaid flex-space-between flex-row flex-y-center">
                        <div class="roomNumber flex-row flex-x-center flex-y-center">
                            <p>房间号：
                                <span>{{item.roomnum}}</span>
                            </p>
                        </div>
                        <div class="paid flex-row flex-left flex-y-center">
                            <p>押付：
                                <span>{{item.mortgage}}</span>
                            </p>
                        </div>
                    </div>
                    <!-- 入住租期 -->
                    <div class="checkleaseTerm flex-space-between flex-row flex-y-center">
                        <div class="check flex-row flex-x-center flex-y-center">
                            <p>可入住时间：
                                <span>{{getTime(item.availabletime)}}</span>
                            </p>
                        </div>
                        <div class="leaseTerm flex-row flex-left flex-y-center">
                            <p>最短租期：
                                <span>{{item.shortestlease}}</span>
                            </p>
                        </div>
                    </div>
                    <!-- 固定收费项目 -->
                    <div class="fixedCharges flex-col flex-left flex-y-center">
                        <div class="title flex-col flex-left flex-y-center">
                            <p>固定收费项目</p>
                        </div>
                        <div class="chargeIcons flex-row flex-left flex-y-center">
                            <div class="water flex-col flex-x-center flex-y-center">
                                <div class="water-icon" />
                                <div>
                                    <p>水费</p>
                                </div>
                            </div>
                            <div class="electricity flex-col flex-x-center flex-y-center">
                                <div class="electricity-icon" />
                                <div>
                                    <p>电费</p>
                                </div>
                            </div>
                            <div class="management flex-col flex-x-center flex-y-center">
                                <div class="management-icon" />
                                <div>
                                    <p>管理费</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 房源详情 -->
                    <div class="fixedCharges flex-col flex-left flex-y-center">
                        <div class="title flex-col flex-left flex-y-center">
                            <p>房源详情</p>
                        </div>
                        <div class="content flex-row flex-left flex-y-center">
                            <div v-html="item.content"></div>
                        </div>
                    </div>                    
                </div>
                <!-- 咨询预约签约 -->
                <div class="consultationOrderSign flex-row flex-x-center flex-y-center">
                    <!-- <div class="consultation flex-row flex-x-center flex-y-center">
                  <router-link :to="{path:''}" class="flex-row flex-x-center flex-y-center">
                      <p>在线咨询</p>
                  </router-link>
              </div> -->
                    <div class="order flex-row flex-x-center flex-y-center">
                        <a @click="move()" class="flex-row flex-x-center flex-y-center">
                            <p>预约看房</p>
                        </a>
                    </div>
                    <div class="sign flex-row flex-x-center flex-y-center">
                        <a class="flex-row flex-x-center flex-y-center" @click="sign()">
                            <p>进入签约</p>
                        </a>
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
let self;
import BScroll from "better-scroll";
export default {
  name: "roomDetail",
  data() {
    return {
      roomDatails: [],
      roomId: "",
      roomnum: "",
      userPersonId: "",      
    };
  },
  created() {
    self = this;
    var storage = window.localStorage;
    self.userPersonId = storage.getItem("userPersonId");
    // console.log(self.userPersonId);
    self.loadData();
  },
  methods: {
    loadData() {
      let self = this;
      self.$axios
        .get("/pms/room_api/detail?id=" + this.$route.query.id)
        .then(function(response) {
          self.roomDatails = response.data[0];
          self.roomId = response.data[0].room.id;
          self.roomnum = response.data[0].room.roomnum;
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
    getTime(item) {
      var da = new Date(item);
      var year = da.getFullYear();
      var month = da.getMonth() + 1;
      var date = da.getDate();
      return [year, month, date].join(".");
    },
    sign() {
      console.log(self.userPersonId);
      if (self.userPersonId) {
        self.$router.push({
          path: "/completeRentInformation",
          query: { id: self.roomId }
        });
      } else {
        self.$router.push({
          path: "/certification",
          query: { id: self.roomId }
        });
      }
    },
    move() {
      self.$router.push({
        path: "/orderShowings",
        query: { roomId: self.roomId, roomnum: self.roomnum }
      });
    }
  }
};
</script>