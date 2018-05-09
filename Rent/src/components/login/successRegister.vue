<template>
  <div class="main flex-x-center flex-y-center flex-col">
      <!-- 实名认证审核中 -->
      <div class="reviewing">
        <div class="title flex-x-center flex-y-center flex-col">
              <p>注册成功！</p>
          </div>
          <!-- 们将返回登录界面 -->
          <div class="return flex-x-center flex-y-center flex-col">
              <div class="smallhead">
                  <p>我们将返回登录界面</p>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
let self;
export default {
  name: "successRegister",
  created() {
    self = this;
  },
  mounted() {
    setTimeout(function() {
      self.$router.push("/login");
    }, 2000);
  }
};
</script>
