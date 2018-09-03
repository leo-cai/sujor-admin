import api from '../apis/auth'
import {updateCookie, deleteCookie} from '../../utils/cookie'

const state = {
}

const getters = {
}

const actions = {
  // 注册
  async signUp ({commit, state}, params) {
    let that = params.this
    let promise = api.signUp(params.user)
    await promise.then((response) => {
      console.log(response.data)
      // 根据code码 判断返回结果
      if (response.data.code === -1) {
        that.$message({
          message: response.data.msg,
          type: 'warning'
        })
      } else {
        // 成功则前往登录
        that.$message({
          message: response.data.msg,
          type: 'success'
        })
        that.$router.push('/signin')
      }
    }).catch((error) => {
      console.error(error)
      that.$message({
        message: '网络异常，请稍后再试。',
        type: 'error'
      })
    })
  },

  // 登录
  async signIn ({commit, state}, params) {
    let that = params.this
    let promise = api.signIn(params.user)
    await promise.then((response) => {
      console.log(response.data)
      // 根据code码 判断返回结果
      if (response.data.code === -1) {
        that.$message({
          message: response.data.msg,
          type: 'warning'
        })
      } else {
        // 成功则前往后台首页
        that.$message({
          message: response.data.msg,
          type: 'success'
        })
        // user_id, username 和 signed_time 存入cookie
        updateCookie('user_id', response.data.data.user_id, response.data.data.expires)
        updateCookie('username', response.data.data.username, response.data.data.expires)
        updateCookie('signed_time', response.data.data.signed_time, response.data.data.expires)
        // session_token 存入cookie
        updateCookie('session_token', response.data.data.token, response.data.data.expires)
        that.$router.push('/')
      }
    }).catch((error) => {
      console.error(error)
      that.$message({
        message: '网络异常，请稍后再试。',
        type: 'error'
      })
    })
  },

  // 退出登录
  async signOut ({commit, state}, params) {
    let that = params.this
    let promise = api.signOut(params.username)
    await promise.then((response) => {
      console.log(response.data)
      // 根据code码 判断返回结果
      if (response.data.code === -1) {
        that.$message({
          message: response.data.msg,
          type: 'warning'
        })
      } else {
        that.$message({
          message: response.data.msg,
          type: 'success'
        })
        // 成功则清除cookie
        deleteCookie('user_id')
        deleteCookie('username')
        deleteCookie('signed_time')
        deleteCookie('session_token')
        that.$router.push('/signin')
      }
    }).catch((error) => {
      console.error(error)
      that.$message({
        message: '网络异常，请稍后再试。',
        type: 'error'
      })
    })
  }
}

const mutations = {
}

export default {
  state,
  getters,
  actions,
  mutations
}
