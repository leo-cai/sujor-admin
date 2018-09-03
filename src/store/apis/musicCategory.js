import Vue from 'vue'
import * as config from '../config'

export default {
  getMusicCategoryList (page, limit) {
    let apiUrl = `${config.API_ROOT}v1/music_categories?page=${page}&limit=${limit}`
    return Vue.http.get(apiUrl)
  },
  getMusicCategory (musicId) {
    let apiUrl = `${config.API_ROOT}v1/music_category?category_id=${musicId}`
    return Vue.http.get(apiUrl)
  },
  addMusicCategory (data) {
    let apiUrl = `${config.API_ROOT}v1/music_category`
    return Vue.http.post(apiUrl, data)
  },
  updateMusicCategory (data) {
    let apiUrl = `${config.API_ROOT}v1/music_category`
    return Vue.http.put(apiUrl, data)
  },
  deleteMusicCategory (categoryId) {
    let apiUrl = `${config.API_ROOT}v1/music_category/${categoryId}`
    return Vue.http.delete(apiUrl)
  }
}
