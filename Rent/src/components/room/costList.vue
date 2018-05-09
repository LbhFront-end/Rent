<template>
  <div class="main">
      <!-- 费用清单 -->
      <div class="costList flex-col flex-x-center flex-y-center">
          <!-- 标题 -->
          <div class="title flex-x-center flex-y-center flex-col">
              <p>费用清单</p>
          </div> 
          <!-- 首租押金+下月房租 -->
          <div class="rentDepositNextMonth flex-col flex-x-center flex-y-center">
            <div class="rentDeposit flex-space-between flex-row flex-y-center">               
                <p class="flex-col flex-x-center flex-y-center">首租押金：</p><p class="flex-row flex-x-center flex-y-center">￥<span>{{deposit}}</span></p>               
            </div>  
            <div class="NextMonth flex-space-between flex-row flex-y-center">               
                <p>首月房租：</p><p>￥<span>{{rent}}</span></p>               
            </div>  
            <div class="NextMonth flex-space-between flex-row flex-y-center">               
                <p>管理费：</p><p>￥<span>{{managment}}</span></p>               
            </div>  
          </div>   
          <!-- 总计费用 -->
          <div class="count flex-row flex-right flex-top">
              <p class="flex-row flex-x-center flex-y-center">RMB</p>
              <p class="flex-row flex-x-center flex-y-center">￥<span>{{total}}</span></p>
          </div>
          <!-- 确认支付 -->
          <div class="ConfirePayment flex-col flex-x-center flex-y-center" @click="checkReady()">
            <p>确认支付</p>
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
let self;
export default {
  name: "costList",
  data() {
    return {
      rent:"",
      deposit:"",
      managment:"",
      total:"",
    };
  },
  created() {
    self = this;
    self.loadData();
  },
  methods: {
    loadData() {
      self.$axios
        .get("/pms/contract_api/firstbill?billId=" + self.$route.query.id)
        .then(function(response) {
          self.rent = response.data.data[0].rent;
          self.deposit = response.data.data[0].deposit;
          self.managment = response.data.data[0].managment;
          self.total = response.data.data[0].total;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //调用支付接口
    checkReady() {
      window.open(
        "http://testpms.hysycity.com/pms/wechatpay/toPay/" +
          this.$route.query.id
      );
    }
  }
};
</script>
