import Vue from 'vue'
import * as config from '../config'

export default {
  getRoleList (page, limit) {
    let apiUrl = `${config.API_ROOT}v1/roles?page=${page}&limit=${limit}`
    return Vue.http.get(apiUrl)
  },
  getRole (roleId) {
    let apiUrl = `${config.API_ROOT}v1/role?role_id=${roleId}`
    return Vue.http.get(apiUrl)
  },
  addRole (data) {
    let apiUrl = `${config.API_ROOT}v1/role`
    return Vue.http.post(apiUrl, data)
  },
  updateRole (data) {
    let apiUrl = `${config.API_ROOT}v1/role`
    return Vue.http.put(apiUrl, data)
  },
  deleteRole (roleId) {
    let apiUrl = `${config.API_ROOT}v1/role/${roleId}`
    return Vue.http.delete(apiUrl)
  }
}
