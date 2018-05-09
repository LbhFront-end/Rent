<template>
    <div>
        <h2>{{msg}}</h2>
        <hr>
        <h3>{{$store.state.a.count}} -- {{count}}</h3>
        <p>
            <button @click="add(10)">+</button>
            <button @click="reduce(1)">-</button>
        </p>
        <p>
            <button @click="addAction">+</button>
            <button @click="reduceAction">-</button>
        </p>

        


    </div>
</template>

<script>
import store from "@/vuex/store";
import { mapState, mapMutations, mapGetters,mapActions } from "vuex";
export default {
  data() {
    return {
      msg: "Hello Vuex"
    };
  },
  store,
  // 方法1
  //   computed:{
  //     count(){
  //         return this.$store.state.count;
  //     }
  //   }
  // 方法2
  //   computed: mapState({
  //     count: state => state.count
  //   })
  // 方法3
  // computed:mapState(["count"])
  // };
  // 方法4
  //   computed:mapState({
  //     count:function(state){
  //         return state.count
  //     }
  // }),
  computed: {
    ...mapState(["count"]),
    ...mapGetters(["count"])
  },
  methods: {
    ...mapMutations(["add", "reduce"]),
    ...mapActions(["addAction", "reduceAction"])
  }
};
</script>



