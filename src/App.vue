<template>
  <div id="app">
    <div class="app-top">
      <router-view name="app-header"/>
    </div>
    <div class="app-center">
      <router-view id="app-asider" name="app-asider"/>
      <router-view id="app-body" v-if="isRouterAlive" name="app-body"/>
    </div>
    <div class="app-bottom">
      <router-view name="app-footer"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style lang="stylus">
  @import '../static/css/common.styl'
  #app
    width 100%
    height 100%
    .app-top
      width 100%
    .app-center
      margin 0 auto
      display flex
      flex-direction row
      #app-asider
        width 200px
      #app-body
        flex 1
</style>
