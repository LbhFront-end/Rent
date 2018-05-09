<template>
    <div class="main flex-col flex-x-center flex-y-center">
        <div class="maintenance-index flex-row flex-left flex-y-center">
            <div class="maintenanceItem flex-col flex-x-center flex-y-center" v-if="userRole =='保洁员' ">
                <router-link :to="{path:'/maintenanceCleanerOrder'}" class="cleanOrders flex-col flex-x-center flex-y-center">
                    <p class="flex-col flex-x-center flex-y-center">3</p>
                    <div class="cleanOrders-icon"></div>
                </router-link>
                <p>保洁订单</p>
            </div>
            <div class="maintenanceItem flex-col flex-x-center flex-y-center" v-if="userRole =='保洁队长' ">
                <router-link :to="{path:'/maintenanceMonitorOrder'}" class="cleanOrders flex-col flex-x-center flex-y-center">
                    <p class="flex-col flex-x-center flex-y-center">3</p>
                    <div class="cleanOrders-icon"></div>
                </router-link>
                <p>保洁订单</p>
            </div>
            <div  v-else-if="userRole =='维修员' ">
                <div class="maintenanceItem flex-col flex-x-center flex-y-center">
                    <router-link :to="{path:'/maintenanceCleanerOrder'}" class="cleanOrders flex-col flex-x-center flex-y-center">
                        <p class="flex-col flex-x-center flex-y-center">3</p>
                        <div class="setting-icon"></div>
                    </router-link>
                    <p>维修订单</p>
                </div>
                <div class="maintenanceItem flex-col flex-x-center flex-y-center">
                    <router-link :to="{path:'/maintenanceMRList'}" class="cleanOrders flex-col flex-x-center flex-y-center">
                        <p class="flex-col flex-x-center flex-y-center">3</p>
                        <div class="meterReading-icon"></div>
                    </router-link>
                    <p>抄表管理</p>
                </div>
            </div>
            <div class="maintenanceItem flex-col flex-x-center flex-y-center" v-else-if="userRole =='客服人员' ">
                <router-link :to="{path:''}" class="cleanOrders flex-col flex-x-center flex-y-center">
                    <p class="flex-col flex-x-center flex-y-center">3</p>
                    <div class="roomCheck-icon"></div>
                </router-link>
                <p>看房订单</p>
            </div>
        </div>
    </div>
</template>
<script>
let self;
export default {
  name: "maintenanceIndex",
  data() {
    return {
      userRole: ""
    };
  },
  created() {
    let self = this;
    self.loadData();
  },
  methods: {
    loadData() {
      let self = this;
      var storage = window.localStorage;
      self.userRole = storage.getItem("userRole");
      console.log(self.userRole);
    }
  }
};
</script>
