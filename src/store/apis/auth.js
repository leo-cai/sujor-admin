import Vue from 'vue'
import * as config from '../config'

export default {
  signIn (user) {
    let apiUrl = `${config.API_ROOT}v1/signin`
    return Vue.http.post(apiUrl, user)
  },
  signUp (user) {
    let apiUrl = `${config.API_ROOT}v1/signup`
    return Vue.http.post(apiUrl, user)
  },
  resetPassword (user) {
    let apiUrl = `${config.API_ROOT}v1/resetPassword`
    return Vue.http.post(apiUrl, user)
  },
  signOut (username) {
    let apiUrl = `${config.API_ROOT}v1/signout`
    return Vue.http.post(apiUrl, {username})
  }
}
