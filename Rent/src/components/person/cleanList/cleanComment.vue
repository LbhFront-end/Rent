<template>
  <div class="main flex-x-center flex-y-center flex-col">
      <!-- 保洁评论 -->
      <div class="cleanComment flex-x-center flex-y-center flex-col" v-for="item in cleanList" :key="item.id">
          <!-- 标题 -->
        <div class="title flex-col flex-left flex-y-center">
            <p>保洁明细</p>
            <p>包含本次保洁涉及的明细项目</p>
        </div>
        <!-- 房间号 -->
        <div class="HouseNumber flex-space-between flex-y-center flex-row">
            <p>房间号</p>
            <p>{{item.roomNum}}</p>
        </div>
        <!-- 保洁时间 -->
        <div class="cleanTime flex-space-between flex-y-center flex-row">
            <div class="cleanTime-txt flex-space-between flex-y-center flex-row">
                <p>保洁时间</p>           
            </div>
            <div class="cleanTime-data flex-x-center flex-y-center flex-row">
                <p>{{getTime(item.cleanTime)}}</p>                                                
            </div>
        </div>     
        <!-- 订单时间 -->
        <div class="orderTime flex-space-between flex-y-center flex-row">
            <div class="orderTime-txt flex-space-between flex-y-center flex-row">
                <p>订单时间</p>           
            </div>
            <div class="orderTime-data flex-x-center flex-y-center flex-row">
                <p>{{getTime(item.createDateTime)}}</p>                                   
            </div>
        </div>     
        <!-- 服务项目 -->
        <div class="serverItem flex-space-between flex-top flex-row">
            <div class="serverItem-txt flex-x-center flex-y-center flex-col">
                <p>服务项目</p>                   
            </div>
            <div class="serverItem-btn flex-right flex-y-center flex-col" @click="trigger()">
                <div v-if="isHide">
                    <img src="../../../../static/img/signUp-right.png" alt="" class="rr">
                </div>
                <div v-else>
                    <img src="../../../../static/img/signUp-left.png" alt="" class="ll">
                </div>  
                <div :class="{hide:isHide}">
                    <p>{{item.cleanType}}</p>                              
                </div>                                                                  
            </div>
        </div> 
        <!-- 保洁评论 -->
        <div class="cleanComments flex-left flex-y-center flex-col" v-if="sendComment(item.status)">
            <div class="cleanComments-txt flex-space-between flex-y-center flex-row">
                <p>保洁评论</p>           
            </div>
            <div class="cleanComments-btn flex-x-center flex-y-center flex-row">
               <textarea name="" id="" cols="30" rows="8" placeholder="在此处输入评论内容" v-model="cleanCommentsContent" :disabled="CommentDisable(item.status)"></textarea>       
            </div>
        </div> 
        <!-- 提交评论 -->
        <div class="submitComments flex-col flex-x-center flex-y-center" v-if="CommentBtn(item.status)">
            <p>提交评论</p>
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
let self;
export default {
  name: "cleanComment",
  data() {
    return {
      isHide: true,
      cleanCommentsContent: "",
      cleanList: "",
      comment:""
    };
  },
  created() {
    self = this;
    self.$axios
      .get("/pms/order_api/orderdetail?id=" + this.$route.query.id)
      .then(function(response) {
        self.cleanList = response.data.data[0];
        self.comment = response.data.data[0].order.evaluate;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    //隐藏显示详情
    trigger: function() {
      self.isHide = !self.isHide;
    },
    getTime(item) {
      var da = new Date(item);
      var year = da.getFullYear();
      var month = da.getMonth() + 1;
      var date = da.getDate();
      var hour = da.getHours();
      var minute = da.getMinutes();
      return [year, month, date].join(".") + " " + [hour, minute].join(":");
    },
    sendComment(item) {
      if (item == 2) {
        return true;
      } else if (item == 3) {
        self.cleanCommentsContent = self.comment;
        return true;
      } else {
        return false;
      }
    },
    CommentBtn(item) {
      if (item == 2) {
        return true;
      } else {
        return false;
      }
    },
    CommentDisable(item) {
      if (item == 3) {
        return true;
      } else {
        return false;
      }
    },
  }
};
</script>

