import Vue from 'vue'
import * as config from '../config'

export default {
  getBookCategoryList (page, limit) {
    let apiUrl = `${config.API_ROOT}v1/book_categories?page=${page}&limit=${limit}`
    return Vue.http.get(apiUrl)
  },
  getBookCategory (bookId) {
    let apiUrl = `${config.API_ROOT}v1/book_category?category_id=${bookId}`
    return Vue.http.get(apiUrl)
  },
  addBookCategory (data) {
    let apiUrl = `${config.API_ROOT}v1/book_category`
    return Vue.http.post(apiUrl, data)
  },
  updateBookCategory (data) {
    let apiUrl = `${config.API_ROOT}v1/book_category`
    return Vue.http.put(apiUrl, data)
  },
  deleteBookCategory (categoryId) {
    let apiUrl = `${config.API_ROOT}v1/book_category/${categoryId}`
    return Vue.http.delete(apiUrl)
  }
}
