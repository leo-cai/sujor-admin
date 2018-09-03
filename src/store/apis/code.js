import Vue from 'vue'
import * as config from '../config'

export default {
  getCodeList (page, limit) {
    let apiUrl = `${config.API_ROOT}v1/codes?page=${page}&limit=${limit}&utm_source=admin`
    return Vue.http.get(apiUrl)
  },
  getCode (codeId) {
    let apiUrl = `${config.API_ROOT}v1/code?code_id=${codeId}&utm_source=admin`
    return Vue.http.get(apiUrl)
  },
  addCode (data) {
    let apiUrl = `${config.API_ROOT}v1/code`
    return Vue.http.post(apiUrl, data)
  },
  updateCode (data) {
    let apiUrl = `${config.API_ROOT}v1/code`
    return Vue.http.put(apiUrl, data)
  },
  deleteCode (codeId) {
    let apiUrl = `${config.API_ROOT}v1/code/${codeId}`
    return Vue.http.delete(apiUrl)
  }
}
