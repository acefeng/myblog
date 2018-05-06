<template>
  <div id="app">
    <loading class="app_loading" v-show="getLoding"></loading>
    <router-view/>
  </div>
</template>

<script>
import loading from './components/loading/loading.vue'
import {mapGetters} from 'vuex'
export default {
  name: 'App',
  components:{
    loading
  },
  computed:mapGetters([
    'getLoding'
  ]),
}
</script>

<style>
.app_loading{
  position: fixed;
  left: 50%;
  right: 40%;
  top: 40%;
  bottom: 40%;
  z-index: 99999;
}
</style>
