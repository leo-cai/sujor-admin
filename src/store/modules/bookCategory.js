import api from '../apis/bookCategory'
import { formatTime } from '@/utils/time'

const state = {
  bookCategory: {}, // book分类列表
  bookCategoryList: [], // book分类列表
  bookCategoryTotal: 0, // book分类总数
  bookCategoryAddVisible: false, // book分类添加模态框是否展示
  bookCategoryDetailVisible: false, // book分类详情模态框是否展示
  bookCategoryUpdateVisible: false, // book分类更新模态框是否展示
  bookCategoryListLoading: true // book分类列表是否加载完成
}

const getters = {
  bookCategory: state => state.bookCategory,
  bookCategoryList: state => state.bookCategoryList,
  bookCategoryTotal: state => state.bookCategoryTotal,
  bookCategoryAddVisible: state => state.bookCategoryAddVisible,
  bookCategoryDetailVisible: state => state.bookCategoryDetailVisible,
  bookCategoryUpdateVisible: state => state.bookCategoryUpdateVisible,
  bookCategoryListLoading: state => state.bookCategoryListLoading
}

const actions = {
  // 获取列表
  async getBookCategoryList ({commit}, params) {
    let that = params.this
    let page = params.page
    let limit = params.limit
    let promise = api.getBookCategoryList(page, limit)
    await promise.then((response) => {
      console.log(response.data)
      // 根据code码 判断返回结果
      if (response.data.code === -1) {
        // 失败处理
      } else {
        // 成功 则commit到store
        // 循环遍历 格式化时间
        let bookCategoryList = response.data.data.list
        let bookCategoryTotal = response.data.data.total
        bookCategoryList.forEach(e => {
          let createdDate = new Date(parseInt(e.created_time))
          let updatedDate = new Date(parseInt(e.updated_time))
          e.created_time = formatTime(createdDate)
          e.updated_time = formatTime(updatedDate)
        })
        commit('setBookCategoryList', bookCategoryList)
        commit('setBookCategoryTotal', bookCategoryTotal)
        commit('setBookCategoryListLoading', false)
      }
    }).catch((error) => {
      console.error(error)
      that.$message({
        message: '网络异常，请稍后再试。',
        type: 'error'
      })
    })
  },

  // bookCategory 详情
  async getBookCategory ({commit}, params) {
    let that = params.this
    let promise = api.getBookCategory(params.category_id)
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
        commit('setBookCategory', obj)
      }
    }).catch((error) => {
      console.error(error)
      that.$message({
        message: '网络异常，请稍后再试。',
        type: 'error'
      })
    })
  },

  // 添加 bookCategory
  async addBookCategory ({commit}, params) {
    let that = params.this
    let promise = api.addBookCategory(params.category)
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
        commit('setBookCategoryAddVisible', false)
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

  // 更新 bookCategory
  async updateBookCategory ({commit}, params) {
    let that = params.this
    let promise = api.updateBookCategory(params.category)
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
        commit('setBookCategoryUpdateVisible', false)
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

  // 删除 bookCategory
  async deleteBookCategory ({commit}, params) {
    let that = params.this
    let categoryId = params.category_id
    let promise = api.deleteBookCategory(categoryId)
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
  setBookCategory (state, bookCategory) {
    state.bookCategory = bookCategory
  },
  setBookCategoryList (state, bookCategoryList) {
    state.bookCategoryList = bookCategoryList
  },
  setBookCategoryTotal (state, bookCategoryTotal) {
    state.bookCategoryTotal = bookCategoryTotal
  },
  setBookCategoryAddVisible (state, bookCategoryAddVisible) {
    state.bookCategoryAddVisible = bookCategoryAddVisible
  },
  setBookCategoryDetailVisible (state, bookCategoryDetailVisible) {
    state.bookCategoryDetailVisible = bookCategoryDetailVisible
  },
  setBookCategoryUpdateVisible (state, bookCategoryUpdateVisible) {
    state.bookCategoryUpdateVisible = bookCategoryUpdateVisible
  },
  setBookCategoryListLoading (state, bookCategoryListLoading) {
    state.bookCategoryListLoading = bookCategoryListLoading
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
