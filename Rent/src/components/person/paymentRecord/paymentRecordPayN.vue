<template>
  <div class="main flex-x-center flex-y-center flex-col">
      <!-- 未支付-付款明细 -->
      <div class="paymentRecordPayN flex-x-center flex-y-center flex-col" v-for="item in payList" :key="item">
          <!-- 标题 -->
        <div class="title flex-col flex-left flex-y-center">
            <p>付款明细</p>
            <p>包含本月需要缴纳的费用明细项目</p>
        </div>
        <!-- 押金 -->
        <div class="nextMRent deposit flex-space-between flex-y-center flex-row" v-if="item.deposit">
            <p>押金</p>
            <p>￥{{item.deposit}}</p>
        </div>
        <!-- 下月房租 -->
        <div class="nextMRent flex-space-between flex-y-center flex-row">
            <p>下月房租</p>
            <p>￥{{item.rent}}</p>
        </div>
        <!-- 本月电费 -->
        <div class="currentMElectricityFees flex-left flex-y-center flex-col">
            <div class="Fees flex-space-between flex-y-center flex-row">
                <p>本月电费</p>
                <p>￥{{item.electricity}}</p>              
            </div>
            <div class="degrees flex-x-center flex-y-center flex-row">
                <p>电表读数：<span>{{item.eleusage}}</span> 度</p>                  
            </div>
        </div>
        <!-- 本月水费 -->
        <div class="currentMWaterFees flex-left flex-y-center flex-col">
            <div class="Fees flex-space-between flex-y-center flex-row">
                <p>本月水费</p>
                <p>￥{{item.water}}</p>              
            </div>
            <div class="degrees flex-x-center flex-y-center flex-row">
                <p>电表读数：<span>{{item.waterusage}}</span> 方</p>                  
            </div>
        </div>
        <!-- 本月管理费 -->
        <div class="currentManagementExpense flex-space-between flex-y-center flex-row">
            <p>本月管理费</p>
            <p>￥{{item.management}}</p>
        </div>
        <!-- 总计费用 -->
        <div class="count flex-row flex-right flex-top">
            <p class="flex-row flex-x-center flex-y-center">0RMB</p>
            <!-- <p class="flex-row flex-x-center flex-y-center">{{item.deposit+item.rent+item.water+item.electricity+15}}RMB</p> -->
            <p class="flex-row flex-x-center flex-y-center">￥<span>{{item.totalfee}}</span></p>
        </div>
        <!-- 确认支付 -->
        <div class="ConfirePayment flex-col flex-x-center flex-y-center" @click="pay(item.id)">
        <p>提交支付</p>
        </div>        
      </div>
  </div>
</template>
<style scoped>
.main {
  background: #fff;
}
.deposit {
  margin-bottom: 20px;
}
</style>
<script>
let self;
export default {
  name: "paymentRecordPayN",
  data() {
    return {
      payList: []
    };
  },
  created() {
    self = this;
    this.$axios
      .get("/pms/room_api/getCharge?id=" + this.$route.query.id)
      .then(function(response) {
        self.payList = response.data.data[0];
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    pay(id) {
        window.open("http://testpms.hysycity.com/pms/wechatpay/toPay/" + id);
    }
  }
};
</script>

