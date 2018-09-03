<template>
  <div class="app-index">
    <h3>Hi, {{userInfo.username}}</h3>
    <h5>您上次登录时间：{{ userInfo.signedTime | formatDate }}</h5>
    <div class="shortcut-group"></div>
  </div>
</template>

<script>
import { getCookie } from '@/utils/cookie'
import { formatTime } from '@/utils/time'
export default {
  metaInfo: {
    title: '首页',
    titleTemplate: '%s - Sujor管理后台',
    meta: [
      {name: 'keywords', content: 'Sujor'},
      {name: 'description', content: 'Sujor'}
    ]
  },
  filters: {
    formatDate (timestamp) {
      let date = new Date(parseInt(timestamp))
      return formatTime(date)
    }
  },
  computed: {
    userInfo () {
      let username = getCookie('username')
      let signedTime = getCookie('signed_time')
      return { username, signedTime }
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
.app-index
  margin 20px
</style>
