<template>
  <div class="main flex-col flex-x-center flex-y-center">
      <!-- 合同细则 -->
      <div class="signUp flex-col flex-x-center flex-y-center">
        <div class="title flex-x-center flex-y-center flex-col">
              <p>合同细则</p>
        </div>
        <!-- 正文 -->
        <div class="text flex-x-center flex-y-center flex-col">
            <p :class="{hide:isHide}" class="flex-left flex-y-center flex-col">
              甲方（出租人） 身份证号码：{{idcard1}}<br/>
              乙方（承租人） 身份证号码：{{idcard2}}<br/>
              经甲、已双方实地看房后，自愿协商达成租房合同如下：<br/>
              一、租赁地址：乙方租借甲方{{leaseAddress}}的房屋（1室1厅 1厨 1卫）租赁期为 （从{{beginTime}}至{{endTime}}）,期满后无条件搬出同时结清乙方应承担的费用，完好地交还甲方提供使用的物品，同时甲方退还居住使用押金给乙方。
              <br/>
              二、乙方在签定本合同时须提供有效证件（复印件），租费：每季度（1个月）付壹次，先付后住，乙方在承租内必须提前一个月支付第二次房租。另付押金{{deposit}}元（包括家具物品保证金）。共计{{deposit+con_money}}元<br/>
              三、乙方向甲方承诺，租赁该房屋仅作为普通住房使用。乙方在租期内，应遵守国家法律，遵守有关治安管理条例。服从社区管理，争做文明市民。<br/>
              四、甲方提供给乙方租住使用的房屋，必须保障其安全，可用，可住的原则。乙方在租期内必须承担水，电，煤，宽带，有线电视，物业管理等相关费用，不得拖欠。<br/>
              五、乙方在租期内，不得破坏房屋结构，不得转租，转让他人居住使用等，甲方发现有权收回租房，不退任何费用。<br/>
              六、租赁期间，甲方在出租期未满而停租，应赔偿乙方一个月的房租金，乙方在承租期未满而退租，应赔偿甲方一个月的房租金。甲、乙双方提前一个月通知对方协商解除合同的不作违约。不可抗拒因素不做违约。<br/>
              七、租赁期满，甲方有权收回出租房屋，乙方应如期交还。乙方如要求续租，则必须在租赁期满前一个月内通知甲方，经甲方同意后，重新签订租赁合同。<br/>
              八、乙方逾期支付应付租金，自逾期之日起乙方应每日向甲方支付100元违约金。乙方如拖欠租金达十五日以上，甲方有权终止合同，不退任何费用，若支付的违约金不足弥补甲方损失的，乙方还应负责赔偿直至达到弥补全部损失为止。<br/>
              九、根据本合同约定提前终止合同或合同期满，乙方应在收到甲方正式书面通知之日起十日内搬出全部设备、物品，但双方另有协商除外。搬迁后三日房屋里如仍有余物，如双方无约定，视为乙方主动放弃所有权，由甲方处理。<br/>
              十、甲方提供给乙方物品如下：《常用物品清单列表》 以上清单物品经双方清点交接无误。如乙方造成甲方的财务被盗。去向不明，火灾及损坏等，需照价赔偿。<br/>
              十一、租赁期间，房间内一切设备设施在使用过程中出现损坏，由乙方负责维修，如无法维修复原，由乙方照价赔偿。<br/>
              十二、在租期内甲、乙双方共同遵守本合同，任何一方擅自中途终止本合同，或任何一方违反本合同的条款，造成对方损失，必须赔偿对方有关的直接损失，直至请求法律保护。<br/>
              十三、租赁期间乙方不得从事违法活动，否则后果自负，需注意防火防盗，如有相关事故发生，一切责任由乙方自行负责。
              十四、本合同如有未尽事宜，甲、乙双方协商写明。<br/>
              十五、备注：{{remark}}。 <br/>
              十六、本合同一式贰份，甲、乙双方各执一份。本合同经双方签字之日起生效。附：水表底数：xxx电表底数：峰XX谷xx总XX附：租方内物品清单 <br/>
              《常见物品清单列表》<br/>
              <table :class="{hideTable:isHide}">
                <tr>
                  <td>序号</td> 
                  <td>物品</td>
                  <td>数量</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>洗衣机</td>
                  <td>1</td>
                </tr>
              </table>
              </p>
        </div>
        <!-- 省略与否 -->
        <div class="ellipsis flex-right flex-y-center flex-row" @click="trigger()">
            <div v-if="isHide">
                <img src="../../../static/img/signUp-right.png" alt="" class="rr">
            </div>
            <div v-else>
                <img src="../../../static/img/signUp-left.png" alt="" class="ll">
            </div>
        </div>
        <!-- 阅读合同协议 -->
        <div class="contract flex-left flex-y-center flex-row">
            <div>
                <input type="checkbox" v-model="read" id="contractRead">
            </div>
            <label for = "contractRead">我已经阅读以上合同内容，并同意合同内容</label>
        </div>
        <!-- 下一步 -->
        <div class="next flex-right flex-y-center flex-col">
        <a class="flex-x-center flex-y-center flex-col" @click="checkReady()">
            <img src="../../../static/img/sign-enter.png" alt="">
        </a>
        </div>        
      </div>
  </div>
</template>
<style scoped>
.main {
  background: #fff;
}
.hideTable {
  display: none;
}
.hide {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 13;
  overflow: hidden;
}
</style>

<script>
import { Toast } from "mint-ui";
let self;
export default {
  name: "signUp",
  data() {
    return {
      read: false,
      isHide: true,
      tenants: "",
      signName: "",
      idcard1: "",
      idcard2: "",
      tenants: "",
      tenants: "",
      beginTime: "",
      endTime: "",
      deposit: "",
      con_money: "",
      remark: "",
      leaseAddress: ""
    };
  },
  created() {
    self = this;
    self.loadData();
  },
  methods: {
    loadData() {
      self.$axios
        .get(
          "/pms/contract_api/contractview?serial=" + self.$route.query.serial
        )
        .then(function(response) {
          self.tenants = response.data.data[0].contract.tenants;
          self.signName = response.data.data[0].contract.signName;
          self.idcard1 = response.data.data[0].contract.idcard1;
          self.idcard2 = response.data.data[0].contract.idcard2;
          self.deposit = response.data.data[0].contract.deposit;
          self.leaseAddress = response.data.data[0].contract.leaseAddress;
          self.con_money = response.data.data[0].contract.con_money;
          self.remark = response.data.data[0].contract.remark;
          var a = response.data.data[0].contract.begin_rent.time;
          var b = response.data.data[0].contract.end_rent.time;
          self.getTime1(a);
          self.getTime2(b);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //隐藏显示详情
    trigger: function() {
      self.isHide = !self.isHide;
    },
    getTime1(a) {
      var da = new Date(a);
      var year = da.getFullYear();
      var year2 = da.getFullYear() + 1;
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
      self.beginTime = year + "年" + month + "月" + date + "日";
    },
    getTime2(a) {
      var da = new Date(a);
      var year = da.getFullYear();
      var year2 = da.getFullYear() + 1;
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
      self.endTime = year + "年" + month + "月" + date + "日";
    },
    //判断是否勾选跳转
    checkReady: function() {
      if (self.read) {
        self.$router.push({
          path: "/costList",
          query: { id: self.$route.query.id}
        });
      } else {
        Toast({
          className: "toast",
          message: "请认真阅读合同内容并勾选同意！",
          position: "top",
          duration: 2000
        });
      }
    }
  }
};
</script>