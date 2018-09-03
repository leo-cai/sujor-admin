import Vue from 'vue'
import * as config from '../config'

export default {
  getFilmList (page, limit) {
    let apiUrl = `${config.API_ROOT}v1/films?page=${page}&limit=${limit}&utm_source=admin`
    return Vue.http.get(apiUrl)
  },
  getFilm (filmId) {
    let apiUrl = `${config.API_ROOT}v1/film?film_id=${filmId}&utm_source=admin`
    return Vue.http.get(apiUrl)
  },
  addFilm (data) {
    let apiUrl = `${config.API_ROOT}v1/film`
    return Vue.http.post(apiUrl, data)
  },
  updateFilm (data) {
    let apiUrl = `${config.API_ROOT}v1/film`
    return Vue.http.put(apiUrl, data)
  },
  deleteFilm (filmId) {
    let apiUrl = `${config.API_ROOT}v1/film/${filmId}`
    return Vue.http.delete(apiUrl)
  }
}
