import api from '../apis/user'
import { formatTime } from '@/utils/time'

const state = {
  user: {
    roles: []
  }, // 用户详情
  userList: [], // 用户列表
  userTotal: 0, // 用户总数
  userDetailVisible: false,
  userUpdateVisible: false,
  userListLoading: true
}

const getters = {
  user: state => state.user,
  userList: state => state.userList,
  userTotal: state => state.userTotal,
  userDetailVisible: state => state.userDetailVisible,
  userUpdateVisible: state => state.userUpdateVisible,
  userListLoading: state => state.userListLoading
}

const actions = {
  // 获取用户列表
  async getUserList ({commit}, params) {
    let that = params.this
    let page = params.page
    let limit = params.limit
    let promise = api.getUserList(page, limit)
    await promise.then((response) => {
      console.log(response.data)
      // 根据code码 判断返回结果
      if (response.data.code === -1) {
        // 失败处理
      } else {
        // 成功 则commit到store
        // 循环遍历 格式化时间
        let userList = response.data.data.list
        let userTotal = response.data.data.total
        userList.forEach(e => {
          let createdDate = new Date(parseInt(e.created_time))
          let updatedDate = new Date(parseInt(e.updated_time))
          let signedDate = new Date(parseInt(e.signed_time))
          e.created_time = formatTime(createdDate)
          e.updated_time = formatTime(updatedDate)
          e.signed_time = formatTime(signedDate)
        })
        commit('setUserList', userList)
        commit('setUserTotal', userTotal)
        commit('setUserListLoading', false)
      }
    }).catch((error) => {
      console.log(error)
      that.$message({
        message: '网络异常，请稍后再试。',
        type: 'error'
      })
    })
  },
  // 获取用户详情
  async getUser ({commit}, params) {
    let that = params.this
    let promise = api.getUser(params.user_id)
    await promise.then((response) => {
      // 根据code码 判断返回结果
      if (response.data.code === -1) {
        that.$message({
          message: response.data.msg,
          type: 'warning'
        })
      } else {
        // 成功
        that.$message({
          message: response.data.msg,
          type: 'success'
        })
        let obj = response.data.data
        let createdDate = new Date(parseInt(obj.created_time))
        let updatedDate = new Date(parseInt(obj.updated_time))
        let signedDate = new Date(parseInt(obj.signed_time))
        obj.created_time = formatTime(createdDate)
        obj.updated_time = formatTime(updatedDate)
        obj.signed_time = formatTime(signedDate)
        commit('setUser', obj)
      }
    }).catch((error) => {
      console.log(error)
      that.$message({
        message: '网络异常，请稍后再试。',
        type: 'error'
      })
    })
  },
  // 更新用户
  async updateUser ({commit}, params) {
    let that = params.this
    let promise = api.updateUser(params.user)
    await promise.then((response) => {
      // 根据code码 判断返回结果
      if (response.data.code === -1) {
        that.$message({
          message: response.data.msg,
          type: 'warning'
        })
      } else {
        // 成功则关闭窗口
        commit('setUserUpdateVisible', false)
        that.$message({
          message: response.data.msg,
          type: 'success'
        })
        // 告诉父组件刷新页面
        that.$emit('handleReload')
      }
    })
  }
}

const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setUserList (state, userList) {
    state.userList = userList
  },
  setUserTotal (state, userTotal) {
    state.userTotal = userTotal
  },
  setUserDetailVisible (state, userDetailVisible) {
    state.userDetailVisible = userDetailVisible
  },
  setUserUpdateVisible (state, userUpdateVisible) {
    state.userUpdateVisible = userUpdateVisible
  },
  setUserListLoading (state, userListLoading) {
    state.userListLoading = userListLoading
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
