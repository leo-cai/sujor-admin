import api from '../apis/permission'
import { formatTime } from '@/utils/time'

const state = {
  permission: {}, // 权限详情
  permissionList: [], // 权限列表
  permissionTotal: 0,
  permissionAddVisible: false, // 权限添加模态框是否展示
  permissionDetailVisible: false, // 权限详情模态框是否展示
  permissionUpdateVisible: false, // 权限更新模态框是否展示
  permissionListLoading: true // 权限列表是否加载完成
}

const getters = {
  permission: state => state.permission,
  permissionList: state => state.permissionList,
  permissionTotal: state => state.permissionTotal,
  permissionAddVisible: state => state.permissionAddVisible,
  permissionDetailVisible: state => state.permissionDetailVisible,
  permissionUpdateVisible: state => state.permissionUpdateVisible,
  permissionListLoading: state => state.permissionListLoading
}

const actions = {
  // 获取列表
  async getPermissionList ({commit}, params) {
    let that = params.this
    let page = params.page
    let limit = params.limit
    let promise = api.getPermissionList(page, limit)
    await promise.then((response) => {
      console.log(response.data)
      // 根据code码 判断返回结果
      if (response.data.code === -1) {
        // 失败处理
      } else {
        // 成功 则commit到store
        // 循环遍历 格式化时间
        let permissionList = response.data.data.list
        let permissionTotal = response.data.data.total
        permissionList.forEach(e => {
          let createdDate = new Date(parseInt(e.created_time))
          let updatedDate = new Date(parseInt(e.updated_time))
          e.created_time = formatTime(createdDate)
          e.updated_time = formatTime(updatedDate)
        })
        commit('setPermissionList', permissionList)
        commit('setPermissionTotal', permissionTotal)
        commit('setPermissionListLoading', false)
      }
    }).catch((error) => {
      console.error(error)
      that.$message({
        message: '网络异常，请稍后再试。',
        type: 'error'
      })
    })
  },

  // get permission 详情
  async getPermission ({commit}, params) {
    let that = params.this
    let promise = api.getPermission(params.permission_id)
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
        commit('setPermission', obj)
      }
    }).catch((error) => {
      console.error(error)
      that.$message({
        message: '网络异常，请稍后再试。',
        type: 'error'
      })
    })
  },

  // 添加 permission
  async addPermission ({commit}, params) {
    let that = params.this
    let promise = api.addPermission(params.permission)
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
        commit('setPermissionAddVisible', false)
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

  // 更新 permission
  async updatePermission ({commit}, params) {
    let that = params.this
    let promise = api.updatePermission(params.permission)
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
        commit('setPermissionUpdateVisible', false)
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

  // 删除 permission
  async deletePermission ({commit}, params) {
    let that = params.this
    let permissionId = params.permission_id
    let promise = api.deletePermission(permissionId)
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
  setPermission (state, permission) {
    state.permission = permission
  },
  setPermissionList (state, permissionList) {
    state.permissionList = permissionList
  },
  setPermissionTotal (state, permissionTotal) {
    state.permissionTotal = permissionTotal
  },
  setPermissionAddVisible (state, permissionAddVisible) {
    state.permissionAddVisible = permissionAddVisible
  },
  setPermissionDetailVisible (state, permissionDetailVisible) {
    state.permissionDetailVisible = permissionDetailVisible
  },
  setPermissionUpdateVisible (state, permissionUpdateVisible) {
    state.permissionUpdateVisible = permissionUpdateVisible
  },
  setPermissionListLoading (state, permissionListLoading) {
    state.permissionListLoading = permissionListLoading
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
