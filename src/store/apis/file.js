import Vue from 'vue'
import * as config from '../config'

export default {
  deleteFile (filename, filePath) {
    let apiUrl = `${config.API_ROOT}v1/file/${filename}?path=${filePath}`
    return Vue.http.delete(apiUrl)
  },
  deleteImage (imageName, imagePath) {
    let apiUrl = `${config.API_ROOT}v1/image/${imageName}?path=${imagePath}`
    console.log(apiUrl)
    return Vue.http.delete(apiUrl)
  }
}
