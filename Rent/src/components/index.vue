<template>
  <div class="main flex-x-center flex-y-center flex-col">
    <div class="index flex-x-center flex-y-center flex-col">
      <!-- 头部 -->
      <div class="head flex-x-left flex-y-center flex-col">
        <div class="logo flex-x-left flex-y-center flex-col">
        </div>
        <div class="welcome flex-x-left flex-y-center flex-col">
          <p class="flex-x-left flex-y-center flex-col">欢迎来到友利社区</p>
        </div>
      </div>
      <!-- 登录按钮 -->
      <div class="login-btn flex-x-center flex-y-center flex-col">
        <div class="wechat flex-x-center flex-y-center flex-col">
          <router-link :to="{path:''}" class="flex-x-center flex-y-center flex-col">
            <p>使用微信账号登录</p>
          </router-link>
        </div>
        <div class="setAccount flex-x-center flex-y-center flex-col">
          <router-link :to="{path:'/usePhoneLogin'}" class="flex-x-center flex-y-center flex-col" >
            <p>使用手机号登录</p>
          </router-link>
        </div>
        <div class="more flex-x-center flex-y-center flex-col">
          <router-link :to="{path:'/login'}" class="flex-x-left flex-y-center flex-col" >
            <p>密码登录</p>
          </router-link>
        </div>
      </div>
      <!-- 协议说明-->
      <div class="protocol flex-x-center flex-y-center flex-col">
        <p>轻点“使用微信账号登录”、“使用手机号登录”或者“密码登录”即代表我同意友利社区的服务条款、支付服务条款、隐私政策及非歧视政策。如果我是中国居民，我将与e租宝签约，我的信息将按照中国的相关法律法规储存和处理，包括隐私及信息披露条款。
          <router-link :to="{path:''}" class="flex-x-center flex-y-center flex-col" >
            <span>了解更多</span>
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

 