import api from '../apis/book'
import { formatTime } from '@/utils/time'

const state = {
  book: {
    user: {},
    categories: []
  }, // book详情
  bookList: [], // book列表
  bookTotal: 0,
  bookAddVisible: false, // book添加模态框是否展示
  bookDetailVisible: false, // book详情模态框是否展示
  bookUpdateVisible: false, // book更新模态框是否展示
  bookListLoading: true // book列表是否加载完成
}

const getters = {
  book: state => state.book,
  bookList: state => state.bookList,
  bookTotal: state => state.bookTotal,
  bookAddVisible: state => state.bookAddVisible,
  bookDetailVisible: state => state.bookDetailVisible,
  bookUpdateVisible: state => state.bookUpdateVisible,
  bookListLoading: state => state.bookListLoading
}

const actions = {
  // 获取列表
  async getBookList ({commit}, params) {
    let that = params.this
    let page = params.page
    let limit = params.limit
    let promise = api.getBookList(page, limit)
    await promise.then((response) => {
      console.log(response.data)
      // 根据code码 判断返回结果
      if (response.data.code === -1) {
        // 失败处理
      } else {
        // 成功 则commit到store
        // 循环遍历 格式化时间
        let bookList = response.data.data.list
        let bookTotal = response.data.data.total
        bookList.forEach(e => {
          let createdDate = new Date(parseInt(e.created_time))
          let updatedDate = new Date(parseInt(e.updated_time))
          let auditedDate = new Date(parseInt(e.audited_time))
          e.created_time = formatTime(createdDate)
          e.updated_time = formatTime(updatedDate)
          e.audited_time = formatTime(auditedDate)
        })
        commit('setBookList', bookList)
        commit('setBookTotal', bookTotal)
        commit('setBookListLoading', false)
      }
    }).catch((error) => {
      console.error(error)
      that.$message({
        message: '网络异常，请稍后再试。',
        type: 'error'
      })
    })
  },

  // get book 详情
  async getBook ({commit}, params) {
    let that = params.this
    let promise = api.getBook(params.book_id)
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
        commit('setBook', obj)
      }
    }).catch((error) => {
      console.error(error)
      that.$message({
        message: '网络异常，请稍后再试。',
        type: 'error'
      })
    })
  },

  // 添加 book
  async addBook ({commit}, params) {
    let that = params.this
    let promise = api.addBook(params.book)
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
        commit('setBookAddVisible', false)
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

  // 更新 book
  async updateBook ({commit}, params) {
    let that = params.this
    let promise = api.updateBook(params.book)
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
        // commit('setBookUpdateVisible', false)
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

  // 删除 book
  async deleteBook ({commit}, params) {
    let that = params.this
    let bookId = params.book_id
    let promise = api.deleteBook(bookId)
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
  setBook (state, book) {
    state.book = book
  },
  setBookList (state, bookList) {
    state.bookList = bookList
  },
  setBookTotal (state, bookTotal) {
    state.bookTotal = bookTotal
  },
  setBookAddVisible (state, bookAddVisible) {
    state.bookAddVisible = bookAddVisible
  },
  setBookDetailVisible (state, bookDetailVisible) {
    state.bookDetailVisible = bookDetailVisible
  },
  setBookUpdateVisible (state, bookUpdateVisible) {
    state.bookUpdateVisible = bookUpdateVisible
  },
  setBookListLoading (state, bookListLoading) {
    state.bookListLoading = bookListLoading
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
