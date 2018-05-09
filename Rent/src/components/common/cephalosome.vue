<template>
  <div class="main flex-col flex-x-center flex-y-center">
      <!-- 搜索框 -->
      <div class="cephalosome flex-col flex-x-center flex-y-center">
          <div class="search flex-row flex-x-center flex-y-center">
              <div class="icon-search flex-row flex-y-center flex-x-center" @click="searchWord()">                  
              </div>
              <div class="btn-search flex-row flex-y-center flex-x-center">
                  <input type="text" v-model="search" placeholder="搜索相应楼层、大小、价位">
              </div>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  name: "cephalosome",
  data(){
      return{
          search:"",
      }
  },
  methods: {
      searchWord(){

      }
  }
};
</script>
