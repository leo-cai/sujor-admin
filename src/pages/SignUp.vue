<template>
  <div class="sign">
    <!-- sign bg -->
    <app-sign-bg></app-sign-bg>
    <!-- input group -->
    <div class="input-group">
      <div class="input-title">
        <h3>Sujor管理后台</h3>
      </div>
      <!-- username -->
      <div class="input-item">
        <el-input
          placeholder="请输入用户名"
          v-model="user.username"
          prefix-icon="el-icon-third-geren"
          clearable
          >
        </el-input>
      </div>
      <!-- password -->
      <div class="input-item">
        <el-input
          placeholder="请输入密码"
          v-model="user.password"
          prefix-icon="el-icon-third-jiesuo"
          type="password"
          clearable
          >
        </el-input>
      </div>
      <!-- confirm password -->
      <div class="input-item">
        <el-input
          placeholder="请确认密码"
          v-model="user.repassword"
          prefix-icon="el-icon-third-jiesuo"
          type="password"
          @keyup.enter.native="signUp"
          clearable
          >
        </el-input>
      </div>
      <!-- confirm btn -->
      <div class="input-item">
        <el-button
          type="primary"
          @click="signUp"
          style="width: 100%"
          plain>
          立即注册
        </el-button>
      </div>
      <!-- router signin -->
      <div class="input-router">
        <router-link to="/signin">
          已有账号？前往登录>>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import AppSignBg from '@/components/AppSignBg'
export default {
  metaInfo: {
    title: '注册',
    titleTemplate: '%s - Sujor管理后台',
    meta: [
      {name: 'keywords', content: 'Sujor管理后台'},
      {name: 'description', content: 'Sujor管理后台'}
    ]
  },
  data () {
    return {
      user: {
        username: '',
        password: '',
        repassword: ''
      }
    }
  },
  components: {
    AppSignBg
  },
  methods: {
    // validate校验并注册
    signUp: function () {
      console.log(this.user)
      if (!this.user.username || !this.user.password || !this.user.repassword) {
        this.$message({
          message: '用户名和密码不能为空！',
          type: 'warning'
        })
        return
      } else if (this.user.password !== this.user.repassword) {
        this.$message({
          message: '两次密码不相同！',
          type: 'warning'
        })
        return
      }
      this.$store.dispatch('signUp', {this: this, user: this.user})
    }
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

  .input-item
    margin 20px 0

  .input-router
    text-align left
    a
      font-size 12px
</style>
