import api from '../apis/film'
import { formatTime } from '@/utils/time'

const state = {
  film: {
    user: {},
    categories: []
  }, // film详情
  filmList: [], // film列表
  filmTotal: 0,
  filmAddVisible: false, // film添加模态框是否展示
  filmDetailVisible: false, // film详情模态框是否展示
  filmUpdateVisible: false, // film更新模态框是否展示
  filmListLoading: true // film列表是否加载完成
}

const getters = {
  film: state => state.film,
  filmList: state => state.filmList,
  filmTotal: state => state.filmTotal,
  filmAddVisible: state => state.filmAddVisible,
  filmDetailVisible: state => state.filmDetailVisible,
  filmUpdateVisible: state => state.filmUpdateVisible,
  filmListLoading: state => state.filmListLoading
}

const actions = {
  // 获取列表
  async getFilmList ({commit}, params) {
    let that = params.this
    let page = params.page
    let limit = params.limit
    let promise = api.getFilmList(page, limit)
    await promise.then((response) => {
      console.log(response.data)
      // 根据code码 判断返回结果
      if (response.data.code === -1) {
        // 失败处理
      } else {
        // 成功 则commit到store
        // 循环遍历 格式化时间
        let filmList = response.data.data.list
        let filmTotal = response.data.data.total
        filmList.forEach(e => {
          let createdDate = new Date(parseInt(e.created_time))
          let updatedDate = new Date(parseInt(e.updated_time))
          let auditedDate = new Date(parseInt(e.audited_time))
          e.created_time = formatTime(createdDate)
          e.updated_time = formatTime(updatedDate)
          e.audited_time = formatTime(auditedDate)
        })
        commit('setFilmList', filmList)
        commit('setFilmTotal', filmTotal)
        commit('setFilmListLoading', false)
      }
    }).catch((error) => {
      console.error(error)
      that.$message({
        message: '网络异常，请稍后再试。',
        type: 'error'
      })
    })
  },

  // get film 详情
  async getFilm ({commit}, params) {
    let that = params.this
    let promise = api.getFilm(params.film_id)
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
        commit('setFilm', obj)
      }
    }).catch((error) => {
      console.error(error)
      that.$message({
        message: '网络异常，请稍后再试。',
        type: 'error'
      })
    })
  },

  // 添加 film
  async addFilm ({commit}, params) {
    let that = params.this
    let promise = api.addFilm(params.film)
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
        commit('setFilmAddVisible', false)
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

  // 更新 film
  async updateFilm ({commit}, params) {
    let that = params.this
    let promise = api.updateFilm(params.film)
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
        // commit('setFilmUpdateVisible', false)
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

  // 删除 film
  async deleteFilm ({commit}, params) {
    let that = params.this
    let filmId = params.film_id
    let promise = api.deleteFilm(filmId)
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
  setFilm (state, film) {
    state.film = film
  },
  setFilmList (state, filmList) {
    state.filmList = filmList
  },
  setFilmTotal (state, filmTotal) {
    state.filmTotal = filmTotal
  },
  setFilmAddVisible (state, filmAddVisible) {
    state.filmAddVisible = filmAddVisible
  },
  setFilmDetailVisible (state, filmDetailVisible) {
    state.filmDetailVisible = filmDetailVisible
  },
  setFilmUpdateVisible (state, filmUpdateVisible) {
    state.filmUpdateVisible = filmUpdateVisible
  },
  setFilmListLoading (state, filmListLoading) {
    state.filmListLoading = filmListLoading
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
