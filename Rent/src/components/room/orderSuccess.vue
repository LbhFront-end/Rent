<template>
  <div class="main">
      <!-- 预约成功 -->
      <div class="orderSuccess flex-x-center flex-y-center flex-col">
        <div class="title flex-x-center flex-y-center flex-col">
              <p>预约成功!</p>
          </div>
          <!-- 我们将返回登录后的首页 -->
          <div class="return flex-x-center flex-y-center flex-col">
              <div class="smallhead">
                  <p>我们将返回首页</p>
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
export default {
  name: "orderSuccess",
  created() {
    self = this;
  },
  mounted() {
    setTimeout(function() {
      self.$router.push("/afterLoginIndex");
    }, 1000);
  }
};
</script>
