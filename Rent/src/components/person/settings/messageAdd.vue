<template>
  <div class="main flex-x-center flex-y-center flex-col">
      <!-- 新增消息 -->
      <div class="messageAdd flex-x-center flex-y-center flex-col">
        <!-- 消息内容 -->
        <div class="messageAdds flex-left flex-y-center flex-col">
            <div class="messageAdds-txt flex-space-between flex-y-center flex-row">
                <p>消息内容</p>           
            </div>
            <div class="messageAdds-btn flex-x-center flex-y-center flex-row">
               <textarea name="" id="" cols="30" rows="8" placeholder="在此处输入内容" v-model="feedbackMessage"></textarea>       
            </div>
        </div> 
        <!-- 提交 -->
        <div class="submitMessage flex-col flex-x-center flex-y-center">
            <p>提交</p>
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
export default {
  name: "messageAdd",
  data() {
    return {
      //头像
      feedbackMessage: "",
    };
  },
  created() {
    self = this;
  },
  methods: {
  }
};
</script>