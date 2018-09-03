import Vue from 'vue'
import * as config from '../config'

export default {
  getFilmCategoryList (page, limit) {
    let apiUrl = `${config.API_ROOT}v1/film_categories?page=${page}&limit=${limit}`
    return Vue.http.get(apiUrl)
  },
  getFilmCategory (filmId) {
    let apiUrl = `${config.API_ROOT}v1/film_category?category_id=${filmId}`
    return Vue.http.get(apiUrl)
  },
  addFilmCategory (data) {
    let apiUrl = `${config.API_ROOT}v1/film_category`
    return Vue.http.post(apiUrl, data)
  },
  updateFilmCategory (data) {
    let apiUrl = `${config.API_ROOT}v1/film_category`
    return Vue.http.put(apiUrl, data)
  },
  deleteFilmCategory (categoryId) {
    let apiUrl = `${config.API_ROOT}v1/film_category/${categoryId}`
    return Vue.http.delete(apiUrl)
  }
}
