<template>
  <div class="main flex-x-center flex-y-center flex-col">
      <!-- 意见反馈 -->
      <div class="feedback2 flex-x-center flex-y-center flex-col">
          <!-- 标题 -->
          <div class="title flex-space-between flex-y-center flex-row">
              <p>消息</p>
              <router-link :to="{path:'/messageAdd'}" class="flex-x-center flex-y-center flex-row">
                + 新增消息
              </router-link>
          </div>
          <!-- 回复 -->
          <div class="reply flex-x-center flex-y-center flex-col">
              <div class="replyItem flex-space-between flex-top flex-row">
                  <div class="replyItem-inside flex-space-between flex-top flex-row">
                    <div class="replyItem-icon flex-x-center flex-y-center flex-col">
                        <div class="message-head"></div>
                    </div>
                    <div class="replyItem-txt flex-x-center flex-y-center flex-col">
                        <div class="txt-formTime flex-space-between flex-y-center flex-row">
                            <p>来自客服的回复</p>
                            <p>3月12日</p>
                        </div>
                        <div class="txt-content flex-left flex-y-center flex-col">
                            <p>您好，您咨询的问题我们现在已经安排同事去处理。请您耐心等待哦。</p>
                        </div>
                    </div>
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