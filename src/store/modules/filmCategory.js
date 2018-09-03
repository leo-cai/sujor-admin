import api from '../apis/filmCategory'
import { formatTime } from '@/utils/time'

const state = {
  filmCategory: {}, // film分类列表
  filmCategoryList: [], // film分类列表
  filmCategoryTotal: 0, // film分类总数
  filmCategoryAddVisible: false, // film分类添加模态框是否展示
  filmCategoryDetailVisible: false, // film分类详情模态框是否展示
  filmCategoryUpdateVisible: false, // film分类更新模态框是否展示
  filmCategoryListLoading: true // film分类列表是否加载完成
}

const getters = {
  filmCategory: state => state.filmCategory,
  filmCategoryList: state => state.filmCategoryList,
  filmCategoryTotal: state => state.filmCategoryTotal,
  filmCategoryAddVisible: state => state.filmCategoryAddVisible,
  filmCategoryDetailVisible: state => state.filmCategoryDetailVisible,
  filmCategoryUpdateVisible: state => state.filmCategoryUpdateVisible,
  filmCategoryListLoading: state => state.filmCategoryListLoading
}

const actions = {
  // 获取列表
  async getFilmCategoryList ({commit}, params) {
    let that = params.this
    let page = params.page
    let limit = params.limit
    let promise = api.getFilmCategoryList(page, limit)
    await promise.then((response) => {
      console.log(response.data)
      // 根据code码 判断返回结果
      if (response.data.code === -1) {
        // 失败处理
      } else {
        // 成功 则commit到store
        // 循环遍历 格式化时间
        let filmCategoryList = response.data.data.list
        let filmCategoryTotal = response.data.data.total
        filmCategoryList.forEach(e => {
          let createdDate = new Date(parseInt(e.created_time))
          let updatedDate = new Date(parseInt(e.updated_time))
          e.created_time = formatTime(createdDate)
          e.updated_time = formatTime(updatedDate)
        })
        commit('setFilmCategoryList', filmCategoryList)
        commit('setFilmCategoryTotal', filmCategoryTotal)
        commit('setFilmCategoryListLoading', false)
      }
    }).catch((error) => {
      console.error(error)
      that.$message({
        message: '网络异常，请稍后再试。',
        type: 'error'
      })
    })
  },

  // filmCategory 详情
  async getFilmCategory ({commit}, params) {
    let that = params.this
    let promise = api.getFilmCategory(params.category_id)
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
        commit('setFilmCategory', obj)
      }
    }).catch((error) => {
      console.error(error)
      that.$message({
        message: '网络异常，请稍后再试。',
        type: 'error'
      })
    })
  },

  // 添加 filmCategory
  async addFilmCategory ({commit}, params) {
    let that = params.this
    let promise = api.addFilmCategory(params.category)
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
        commit('setFilmCategoryAddVisible', false)
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

  // 更新 filmCategory
  async updateFilmCategory ({commit}, params) {
    let that = params.this
    let promise = api.updateFilmCategory(params.category)
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
        commit('setFilmCategoryUpdateVisible', false)
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

  // 删除 filmCategory
  async deleteFilmCategory ({commit}, params) {
    let that = params.this
    let categoryId = params.category_id
    let promise = api.deleteFilmCategory(categoryId)
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
  setFilmCategory (state, filmCategory) {
    state.filmCategory = filmCategory
  },
  setFilmCategoryList (state, filmCategoryList) {
    state.filmCategoryList = filmCategoryList
  },
  setFilmCategoryTotal (state, filmCategoryTotal) {
    state.filmCategoryTotal = filmCategoryTotal
  },
  setFilmCategoryAddVisible (state, filmCategoryAddVisible) {
    state.filmCategoryAddVisible = filmCategoryAddVisible
  },
  setFilmCategoryDetailVisible (state, filmCategoryDetailVisible) {
    state.filmCategoryDetailVisible = filmCategoryDetailVisible
  },
  setFilmCategoryUpdateVisible (state, filmCategoryUpdateVisible) {
    state.filmCategoryUpdateVisible = filmCategoryUpdateVisible
  },
  setFilmCategoryListLoading (state, filmCategoryListLoading) {
    state.filmCategoryListLoading = filmCategoryListLoading
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
