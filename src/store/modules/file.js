import api from '../apis/file'

const state = {
}

const getters = {
}

const actions = {
  // delete file
  async deleteFile ({commit}, params) {
    let that = params.this
    let filename = params.filename
    let filePath = params.filePath
    let promise = api.deleteFile(filename, filePath)
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
  },
  // delete image
  async deleteImage ({commit}, params) {
    let that = params.this
    let imageName = params.imageName
    let imagePath = params.imagePath
    let promise = api.deleteImage(imageName, imagePath)
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
}

export default {
  state,
  getters,
  actions,
  mutations
}
