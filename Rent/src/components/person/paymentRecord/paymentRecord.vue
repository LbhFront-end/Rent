<template>
  <div class="main flex-x-center flex-y-center flex-col">
      <!-- 缴费记录 -->
      <div class="paymentRecord2 wrapper" ref="wrapper" style="position:relative;overflow:hidden;">
          <div class="content">
            <!-- 缴费记录详情 -->
            <div class="paymentRecordItem flex-x-center flex-y-center flex-col" v-for="item in payList" :key="item.id">
                <div class="paymentRecordInformation flex-space-between flex-top flex-row">
                    <div class="rentAbout flex-left flex-y-center flex-col">
                        <p>订单时间：<span>{{getTime(item.beginrent)}}</span></p>
                        <p>租约期限：<span>{{getTime(item.beginrent)}}-{{getTime(item.endrent)}}</span></p>
                    </div>
                    <div class="house flex-x-center flex-y-center flex-col">
                        <p>{{item.roomnum}}</p>
                    </div>
                </div>
                <div class="payOrNot flex-space-between flex-y-center flex-row">
                    <div class="payBtn flex-x-center flex-y-center flex-col">
                        <router-link  :to="'/paymentRecordPayY?id='+item.id" v-if="item.status" class="pay-y flex-x-center flex-y-center flex-col">
                            <p>详 情</p>
                        </router-link>
                        <router-link  :to="'/paymentRecordPayN?id='+item.id" v-else class="pay-n flex-x-center flex-y-center flex-col">
                            <p>支 付</p>
                        </router-link>                      
                    </div>
                    <div class="payMoney flex-x-center flex-y-center flex-row">
                        <p>订单金额：<span>￥{{item.totalfee}}</span></p>
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
.paymentRecord2 {
  margin-bottom: 400px;
}
</style>
<script>
let self;
  import BScroll from "better-scroll";
export default {
  name: "paymentRecord",
  data() {
    return {
      //支付与否
      isPay1: false,
      isPay2: true,
      payList: []
    };
  },
  created() {
    self = this;
    var storage = window.localStorage;
    var userId = storage.getItem("userId");
    //获取缴费相关
    this.$axios
      .get("/pms/room_api/getRooms?id=" + userId)
      .then(function(response) {
        self.payList = response.data.data[0].bill;
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
        // console.log(self.payList);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    getTime(item) {
      var da = new Date(item);
      var year = da.getFullYear();
      var month = da.getMonth() + 1;
      var date = da.getDate();
      return [year, month, date].join("");
    }
  }
};
</script>
