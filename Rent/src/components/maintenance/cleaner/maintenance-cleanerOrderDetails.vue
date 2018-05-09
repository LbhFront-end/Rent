<template>
  <div class="main flex-col flex-x-center flex-y-center">
    <div class="oddServerItems flex-col flex-x-center flex-y-center" :class="{hideorder:hideorder}">
      <div class="items flex-col flex-top flex-y-center">
        <!-- 标题 -->
        <div class="title flex-col flex-left flex-y-center">
          <p>选择服务项目</p>
        </div>
        <!-- 关键字 -->
        <div class="keywords flex-col flex-x-center flex-y-center">
          <input type="text" v-model="keyword" placeholder="输入关键字">
        </div>
        <!-- 服务项目 -->
        <div class="severItemList">
          <div class="severItemDetails" v-for="(item,index) in severItemDetails" :key="item.id" @click="choice($event,index)">
            <p>{{item.typename}}</p>
          </div>
        </div>
        <!-- 已选项目 -->
        <div class="serverItemChoiceList">
          <div class="serverItemChoiceList-title flex-col flex-left flex-y-center">
            <p>已选项目</p>
          </div>
          <div class="serverItemChoiceListItems">
            <div class="serverItemChoiceListItem" v-for="(severItemChoiceItem,index) in severItemChoice" :key="severItemChoiceItem.id" @click="deleteItem(index)">
              <p>{{severItemChoiceItem.typename}}<span>x</span></p>
            </div>
          </div>
        </div>
        <!-- 其他收费 -->
        <div class="otherFee">
          <div class="otherFee-title flex-col flex-left flex-y-center">
            <p>其他收费</p>
          </div>
          <div class="otherFee-input">
            <input type="text" class="otherFeeTxt" v-model="otherFeeTxt"><span class="line"></span><input class="otherFeeMoney" type="text" v-model="otherFeeMoney" > <span class="yuan">元</span>  
          </div>
        </div>
        <!-- 确认 -->
        <div class="comfireBtn" @click="sumbitServerList()">
          <p>确 认</p>
        </div>
      </div>
    </div>
    <div class="maintenance-cleanerOrderDetails flex-col flex-x-center flex-y-center" v-for="item in cleanDetails" :key="item.id">
      <div class="title flex-col flex-left flex-y-center">
        <p>{{type}}明细</p>
        <p>包含本次{{type}}涉及的明细项目</p>
      </div>
      <!-- 房间号 -->
      <div class="HouseNumber flex-space-between flex-y-center flex-row">
        <p>房间号</p>
        <p>{{item.roomNum}}</p>
      </div>
      <!-- 保洁时间 -->
      <div class="cleanTime flex-space-between flex-y-center flex-row">
        <div class="cleanTime-txt flex-space-between flex-y-center flex-row">
          <p>{{type}}时间</p>
        </div>
        <div class="cleanTime-data flex-x-center flex-y-center flex-row">
          <p>{{getTime1(item.cleanTime,item.repairTime)}}</p>
          <p>{{getTime2(item.cleanTime,item.repairTime)}}</p>
        </div>
      </div>
      <!-- 订单时间 -->
      <div class="orderTime flex-space-between flex-y-center flex-row">
        <div class="orderTime-txt flex-space-between flex-y-center flex-row">
          <p>订单时间</p>
        </div>
        <div class="orderTime-data flex-x-center flex-y-center flex-row">
          <p>{{getTime1(item.createDateTime,item.repairTime)}}</p>
          <p>{{getTime2(item.createDateTime,item.repairTime)}}</p>
        </div>
      </div>
      <!-- 保洁描述 -->
      <div class="cleanDescription flex-space-between flex-y-center flex-col">
        <div class="cleanDescription-txt flex-space-between flex-y-center flex-row">
          <p>用户提交服务备注</p>
        </div>
        <div class="cleanDescription-textarea flex-left flex-y-center flex-row">
          <textarea name="" id="" cols="30" rows="5" v-model="description" placeholder="简单描述需要的服务"></textarea>
        </div>
      </div>
      <!-- 服务项目 -->
      <div class="serverItemOutside flex-col flex-left flex-y-center">
        <div class="serverItem flex-space-between flex-top flex-row">
          <div class="serverItem-txt flex-x-center flex-y-center flex-col">
            <p>实际服务项目</p>
          </div>
          <div class="serverItem-btn flex-right flex-y-center flex-col">
            <div v-if="isHide">
              <img src="../../../../static/img/signUp-right.png" alt="" class="rr" @click="trigger()">
            </div>
            <div v-else>
              <img src="../../../../static/img/signUp-left.png" alt="" class="ll" @click="trigger()">
            </div>
          </div>
        </div>
        <div :class="{hide:isHide}" class="item-txt flex-col flex-right flex-y-center">
          <div class="txt-inside flex-row flex-space-between flex-y-center" v-for="inFactListDetails in inFactList" :key="inFactListDetails.id">
            <p>{{inFactListDetails.typename}}</p><p>{{inFactListDetails.fee}}元</p>
          </div>
          <div class="addServer flex-col flex-right flex-y-center" @click="showServerList">
            <p>+添加服务项目</p>
          </div>
          <div class="total flex-row flex-top flex-y-center">
            <p class="flex-row flex-top flex-y-center">RMB<span>￥{{totalFee}}</span></p>
          </div>
        </div>
      </div>
      <!-- 保洁图片 -->
      <div class="flex-col flex-x-col flex-y-center" v-if="item.status == 1">
        <div class="smalltitle flex-col flex-left flex-y-center">
          <p>{{type}}现场图片上传</p>
        </div>
        <div class="cleanImgs">
          <div class="cleanImg1">
            <div class="picture flex-left flex-y-center flex-col">
              <label for="file" v-if="statu || images.length < 3">点我添加图片(三张)</label>
              <input type="file" id="file" multiple="multiple" accept="image/*;" @change="onFileChange($event)" />
            </div>
          </div>
          <div v-if="images.length >0" class="flex-x-center flex-y-center flex-col">
            <div class="buttonGroup flex-left flex-y-center flex-row">
              <button @click="removeImage" class="flex-x-center flex-y-center flex-row">移除全部图片</button>
            </div>
            <ul class="flex-x-center flex-y-center flex-row" style="witdh:9rem">
              <li v-for="(image,index) in images" :key="index" style="position: relative;">
                <img :src="image" @click='delImage(image)' style="margin:0 5px;" />
                <a href="#" style="position: absolute;top:0;right:5px;width:15px;height:15px;border-radius:15px;background:#00a699;color:#fff;"
                  @click='delImage(image)'>x</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 提交评论 -->
      <div>
        <div v-if="point">
          <div class="submitComments flex-col flex-x-center flex-y-center" @click="pickOrder()" v-if="item.status == 0">
            <p>接 单</p>
          </div>
          <div class="submitComments flex-col flex-x-center flex-y-center" @click="submitImgs()" v-else-if="item.status == 1">
            <p>提交完成</p>
          </div>
          <div class="submitComments flex-col flex-x-center flex-y-center" @click="back()" v-else>
            <p>返 回</p>
          </div>
        </div>
        <div v-else>
          <div class="submitComments flex-col flex-x-center flex-y-center" @click="pickRepairOrder()" v-if="item.status == 0">
            <p>接 单</p>
          </div>
          <div class="submitComments flex-col flex-x-center flex-y-center" @click="submitRepairImgs()" v-else-if="item.status == 1">
            <p>提交完成</p>
          </div>
          <div class="submitComments flex-col flex-x-center flex-y-center" @click="back()" v-else>
            <p>返 回</p>
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

.hide {
  display: none;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
<script>
import { Toast } from "mint-ui";
let self;
export default {
  name: "cleanerOrderDetails",
  data() {
    return {
      //具体服务项目列表
      severItemDetails: [],
      //已选服务项目列表
      severItemChoice: [],
      nowIndex: "",
      otherFeeTxt: "",
      otherFeeMoney: "",
      keyword: "",
      statu: true,
      isHide: true,
      images: [],
      cleanDetails: [],
      orderId: "",
      userId: "",
      base64Array: "",
      type: "",
      description: "",
      point: true,
      hideorder: true,
      inFactList: [],
      totalFee: 0
    };
  },
  created() {
    self = this;
    self.loadData();
    self.getServerList();
  },
  methods: {
    showServerList() {
      self.hideorder = false;
    },
    //post提交服务详情
    sumbitServerList() {
      self.hideorder = true;
      if (self.otherFeeTxt && self.otherFeeMoney) {
        self.severItemChoice.push({
          typename: self.otherFeeTxt,
          fee: self.otherFeeMoney
        });
        self.otherFeeTxt = "";
        self.otherFeeMoney = "";
      }
      self.totalFee = 0;
      self.inFactList = self.severItemChoice;
      console.log(self.inFactList);
      self.getTotalFee();
    },
    //获取总金额
    getTotalFee() {
      var a = self.inFactList.length;
      for (let i = 0; i < a; i++) {
        self.totalFee =
          parseInt(self.totalFee) + parseInt(self.inFactList[i].fee);
      }
    },
    //选择服务项目
    choice(event, index) {
      var a = self.severItemDetails.splice(index, 1);
      self.severItemChoice.push(a[0]);
    },
    //删除服务项目
    deleteItem(index) {
      var b = self.severItemChoice.splice(index, 1);
      self.severItemDetails.push(b[0]);
    },
    //获取服务详情项目
    getServerList() {
      self.$axios
        .get("/pms/room_api/getItems?id=" + this.$route.query.id + "&keyword")
        .then(function(response) {
          self.severItemDetails = response.data[0].items;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    loadData() {
      let self = this;
      var storage = window.localStorage;
      var userId = storage.getItem("userId");
      var userRole = storage.getItem("userRole");
      if (userRole == "保洁员") {
        self.type = "保洁";
        self.$axios
          .get(
            "/pms/api_clean/cleaner_orderdetail?orderId=" + this.$route.query.id
          )
          .then(function(response) {
            var storage = window.localStorage;
            self.userId = storage.getItem("userId");
            self.cleanDetails = response.data.data[0];
            self.orderId = response.data.data[0].clean.id;
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        self.point = false;
        self.type = "维修";
        self.$axios
          .get(
            "/pms/api_repair/repairing_detail?orderId=" + this.$route.query.id
          )
          .then(function(response) {
            var storage = window.localStorage;
            self.userId = storage.getItem("userId");
            self.cleanDetails = response.data.data[0];
            self.orderId = response.data.data[0].repair.id;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    getTime1(a, b) {
      if (a) {
        var da = new Date(a);
        var year = da.getFullYear();
        var month = da.getMonth() + 1;
        var date = da.getDate();
        return [year, month, date].join(".");
      } else {
        var da = new Date(b);
        var year = da.getFullYear();
        var month = da.getMonth() + 1;
        var date = da.getDate();
        return [year, month, date].join(".");
      }
    },
    getTime2(a, b) {
      if (a) {
        var da = new Date(a);
        var hour = da.getHours();
        var minute = da.getMinutes();
        return [hour, minute].join(":");
      } else {
        var da = new Date(b);
        var hour = da.getHours();
        var minute = da.getMinutes();
        return [hour, minute].join(":");
      }
    },
    //隐藏显示详情
    trigger: function() {
      self.isHide = !self.isHide;
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      self.createImage(files);

      var file = e.target.files[0];
      var r = new FileReader();
      r.onload = function(e) {
        self.base64Array = e.target.result + "&";
        console.log(self.base64Array);
      };
      r.readAsDataURL(file);
    },
    createImage(file) {
      if (typeof FileReader === "undefined") {
        alert("您的浏览器不支持图片上传，请升级您的浏览器");
        return false;
      }
      var image = new Image();
      var leng = file.length;
      if (leng > 3) {
        self.$message.error("只上传三张图片！");
        return false;
      }
      for (var i = 0; i < leng; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(file[i]);
        reader.onload = function(e) {
          self.images.push(e.target.result);
        };
      }
      self.statu = false;
      //   console.log(self.images);
    },
    delImage: function(index) {
      self.images.shift(index);
    },
    removeImage: function(e) {
      self.images = [];
      self.statu = true;
    },
    //维修上传图片
    submitRepairImgs() {
      let self = this;
      self
        .$axios({
          url: "/pms/api_repair/finish_order",
          method: "post",
          data: {
            userId: self.userId,
            orderId: self.orderId,
            items: self.inFactList,
            total: self.totalFee,
            base64: self.base64Array
          }
          // transformRequest: [
          //   function(data) {
          //     let ret = "";
          //     for (let it in data) {
          //       ret +=
          //         encodeURIComponent(it) +
          //         "=" +
          //         encodeURIComponent(data[it]) +
          //         "&";
          //     }
          //     return ret;
          //   }
          // ]
        })
        .then(function(response) {
          Toast({
            className: "successMessage",
            message: "提交成功",
            iconClass: "icon icon-success",
            duration: 2000
          });
          // console.log(response);
          self.$router.push("/maintenanceCleanerOrder");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //上传图片
    submitImgs() {
      let self = this;
      self
        .$axios({
          url: "/pms/api_clean/finish_order",
          method: "post",
          data: {
            userId: self.userId,
            orderId: self.orderId,
            base64: self.base64Array
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
          self.$router.push("/maintenanceCleanerOrder");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //维修接单
    pickRepairOrder() {
      let self = this;
      self
        .$axios({
          url: "/pms/api_repair/sure_order",
          method: "post",
          data: {
            userId: self.userId,
            orderId: self.orderId
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
            message: "接单成功",
            iconClass: "icon icon-success",
            duration: 2000
          });
          // console.log(response);
          self.$router.push("/maintenanceCleanerOrder");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //接单
    pickOrder() {
      let self = this;
      self
        .$axios({
          url: "/pms/api_clean/sure_order",
          method: "post",
          data: {
            userId: self.userId,
            orderId: self.orderId
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
            message: "接单成功",
            iconClass: "icon icon-success",
            duration: 2000
          });
          // console.log(response);
          self.$router.push("/maintenanceCleanerOrder");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    back() {
      let self = this;
      self.$router.push("/maintenanceCleanerOrder");
    }
  },
  components: {
    "remote-js": {
      render(createElement) {
        return createElement("script", {
          attrs: { type: "text/javascript", src: this.src }
        });
      },
      props: {
        src: { type: String, required: true }
      }
    }
  }
};
</script>