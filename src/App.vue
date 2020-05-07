<template>
  <div id="app">
    <transition enter-active-class="animated fadeIn">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"/>
        </keep-alive>
    </transition>
    <transition enter-active-class="animated fadeIn">
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{
    reload () {
      this.$nextTick(function(){
        
      })
    }
  }
}
</script>

<style lang="scss">
@import  '../node_modules/animate.css/animate.css'
</style>
