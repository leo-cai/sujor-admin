import api from '../apis/code'
import { formatTime } from '@/utils/time'

const state = {
  code: {
    user: {},
    categories: []
  }, // code详情
  codeList: [], // code列表
  codeTotal: 0,
  codeAddVisible: false, // code添加模态框是否展示
  codeDetailVisible: false, // code详情模态框是否展示
  codeUpdateVisible: false, // code更新模态框是否展示
  codeListLoading: true // code列表是否加载完成
}

const getters = {
  code: state => state.code,
  codeList: state => state.codeList,
  codeTotal: state => state.codeTotal,
  codeAddVisible: state => state.codeAddVisible,
  codeDetailVisible: state => state.codeDetailVisible,
  codeUpdateVisible: state => state.codeUpdateVisible,
  codeListLoading: state => state.codeListLoading
}

const actions = {
  // 获取列表
  async getCodeList ({commit}, params) {
    let that = params.this
    let page = params.page
    let limit = params.limit
    let promise = api.getCodeList(page, limit)
    await promise.then((response) => {
      console.log(response.data)
      // 根据code码 判断返回结果
      if (response.data.code === -1) {
        // 失败处理
      } else {
        // 成功 则commit到store
        // 循环遍历 格式化时间
        let codeList = response.data.data.list
        let codeTotal = response.data.data.total
        codeList.forEach(e => {
          let createdDate = new Date(parseInt(e.created_time))
          let updatedDate = new Date(parseInt(e.updated_time))
          let auditedDate = new Date(parseInt(e.audited_time))
          e.created_time = formatTime(createdDate)
          e.updated_time = formatTime(updatedDate)
          e.audited_time = formatTime(auditedDate)
        })
        commit('setCodeList', codeList)
        commit('setCodeTotal', codeTotal)
        commit('setCodeListLoading', false)
      }
    }).catch((error) => {
      console.error(error)
      that.$message({
        message: '网络异常，请稍后再试。',
        type: 'error'
      })
    })
  },

  // get code 详情
  async getCode ({commit}, params) {
    let that = params.this
    let promise = api.getCode(params.code_id)
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
        let auditedDate = new Date(parseInt(obj.audited_time))
        obj.created_time = formatTime(createdDate)
        obj.updated_time = formatTime(updatedDate)
        obj.audited_time = formatTime(auditedDate)
        commit('setCode', obj)
      }
    }).catch((error) => {
      console.error(error)
      that.$message({
        message: '网络异常，请稍后再试。',
        type: 'error'
      })
    })
  },

  // 添加 code
  async addCode ({commit}, params) {
    let that = params.this
    let promise = api.addCode(params.code)
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
        commit('setCodeAddVisible', false)
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

  // 更新 code
  async updateCode ({commit}, params) {
    let that = params.this
    let promise = api.updateCode(params.code)
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
        // commit('setCodeUpdateVisible', false)
        that.$message({
          message: response.data.msg,
          type: 'success'
        })
        // 告诉父组件刷新页面
        // that.$emit('handleReload')
      }
    }).catch((error) => {
      console.error(error)
      that.$message({
        message: '网络异常，请稍后再试。',
        type: 'error'
      })
    })
  },

  // 删除 code
  async deleteCode ({commit}, params) {
    let that = params.this
    let codeId = params.code_id
    let promise = api.deleteCode(codeId)
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
  setCode (state, code) {
    state.code = code
  },
  setCodeList (state, codeList) {
    state.codeList = codeList
  },
  setCodeTotal (state, codeTotal) {
    state.codeTotal = codeTotal
  },
  setCodeAddVisible (state, codeAddVisible) {
    state.codeAddVisible = codeAddVisible
  },
  setCodeDetailVisible (state, codeDetailVisible) {
    state.codeDetailVisible = codeDetailVisible
  },
  setCodeUpdateVisible (state, codeUpdateVisible) {
    state.codeUpdateVisible = codeUpdateVisible
  },
  setCodeListLoading (state, codeListLoading) {
    state.codeListLoading = codeListLoading
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
