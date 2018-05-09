<template>
  <div class="main flex-col flex-x-center flex-y-center">
      <div class="footer flex-row flex-space-around flex-y-center">
          <div class="rent">
              <router-link :to="{path:'/afterLoginIndex'}" class="flex-col flex-x-center flex-y-center"  active-class="active">
                  <div class="rent-icon"></div>
                  <p class="flex-col flex-x-center flex-y-center">租房</p> 
              </router-link>
          </div>
          <div class="clean">
              <router-link :to="{path:'/cleanList'}" class="flex-col flex-x-center flex-y-center"  active-class="active">
                  <div class="clean-icon"></div>
                  <p class="flex-col flex-x-center flex-y-center">服务</p> 
              </router-link>
          </div>
          <div class="openDoor">
              <a class="flex-col flex-x-center flex-y-center" active-class="active">
                  <div class="open-outside flex-col flex-x-center flex-y-center">
                    <div class="open-icon"></div>
                  </div>
                  <p class="flex-col flex-x-center flex-y-center">开门</p> 
              </a>
          </div>
          <div class="person">
              <router-link :to="{path:'/personIndex'}" class="flex-col flex-x-center flex-y-center"  active-class="active">
                  <div class="person-icon"></div>
                  <p class="flex-col flex-x-center flex-y-center">个人</p> 
              </router-link>
          </div>
          <div class="guide">
              <router-link :to="{path:'/guide'}" class="flex-col flex-x-center flex-y-center" active-class="active">
                  <div class="guide-icon"></div>
                  <p class="flex-col flex-x-center flex-y-center">指南</p> 
              </router-link>
          </div>
      </div>
  </div>
</template>
<script>
let self;
export default {
  name: "my-footer",
  data() {
    return {
        active:false,
    };
  },
  created() {
    self = this;
  },
  methods: {
    chooseMe:function(e){
        alert(e);
        e.target.className = e.target.className +' active';
    }
  }
};
</script>
