import Vue from 'vue'
import * as config from '../config'

export default {
  getCodeCategoryList (page, limit) {
    let apiUrl = `${config.API_ROOT}v1/code_categories?page=${page}&limit=${limit}`
    return Vue.http.get(apiUrl)
  },
  getCodeCategory (codeId) {
    let apiUrl = `${config.API_ROOT}v1/code_category?category_id=${codeId}`
    return Vue.http.get(apiUrl)
  },
  addCodeCategory (data) {
    let apiUrl = `${config.API_ROOT}v1/code_category`
    return Vue.http.post(apiUrl, data)
  },
  updateCodeCategory (data) {
    let apiUrl = `${config.API_ROOT}v1/code_category`
    return Vue.http.put(apiUrl, data)
  },
  deleteCodeCategory (categoryId) {
    let apiUrl = `${config.API_ROOT}v1/code_category/${categoryId}`
    return Vue.http.delete(apiUrl)
  }
}
