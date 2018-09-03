import api from '../apis/codeCategory'
import { formatTime } from '@/utils/time'

const state = {
  codeCategory: {}, // code分类列表
  codeCategoryList: [], // code分类列表
  codeCategoryTotal: 0, // code分类总数
  codeCategoryAddVisible: false, // code分类添加模态框是否展示
  codeCategoryDetailVisible: false, // code分类详情模态框是否展示
  codeCategoryUpdateVisible: false, // code分类更新模态框是否展示
  codeCategoryListLoading: true // code分类列表是否加载完成
}

const getters = {
  codeCategory: state => state.codeCategory,
  codeCategoryList: state => state.codeCategoryList,
  codeCategoryTotal: state => state.codeCategoryTotal,
  codeCategoryAddVisible: state => state.codeCategoryAddVisible,
  codeCategoryDetailVisible: state => state.codeCategoryDetailVisible,
  codeCategoryUpdateVisible: state => state.codeCategoryUpdateVisible,
  codeCategoryListLoading: state => state.codeCategoryListLoading
}

const actions = {
  // 获取列表
  async getCodeCategoryList ({commit}, params) {
    let that = params.this
    let page = params.page
    let limit = params.limit
    let promise = api.getCodeCategoryList(page, limit)
    await promise.then((response) => {
      console.log(response.data)
      // 根据code码 判断返回结果
      if (response.data.code === -1) {
        // 失败处理
      } else {
        // 成功 则commit到store
        // 循环遍历 格式化时间
        let codeCategoryList = response.data.data.list
        let codeCategoryTotal = response.data.data.total
        codeCategoryList.forEach(e => {
          let createdDate = new Date(parseInt(e.created_time))
          let updatedDate = new Date(parseInt(e.updated_time))
          e.created_time = formatTime(createdDate)
          e.updated_time = formatTime(updatedDate)
        })
        commit('setCodeCategoryList', codeCategoryList)
        commit('setCodeCategoryTotal', codeCategoryTotal)
        commit('setCodeCategoryListLoading', false)
      }
    }).catch((error) => {
      console.error(error)
      that.$message({
        message: '网络异常，请稍后再试。',
        type: 'error'
      })
    })
  },

  // codeCategory 详情
  async getCodeCategory ({commit}, params) {
    let that = params.this
    let promise = api.getCodeCategory(params.category_id)
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
        commit('setCodeCategory', obj)
      }
    }).catch((error) => {
      console.error(error)
      that.$message({
        message: '网络异常，请稍后再试。',
        type: 'error'
      })
    })
  },

  // 添加 codeCategory
  async addCodeCategory ({commit}, params) {
    let that = params.this
    let promise = api.addCodeCategory(params.category)
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
        commit('setCodeCategoryAddVisible', false)
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

  // 更新 codeCategory
  async updateCodeCategory ({commit}, params) {
    let that = params.this
    let promise = api.updateCodeCategory(params.category)
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
        commit('setCodeCategoryUpdateVisible', false)
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

  // 删除 codeCategory
  async deleteCodeCategory ({commit}, params) {
    let that = params.this
    let categoryId = params.category_id
    let promise = api.deleteCodeCategory(categoryId)
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
  setCodeCategory (state, codeCategory) {
    state.codeCategory = codeCategory
  },
  setCodeCategoryList (state, codeCategoryList) {
    state.codeCategoryList = codeCategoryList
  },
  setCodeCategoryTotal (state, codeCategoryTotal) {
    state.codeCategoryTotal = codeCategoryTotal
  },
  setCodeCategoryAddVisible (state, codeCategoryAddVisible) {
    state.codeCategoryAddVisible = codeCategoryAddVisible
  },
  setCodeCategoryDetailVisible (state, codeCategoryDetailVisible) {
    state.codeCategoryDetailVisible = codeCategoryDetailVisible
  },
  setCodeCategoryUpdateVisible (state, codeCategoryUpdateVisible) {
    state.codeCategoryUpdateVisible = codeCategoryUpdateVisible
  },
  setCodeCategoryListLoading (state, codeCategoryListLoading) {
    state.codeCategoryListLoading = codeCategoryListLoading
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
