import Vue from 'vue'
import * as config from '../config'

export default {
  getPermissionList (page, limit) {
    let apiUrl = `${config.API_ROOT}v1/permissions?page=${page}&limit=${limit}`
    return Vue.http.get(apiUrl)
  },
  getPermission (permissionId) {
    let apiUrl = `${config.API_ROOT}v1/permission?permission_id=${permissionId}`
    return Vue.http.get(apiUrl)
  },
  addPermission (data) {
    let apiUrl = `${config.API_ROOT}v1/permission`
    return Vue.http.post(apiUrl, data)
  },
  updatePermission (data) {
    let apiUrl = `${config.API_ROOT}v1/permission`
    return Vue.http.put(apiUrl, data)
  },
  deletePermission (permissionId) {
    let apiUrl = `${config.API_ROOT}v1/permission/${permissionId}`
    return Vue.http.delete(apiUrl)
  }
}
