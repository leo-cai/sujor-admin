import Vue from 'vue'
import * as config from '../config'

export default {
  getUserList (page, limit) {
    let apiUrl = `${config.API_ROOT}v1/users?page=${page}&limit=${limit}`
    return Vue.http.get(apiUrl)
  },
  getUser (userId) {
    let apiUrl = `${config.API_ROOT}v1/user?user_id=${userId}`
    return Vue.http.get(apiUrl)
  },
  updateUser (data) {
    let apiUrl = `${config.API_ROOT}v1/user`
    return Vue.http.put(apiUrl, data)
  }
}
