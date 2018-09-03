<template>
  <div class="app-sign">
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
          @keyup.enter.native="signIn"
          clearable
          >
        </el-input>
      </div>
      <!-- confirm btn -->
      <div class="input-item">
        <el-button
          type="primary"
          @click="signIn"
          style="width: 100%"
          plain>
          确认登录
        </el-button>
      </div>
      <!-- router signup -->
      <div class="input-router">
        <router-link to="/signup">
          没有账号？前往注册>>
        </router-link>
        <router-link to="/forget/password">
          忘记密码？
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import AppSignBg from '@/components/AppSignBg'
export default {
  metaInfo: {
    title: '登录',
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
        password: ''
      }
    }
  },
  components: {
    AppSignBg
  },
  methods: {
    // validate校验并注册
    signIn: function () {
      console.log(this.user)
      if (!this.user.username || !this.user.password) {
        this.$message({
          message: '用户名和密码不能为空！',
          type: 'warning'
        })
        return
      }
      this.$store.dispatch('signIn', {this: this, user: this.user})
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
      float left
      font-size 12px
      &:nth-child(2)
        float right
</style>
