import api from '../apis/musicCategory'
import { formatTime } from '@/utils/time'

const state = {
  musicCategory: {}, // music分类列表
  musicCategoryList: [], // music分类列表
  musicCategoryTotal: 0, // music分类总数
  musicCategoryAddVisible: false, // music分类添加模态框是否展示
  musicCategoryDetailVisible: false, // music分类详情模态框是否展示
  musicCategoryUpdateVisible: false, // music分类更新模态框是否展示
  musicCategoryListLoading: true // music分类列表是否加载完成
}

const getters = {
  musicCategory: state => state.musicCategory,
  musicCategoryList: state => state.musicCategoryList,
  musicCategoryTotal: state => state.musicCategoryTotal,
  musicCategoryAddVisible: state => state.musicCategoryAddVisible,
  musicCategoryDetailVisible: state => state.musicCategoryDetailVisible,
  musicCategoryUpdateVisible: state => state.musicCategoryUpdateVisible,
  musicCategoryListLoading: state => state.musicCategoryListLoading
}

const actions = {
  // 获取列表
  async getMusicCategoryList ({commit}, params) {
    let that = params.this
    let page = params.page
    let limit = params.limit
    let promise = api.getMusicCategoryList(page, limit)
    await promise.then((response) => {
      console.log(response.data)
      // 根据code码 判断返回结果
      if (response.data.code === -1) {
        // 失败处理
      } else {
        // 成功 则commit到store
        // 循环遍历 格式化时间
        let musicCategoryList = response.data.data.list
        let musicCategoryTotal = response.data.data.total
        musicCategoryList.forEach(e => {
          let createdDate = new Date(parseInt(e.created_time))
          let updatedDate = new Date(parseInt(e.updated_time))
          e.created_time = formatTime(createdDate)
          e.updated_time = formatTime(updatedDate)
        })
        commit('setMusicCategoryList', musicCategoryList)
        commit('setMusicCategoryTotal', musicCategoryTotal)
        commit('setMusicCategoryListLoading', false)
      }
    }).catch((error) => {
      console.error(error)
      that.$message({
        message: '网络异常，请稍后再试。',
        type: 'error'
      })
    })
  },

  // musicCategory 详情
  async getMusicCategory ({commit}, params) {
    let that = params.this
    let promise = api.getMusicCategory(params.category_id)
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
        commit('setMusicCategory', obj)
      }
    }).catch((error) => {
      console.error(error)
      that.$message({
        message: '网络异常，请稍后再试。',
        type: 'error'
      })
    })
  },

  // 添加 musicCategory
  async addMusicCategory ({commit}, params) {
    let that = params.this
    let promise = api.addMusicCategory(params.category)
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
        commit('setMusicCategoryAddVisible', false)
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

  // 更新 musicCategory
  async updateMusicCategory ({commit}, params) {
    let that = params.this
    let promise = api.updateMusicCategory(params.category)
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
        commit('setMusicCategoryUpdateVisible', false)
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

  // 删除 musicCategory
  async deleteMusicCategory ({commit}, params) {
    let that = params.this
    let categoryId = params.category_id
    let promise = api.deleteMusicCategory(categoryId)
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
  setMusicCategory (state, musicCategory) {
    state.musicCategory = musicCategory
  },
  setMusicCategoryList (state, musicCategoryList) {
    state.musicCategoryList = musicCategoryList
  },
  setMusicCategoryTotal (state, musicCategoryTotal) {
    state.musicCategoryTotal = musicCategoryTotal
  },
  setMusicCategoryAddVisible (state, musicCategoryAddVisible) {
    state.musicCategoryAddVisible = musicCategoryAddVisible
  },
  setMusicCategoryDetailVisible (state, musicCategoryDetailVisible) {
    state.musicCategoryDetailVisible = musicCategoryDetailVisible
  },
  setMusicCategoryUpdateVisible (state, musicCategoryUpdateVisible) {
    state.musicCategoryUpdateVisible = musicCategoryUpdateVisible
  },
  setMusicCategoryListLoading (state, musicCategoryListLoading) {
    state.musicCategoryListLoading = musicCategoryListLoading
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
