import Vue from 'vue'
import * as config from '../config'

export default {
  getMusicList (page, limit) {
    let apiUrl = `${config.API_ROOT}v1/musics?page=${page}&limit=${limit}&utm_source=admin`
    return Vue.http.get(apiUrl)
  },
  getMusic (musicId) {
    let apiUrl = `${config.API_ROOT}v1/music?music_id=${musicId}&utm_source=admin`
    return Vue.http.get(apiUrl)
  },
  addMusic (data) {
    let apiUrl = `${config.API_ROOT}v1/music`
    return Vue.http.post(apiUrl, data)
  },
  updateMusic (data) {
    let apiUrl = `${config.API_ROOT}v1/music`
    return Vue.http.put(apiUrl, data)
  },
  deleteMusic (musicId) {
    let apiUrl = `${config.API_ROOT}v1/music/${musicId}`
    return Vue.http.delete(apiUrl)
  }
}
