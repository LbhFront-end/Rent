<template>
  <div class="main">
      <div class="maintenanceMRList">
          <div class="maintenanceMRList-top flex-row flex-x-center flex-y-center">
              <select>
                  <option value="0">选择楼</option>
              </select>
              <select>
                  <option value="0">选择层</option>
              </select>
          </div>
          <div class="maintenanceMRList-body flex-col flex-x-center flex-y-center">
              <div v-for="item in roomList" :key="item.id">
                <router-link :to="'/maintenanceMRListDetails?id='+item.roomNum" class="flex-row flex-space-between flex-y-center" :class="{had:item.status}">
                    <p>{{item.roomNum}}</p>
                    <p>{{item.status == 0?"未抄表":"已抄表"}}</p>
                </router-link>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  name: "maintenanceMRList",
  data() {
    return {
      roomList: []
    };
  },
  created() {
    let self = this;
    self.loadData();
  },
  methods: {
    loadData() {
      let self = this;
      self.$axios
        .get("/pms/api_write/orderlist")
        .then(function(response) {
          self.roomList = response.data.data[0].tomList;
          console.log(self.roomList);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
