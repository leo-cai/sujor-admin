<template>
  <div class="app-sign">
    <!-- sign bg -->
    <app-sign-bg></app-sign-bg>
    <!-- input group -->
    <div class="input-group">
      暂未开放
      <!-- router signin -->
      <div class="input-router">
        <router-link to="/signin">
          返回登录>>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import AppSignBg from '@/components/AppSignBg'
export default {
  metaInfo: {
    title: '忘记密码',
    titleTemplate: '%s - Sujor管理后台',
    meta: [
      {name: 'keywords', content: 'Sujor管理后台'},
      {name: 'description', content: 'Sujor管理后台'}
    ]
  },
  data () {
    return {
    }
  },
  components: {
    AppSignBg
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
.input-group
  position absolute
  top 50%
  left 50%
  transform translate(-50%, -50%)
  width 300px
  .input-router
    a
      font-size 12px
</style>
