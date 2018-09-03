<template>
  <div class="app-header">
    <el-header >
      <div style="float: left;">
        <i class="el-icon-menu"></i>
        <span>Sujor管理后台</span>
      </div>
      <el-dropdown style="float: right; text-align: right; cursor: pointer;">
        <span class="el-dropdown-link">
          {{userInfo.username}}
          <i class="el-icon-arrow-down el-icon--right" style="margin-right: 15px"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item class="el-icon-third-geren">个人中心</el-dropdown-item>
          <el-dropdown-item class="el-icon-third-suoding" @click.native="signOut()">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="clearfix"></div>
    </el-header>
  </div>
</template>

<script>
import { getCookie } from '@/utils/cookie'
export default {
  computed: {
    userInfo () {
      let username = getCookie('username')
      return { username }
    }
  },
  methods: {
    // 用户注销
    signOut () {
      this.$store.dispatch('signOut', {this: this, username: this.userInfo.username})
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../static/css/config.styl'
.app-header
  height 56px
  line-height 56px
  background-color theme-green
  color #fff
.clearfix
  clear both
  overflow hidden
</style>
