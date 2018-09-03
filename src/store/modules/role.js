import api from '../apis/role'
import { formatTime } from '@/utils/time'

const state = {
  role: {}, // 角色详情
  roleList: [], // 角色列表
  roleTotal: 0,
  roleAddVisible: false, // 角色添加模态框是否展示
  roleDetailVisible: false, // 角色详情模态框是否展示
  roleUpdateVisible: false, // 角色更新模态框是否展示
  roleListLoading: true // 角色列表是否加载完成
}

const getters = {
  role: state => state.role,
  roleList: state => state.roleList,
  roleTotal: state => state.roleTotal,
  roleAddVisible: state => state.roleAddVisible,
  roleDetailVisible: state => state.roleDetailVisible,
  roleUpdateVisible: state => state.roleUpdateVisible,
  roleListLoading: state => state.roleListLoading
}

const actions = {
  // 获取列表
  async getRoleList ({commit}, params) {
    let that = params.this
    let page = params.page
    let limit = params.limit
    let promise = api.getRoleList(page, limit)
    await promise.then((response) => {
      console.log(response.data)
      // 根据code码 判断返回结果
      if (response.data.code === -1) {
        // 失败处理
      } else {
        // 成功 则commit到store
        // 循环遍历 格式化时间
        let roleList = response.data.data.list
        let roleTotal = response.data.data.total
        roleList.forEach(e => {
          let createdDate = new Date(parseInt(e.created_time))
          let updatedDate = new Date(parseInt(e.updated_time))
          e.created_time = formatTime(createdDate)
          e.updated_time = formatTime(updatedDate)
        })
        commit('setRoleList', roleList)
        commit('setRoleTotal', roleTotal)
        commit('setRoleListLoading', false)
      }
    }).catch((error) => {
      console.error(error)
      that.$message({
        message: '网络异常，请稍后再试。',
        type: 'error'
      })
    })
  },

  // get role 详情
  async getRole ({commit}, params) {
    let that = params.this
    let promise = api.getRole(params.role_id)
    await promise.then((response) => {
      console.log(response.data)
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
        obj.created_time = formatTime(createdDate)
        obj.updated_time = formatTime(updatedDate)
        commit('setRole', obj)
      }
    }).catch((error) => {
      console.error(error)
      that.$message({
        message: '网络异常，请稍后再试。',
        type: 'error'
      })
    })
  },

  // 添加 role
  async addRole ({commit}, params) {
    let that = params.this
    let promise = api.addRole(params.role)
    await promise.then((response) => {
      console.log(response.data)
      // 根据code码 判断返回结果
      if (response.data.code === -1) {
        that.$message({
          message: response.data.msg,
          type: 'warning'
        })
      } else {
        // 成功则关闭窗口
        commit('setRoleAddVisible', false)
        that.$message({
          message: response.data.msg,
          type: 'success'
        })
        // 告诉父组件刷新页面
        that.$emit('handleReload')
      }
    }).catch((error) => {
      console.error(error)
      that.$message({
        message: '网络异常，请稍后再试。',
        type: 'error'
      })
    })
  },

  // 更新 role
  async updateRole ({commit}, params) {
    let that = params.this
    let promise = api.updateRole(params.role)
    await promise.then((response) => {
      console.log(response.data)
      // 根据code码 判断返回结果
      if (response.data.code === -1) {
        that.$message({
          message: response.data.msg,
          type: 'warning'
        })
      } else {
        // 成功则关闭窗口
        commit('setRoleUpdateVisible', false)
        that.$message({
          message: response.data.msg,
          type: 'success'
        })
        // 告诉父组件刷新页面
        that.$emit('handleReload')
      }
    }).catch((error) => {
      console.error(error)
      that.$message({
        message: '网络异常，请稍后再试。',
        type: 'error'
      })
    })
  },

  // 删除 role
  async deleteRole ({commit}, params) {
    let that = params.this
    let roleId = params.role_id
    let promise = api.deleteRole(roleId)
    await promise.then((response) => {
      console.log(response.data)
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
  setRole (state, role) {
    state.role = role
  },
  setRoleList (state, roleList) {
    state.roleList = roleList
  },
  setRoleTotal (state, roleTotal) {
    state.roleTotal = roleTotal
  },
  setRoleAddVisible (state, roleAddVisible) {
    state.roleAddVisible = roleAddVisible
  },
  setRoleDetailVisible (state, roleDetailVisible) {
    state.roleDetailVisible = roleDetailVisible
  },
  setRoleUpdateVisible (state, roleUpdateVisible) {
    state.roleUpdateVisible = roleUpdateVisible
  },
  setRoleListLoading (state, roleListLoading) {
    state.roleListLoading = roleListLoading
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
