<template>
  <div id="testPageId">
      <p> getName() : {{ store.getName() }}</p>  

  <p> function with params : {{ store.getFullName({lastname: 'rodriguez', separator: '//'}) }}</p>  

    <q-btn  @click="add()">
      +1 
    </q-btn>
    <q-btn  @click="store.reset()">
      reset 
    </q-btn>
    {{ store.state }}
    {{ store.getCount() }}
    {{ store.add(2) }}

  </div>
</template>
<script>

import store from './store';
import { reactive, ref , watch} from 'vue'


export default {
  props: {},
  components: { },
  watch: {},
  mounted() {
    this.$nextTick(function () {
    })
  },
  data() {
    return {
      loading: false,
      data: [], 
      store
    }
  },
  computed: {},
  methods: {
    init() {},
    add(){
      store.count = store.count + 1      
      store.user.name = 'siuu'

    }
  }
}
</script>
<style lang="stylus">
</style>

