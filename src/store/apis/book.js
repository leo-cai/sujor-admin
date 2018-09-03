import Vue from 'vue'
import * as config from '../config'

export default {
  getBookList (page, limit) {
    let apiUrl = `${config.API_ROOT}v1/books?page=${page}&limit=${limit}&utm_source=admin`
    return Vue.http.get(apiUrl)
  },
  getBook (bookId) {
    let apiUrl = `${config.API_ROOT}v1/book?book_id=${bookId}&utm_source=admin`
    return Vue.http.get(apiUrl)
  },
  addBook (data) {
    let apiUrl = `${config.API_ROOT}v1/book`
    return Vue.http.post(apiUrl, data)
  },
  updateBook (data) {
    let apiUrl = `${config.API_ROOT}v1/book`
    return Vue.http.put(apiUrl, data)
  },
  deleteBook (bookId) {
    let apiUrl = `${config.API_ROOT}v1/book/${bookId}`
    return Vue.http.delete(apiUrl)
  }
}
