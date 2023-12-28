<script setup>
import store from './store';
import { reactive, ref , watch} from 'vue'

const msg = ref('Store Test')


watch(
  () => store.user.name,
  (name) => {
    msg.value = 'name has changed: ' + name
  }
)


function add(){
  store.count = store.count + 1
  store.user.name = 'juanito'  
}
</script>

<template>
  <h1>{{ msg }}</h1>  
  <p> state.count : {{ store.count }}</p>
  <p> getName() : {{ store.getName() }}</p>  
  <p> function with params : {{ store.getFullName({lastname: 'rodriguez', separator: '//'}) }}</p>  
  <button @click="add()">
    +1 
  </button>
  
</template>
