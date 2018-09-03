import api from '../apis/music'
import { formatTime } from '@/utils/time'

const state = {
  music: {
    user: {},
    categories: []
  }, // music详情
  musicList: [], // music列表
  musicTotal: 0,
  musicAddVisible: false, // music添加模态框是否展示
  musicDetailVisible: false, // music详情模态框是否展示
  musicUpdateVisible: false, // music更新模态框是否展示
  musicListLoading: true // music列表是否加载完成
}

const getters = {
  music: state => state.music,
  musicList: state => state.musicList,
  musicTotal: state => state.musicTotal,
  musicAddVisible: state => state.musicAddVisible,
  musicDetailVisible: state => state.musicDetailVisible,
  musicUpdateVisible: state => state.musicUpdateVisible,
  musicListLoading: state => state.musicListLoading
}

const actions = {
  // 获取列表
  async getMusicList ({commit}, params) {
    let that = params.this
    let page = params.page
    let limit = params.limit
    let promise = api.getMusicList(page, limit)
    await promise.then((response) => {
      console.log(response.data)
      // 根据code码 判断返回结果
      if (response.data.code === -1) {
        // 失败处理
      } else {
        // 成功 则commit到store
        // 循环遍历 格式化时间
        let musicList = response.data.data.list
        let musicTotal = response.data.data.total
        musicList.forEach(e => {
          let createdDate = new Date(parseInt(e.created_time))
          let updatedDate = new Date(parseInt(e.updated_time))
          let auditedDate = new Date(parseInt(e.audited_time))
          e.created_time = formatTime(createdDate)
          e.updated_time = formatTime(updatedDate)
          e.audited_time = formatTime(auditedDate)
        })
        commit('setMusicList', musicList)
        commit('setMusicTotal', musicTotal)
        commit('setMusicListLoading', false)
      }
    }).catch((error) => {
      console.error(error)
      that.$message({
        message: '网络异常，请稍后再试。',
        type: 'error'
      })
    })
  },

  // get music 详情
  async getMusic ({commit}, params) {
    let that = params.this
    let promise = api.getMusic(params.music_id)
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
        commit('setMusic', obj)
      }
    }).catch((error) => {
      console.error(error)
      that.$message({
        message: '网络异常，请稍后再试。',
        type: 'error'
      })
    })
  },

  // 添加 music
  async addMusic ({commit}, params) {
    let that = params.this
    let promise = api.addMusic(params.music)
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
        commit('setMusicAddVisible', false)
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

  // 更新 music
  async updateMusic ({commit}, params) {
    let that = params.this
    let promise = api.updateMusic(params.music)
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
        // commit('setMusicUpdateVisible', false)
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

  // 删除 music
  async deleteMusic ({commit}, params) {
    let that = params.this
    let musicId = params.music_id
    let promise = api.deleteMusic(musicId)
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
  setMusic (state, music) {
    state.music = music
  },
  setMusicList (state, musicList) {
    state.musicList = musicList
  },
  setMusicTotal (state, musicTotal) {
    state.musicTotal = musicTotal
  },
  setMusicAddVisible (state, musicAddVisible) {
    state.musicAddVisible = musicAddVisible
  },
  setMusicDetailVisible (state, musicDetailVisible) {
    state.musicDetailVisible = musicDetailVisible
  },
  setMusicUpdateVisible (state, musicUpdateVisible) {
    state.musicUpdateVisible = musicUpdateVisible
  },
  setMusicListLoading (state, musicListLoading) {
    state.musicListLoading = musicListLoading
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
